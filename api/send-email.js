const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { eventType, booking } = req.body;

    if (!eventType || !booking) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM || smtpUser || 'noreply@rentora.com';

    // Fallback for local development when env vars aren't configured yet
    if (!smtpUser || !smtpPass) {
        console.warn("SMTP credentials not configured. Simulating email send locally.");
        console.log(`[SIMULATED EMAIL] Event: ${eventType}, To: ${booking.email}`);
        return res.status(200).json({
            success: true,
            message: 'Email simulated successfully (SMTP credentials missing locally)',
            simulated: true
        });
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });

    let subject = '';
    let htmlContent = '';

    const currencyFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });
    const formattedRent = currencyFormatter.format(booking.propertyRent);

    if (eventType === 'submitted') {
        subject = `Booking Request Received: ${booking.propertyTitle}`;
        htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #d97706; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; margin-top: 0;">Rentora Booking Request</h2>
                <p>Dear <strong>${booking.name}</strong>,</p>
                <p>Thank you for submitting your reservation request. We have received your booking details and have forwarded them to verification services.</p>
                
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #0f172a;">Request Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 6px 0; color: #64748b; width: 120px;">Property:</td>
                            <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${booking.propertyTitle}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Address:</td>
                            <td style="padding: 6px 0; color: #0f172a;">${booking.propertyAddress}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Monthly Rent:</td>
                            <td style="padding: 6px 0; font-weight: bold; color: #d97706;">${formattedRent} / month</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Move-in Date:</td>
                            <td style="padding: 6px 0; color: #0f172a;">${booking.moveInDate}</td>
                        </tr>
                    </table>
                </div>
                
                <p><strong>Next Steps:</strong> Our team is validating details for immediate confirmation. You will receive an automated email response detailing status updates within a few minutes.</p>
                <p>Best regards,<br>The Rentora Team</p>
            </div>
        `;
    } else if (eventType === 'approved') {
        subject = `Booking APPROVED! - ${booking.propertyTitle}`;
        htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #16a34a; border-bottom: 2px solid #22c55e; padding-bottom: 10px; margin-top: 0;">Booking Approved 🎉</h2>
                <p>Dear <strong>${booking.name}</strong>,</p>
                <p>Congratulations! Your booking request for <strong>${booking.propertyTitle}</strong> has been officially approved and verified by Rentora.</p>
                
                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #14532d;">Reservation Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 6px 0; color: #166534; width: 120px;">Property:</td>
                            <td style="padding: 6px 0; font-weight: bold; color: #14532d;">${booking.propertyTitle}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #166534;">Location:</td>
                            <td style="padding: 6px 0; color: #14532d;">${booking.propertyAddress}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #166534;">Confirmed Rent:</td>
                            <td style="padding: 6px 0; font-weight: bold; color: #16a34a;">${formattedRent} / month</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #166534;">Move-in Date:</td>
                            <td style="padding: 6px 0; color: #14532d;">${booking.moveInDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #166534;">Booking ID:</td>
                            <td style="padding: 6px 0; font-family: monospace; color: #14532d;">${booking.id}</td>
                        </tr>
                    </table>
                </div>
                
                <p><strong>What's next?</strong> A letting representative will reach out to your registered phone number (<strong>${booking.phone}</strong>) shortly to coordinate the rental contract signing and security deposit transfer.</p>
                <p>We are excited to welcome you to your premium new home!</p>
                <p>Best regards,<br>The Rentora Team</p>
            </div>
        `;
    } else if (eventType === 'cancelled') {
        subject = `Booking Request Cancelled - ${booking.propertyTitle}`;
        htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #ef4444; border-bottom: 2px solid #f87171; padding-bottom: 10px; margin-top: 0;">Reservation Request Cancelled</h2>
                <p>Dear <strong>${booking.name}</strong>,</p>
                <p>As requested, your booking submission for <strong>${booking.propertyTitle}</strong> has been cancelled. No further action is required from your side.</p>
                
                <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #fee2e2;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 6px 0; color: #991b1b; width: 130px;">Property:</td>
                            <td style="padding: 6px 0; font-weight: bold; color: #7f1d1d;">${booking.propertyTitle}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #991b1b;">Cancellation Date:</td>
                            <td style="padding: 6px 0; color: #7f1d1d;">${new Date().toLocaleDateString('en-IN')}</td>
                        </tr>
                    </table>
                </div>
                
                <p>If you did not initiate this request or have changed your mind, feel free to visit Rentora and submit a new reservation request at any time.</p>
                <p>Best regards,<br>The Rentora Team</p>
            </div>
        `;
    } else if (eventType === 'rejected') {
        subject = `Update on Booking Request: ${booking.propertyTitle}`;
        htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #ef4444; border-bottom: 2px solid #f87171; padding-bottom: 10px; margin-top: 0;">Booking Request Update</h2>
                <p>Dear <strong>${booking.name}</strong>,</p>
                <p>Thank you for your interest in renting <strong>${booking.propertyTitle}</strong>. We regret to inform you that your booking request has been declined at this time.</p>
                
                <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #fee2e2;">
                    <p style="margin: 0; color: #991b1b; font-weight: bold;">Status: Declined</p>
                    <p style="margin: 5px 0 0; color: #7f1d1d; font-size: 0.85rem;">Property: ${booking.propertyTitle} (${booking.propertyAddress})</p>
                </div>
                
                <p>This decision can be due to high demand, schedule conflicts, or rental criteria. We encourage you to browse our other available premium properties on Rentora to find a suitable space.</p>
                <p>If you have any questions or require support, please contact us at support@rentora.com.</p>
                <p>Best regards,<br>The Rentora Team</p>
            </div>
        `;
    }

    try {
        await transporter.sendMail({
            from: `Rentora <${emailFrom}>`,
            to: booking.email,
            subject: subject,
            html: htmlContent
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (err) {
        console.error("Nodemailer send error:", err);
        return res.status(500).json({ error: 'Failed to send email', details: err.message });
    }
};
