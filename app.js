document.addEventListener('DOMContentLoaded', () => {
    // State management
    let customProperties = JSON.parse(localStorage.getItem('haven_custom_properties')) || [];
    let properties = [...(window.PROPERTIES_DATA || []), ...customProperties];
    let bookings = JSON.parse(localStorage.getItem('haven_bookings')) || [];
    let currentProperty = null;
    let currentSlideIndex = 0;

    // Navigation elements
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const navHome = document.getElementById('nav-home');
    const navBrowse = document.getElementById('nav-browse');
    const navBookings = document.getElementById('nav-bookings');
    const navLogoBtn = document.getElementById('nav-logo-btn');
    const exploreBtn = document.getElementById('explore-btn');
    
    // Views
    const viewHome = document.getElementById('view-home');
    const viewBrowse = document.getElementById('view-browse');
    const viewBookings = document.getElementById('view-bookings');
    const viewAdmin = document.getElementById('view-admin');

    // Admin Elements
    const adminLoginCard = document.getElementById('admin-login-card');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasscode = document.getElementById('admin-passcode');
    const adminDashboardLayout = document.getElementById('admin-dashboard-layout');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const adminBookingsRows = document.getElementById('admin-bookings-rows');
    const adminPropertyForm = document.getElementById('admin-property-form');

    // CTAs on Landing page
    const landingCtaPrimary = document.getElementById('landing-cta-primary');
    const landingCtaSecondary = document.getElementById('landing-cta-secondary');

    // Catalog filters
    const searchInput = document.getElementById('search-input');
    const cityFilter = document.getElementById('city-filter');
    const bedroomsFilter = document.getElementById('bedrooms-filter');
    const priceFilter = document.getElementById('price-filter');
    const propertiesCount = document.getElementById('properties-count');
    const listingsGrid = document.getElementById('listings-grid');

    // Detailed View Modal Elements
    const detailModal = document.getElementById('detail-modal');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    const carouselSlidesContainer = document.getElementById('carousel-slides-container');
    const carouselDotsContainer = document.getElementById('carousel-dots-container');
    const carouselPrevBtn = document.getElementById('carousel-prev-btn');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const galleryImageLabel = document.getElementById('gallery-image-label');
    
    const detailPropertyTitle = document.getElementById('detail-property-title');
    const detailPropertyAddress = document.getElementById('detail-property-address');
    const detailPropertyDesc = document.getElementById('detail-property-desc');
    const detailPropertyAmenities = document.getElementById('detail-property-amenities');
    const detailPropertyPrice = document.getElementById('detail-property-price');
    const detailSpecBeds = document.getElementById('detail-spec-beds');
    const detailSpecBaths = document.getElementById('detail-spec-baths');
    const detailSpecArea = document.getElementById('detail-spec-area');
    const detailSpecFurnishing = document.getElementById('detail-spec-furnishing');
    const detailSpecParking = document.getElementById('detail-spec-parking');
    const reserveSpaceBtn = document.getElementById('reserve-space-btn');

    // Booking Request Modal Elements
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const bookingForm = document.getElementById('booking-form');
    const modalPropertyId = document.getElementById('modal-property-id');
    const summaryPropertyTitle = document.getElementById('summary-property-title');
    const summaryPropertyRent = document.getElementById('summary-property-rent');
    const summaryPropertyAddress = document.getElementById('summary-property-address');

    // Dashboard element
    const bookingsList = document.getElementById('bookings-list');

    // Toast Container
    const toastContainer = document.getElementById('toast-container');

    /* -------------------------------------------------------------
       1. Theme Toggle Management
       ------------------------------------------------------------- */
    const savedTheme = localStorage.getItem('haven_theme') || 'light';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('haven_theme', theme);
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    /* -------------------------------------------------------------
       2. Navigation and Transitions (SPA Routing)
       ------------------------------------------------------------- */
    navHome.addEventListener('click', () => showView('home'));
    navBrowse.addEventListener('click', () => showView('browse'));
    navBookings.addEventListener('click', () => showView('bookings'));
    navLogoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showView('home');
    });

    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showView('browse');
        document.getElementById('listings-section-anchor').scrollIntoView({ behavior: 'smooth' });
    });

    landingCtaPrimary.addEventListener('click', () => {
        showView('browse');
        document.getElementById('listings-section-anchor').scrollIntoView({ behavior: 'smooth' });
    });

    landingCtaSecondary.addEventListener('click', () => {
        document.getElementById('benefits-section').scrollIntoView({ behavior: 'smooth' });
    });

    function showView(view) {
        // Reset active links
        navHome.classList.remove('active');
        navBrowse.classList.remove('active');
        navBookings.classList.remove('active');

        // Hide all views
        viewHome.classList.add('hidden');
        viewBrowse.classList.add('hidden');
        viewBookings.classList.add('hidden');
        viewAdmin.classList.add('hidden');

        if (view === 'home') {
            navHome.classList.add('active');
            viewHome.classList.remove('hidden');
        } else if (view === 'browse') {
            navBrowse.classList.add('active');
            viewBrowse.classList.remove('hidden');
            renderProperties();
        } else if (view === 'bookings') {
            navBookings.classList.add('active');
            viewBookings.classList.remove('hidden');
            renderBookings();
        } else if (view === 'admin') {
            viewAdmin.classList.remove('hidden');
        }
    }

    /* Check URL query on load for secret admin entry */
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin')) {
        showView('admin');
    }

    /* -------------------------------------------------------------
       3. Utility / Formatters
       ------------------------------------------------------------- */
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    /* -------------------------------------------------------------
       4. Property Listing Card Renderer
       ------------------------------------------------------------- */
    function renderProperties() {
        const query = searchInput.value.toLowerCase().trim();
        const city = cityFilter.value;
        const bedrooms = bedroomsFilter.value;
        const maxPrice = priceFilter.value ? parseInt(priceFilter.value) : null;

        // Filter Logic
        const filtered = properties.filter(prop => {
            const matchesSearch = prop.title.toLowerCase().includes(query) ||
                                  prop.description.toLowerCase().includes(query) ||
                                  prop.address.toLowerCase().includes(query);
            const matchesCity = !city || prop.city === city;
            const matchesBedrooms = !bedrooms || prop.bedrooms === parseInt(bedrooms);
            const matchesPrice = !maxPrice || prop.rent <= maxPrice;

            return matchesSearch && matchesCity && matchesBedrooms && matchesPrice;
        });

        // Update counts
        propertiesCount.textContent = `${filtered.length} property${filtered.length === 1 ? '' : 'ies'} found`;

        listingsGrid.innerHTML = '';

        if (filtered.length === 0) {
            listingsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass-location"></i>
                    <h3>No Listings Found</h3>
                    <p>Try adjusting your search filters or matching keywords.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(prop => {
            const card = document.createElement('div');
            card.className = 'property-card glass-effect';
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${prop.image}" alt="${prop.title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'">
                    <span class="card-tag">${prop.furnished ? 'Fully Furnished' : 'Semi-Furnished'}</span>
                    <span class="card-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${prop.rating.toFixed(2)}</span>
                    </span>
                </div>
                <div class="card-body">
                    <div class="card-location"><i class="fa-solid fa-location-dot"></i> ${prop.city}</div>
                    <h3 class="card-title">${prop.title}</h3>
                    <p class="card-description">${prop.description}</p>
                    <div class="card-specs">
                        <span class="spec-item"><i class="fa-solid fa-bed"></i> ${prop.bedrooms} Bed${prop.bedrooms > 1 ? 's' : ''}</span>
                        <span class="spec-item"><i class="fa-solid fa-bath"></i> ${prop.bathrooms} Bath${prop.bathrooms > 1 ? 's' : ''}</span>
                        <span class="spec-item"><i class="fa-solid fa-maximize"></i> ${prop.area} sq.ft</span>
                    </div>
                    <div class="card-footer">
                        <div class="card-price-div">
                            <span class="price-label">Monthly Rent</span>
                            <div>
                                <span class="price-value">${formatCurrency(prop.rent)}</span>
                                <span class="price-period">/mo</span>
                            </div>
                        </div>
                        <button class="btn-primary-custom view-details-btn" data-id="${prop.id}">
                            <i class="fa-solid fa-circle-info"></i> View Details
                        </button>
                    </div>
                </div>
            `;
            listingsGrid.appendChild(card);
        });

        // Event listener for view details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const propertyId = parseInt(btn.getAttribute('data-id'));
                openDetailModal(propertyId);
            });
        });
    }

    // Attach filters
    searchInput.addEventListener('input', renderProperties);
    cityFilter.addEventListener('change', renderProperties);
    bedroomsFilter.addEventListener('change', renderProperties);
    priceFilter.addEventListener('change', renderProperties);

    /* -------------------------------------------------------------
       5. Property Detailed View Modal & Carousel Logic
       ------------------------------------------------------------- */
    function openDetailModal(propertyId) {
        currentProperty = properties.find(p => p.id === propertyId);
        if (!currentProperty) return;

        // Populate basic text details
        detailPropertyTitle.textContent = currentProperty.title;
        detailPropertyAddress.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${currentProperty.address}`;
        detailPropertyDesc.textContent = currentProperty.description;
        detailPropertyPrice.textContent = formatCurrency(currentProperty.rent);
        
        detailSpecBeds.textContent = `${currentProperty.bedrooms} Bedroom${currentProperty.bedrooms > 1 ? 's' : ''}`;
        detailSpecBaths.textContent = `${currentProperty.bathrooms} Bathroom${currentProperty.bathrooms > 1 ? 's' : ''}`;
        detailSpecArea.textContent = `${new Intl.NumberFormat('en-IN').format(currentProperty.area)} sq.ft`;
        detailSpecFurnishing.textContent = currentProperty.furnished ? "Fully Furnished" : "Semi-Furnished";
        detailSpecParking.textContent = currentProperty.parking ? "Garage Available" : "Street Parking";

        // Populate amenities
        detailPropertyAmenities.innerHTML = '';
        currentProperty.amenities.forEach(amenity => {
            const pill = document.createElement('div');
            pill.className = 'amenity-pill';
            pill.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${amenity}</span>`;
            detailPropertyAmenities.appendChild(pill);
        });

        // Initialize Carousel
        currentSlideIndex = 0;
        setupCarouselSlides();

        detailModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function setupCarouselSlides() {
        carouselSlidesContainer.innerHTML = '';
        carouselDotsContainer.innerHTML = '';

        if (!currentProperty || !currentProperty.images || currentProperty.images.length === 0) return;

        currentProperty.images.forEach((imgUrl, idx) => {
            // Create slide img
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = `${currentProperty.title} view ${idx + 1}`;
            img.className = `carousel-slide-img ${idx === 0 ? 'active' : ''}`;
            img.onerror = function() {
                this.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800';
            };
            carouselSlidesContainer.appendChild(img);

            // Create indicator dot
            const dot = document.createElement('span');
            dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => jumpToSlide(idx));
            carouselDotsContainer.appendChild(dot);
        });

        updateCarouselLabel();
    }

    function jumpToSlide(idx) {
        const slides = carouselSlidesContainer.querySelectorAll('.carousel-slide-img');
        const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');

        slides[currentSlideIndex].classList.remove('active');
        dots[currentSlideIndex].classList.remove('active');

        currentSlideIndex = idx;

        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');

        updateCarouselLabel();
    }

    function updateCarouselLabel() {
        if (currentSlideIndex === 0) {
            galleryImageLabel.textContent = "Exterior View";
        } else if (currentSlideIndex === 1) {
            galleryImageLabel.textContent = "Interior View";
        } else if (currentSlideIndex === 2) {
            galleryImageLabel.textContent = "Kitchen / Dining View";
        } else {
            galleryImageLabel.textContent = `Image ${currentSlideIndex + 1}`;
        }
    }

    carouselPrevBtn.addEventListener('click', () => {
        if (!currentProperty) return;
        const total = currentProperty.images.length;
        const prevIdx = (currentSlideIndex - 1 + total) % total;
        jumpToSlide(prevIdx);
    });

    carouselNextBtn.addEventListener('click', () => {
        if (!currentProperty) return;
        const total = currentProperty.images.length;
        const nextIdx = (currentSlideIndex + 1) % total;
        jumpToSlide(nextIdx);
    });

    function closeDetailModal() {
        detailModal.classList.remove('show');
        document.body.style.overflow = '';
        currentProperty = null;
    }

    closeDetailBtn.addEventListener('click', closeDetailModal);
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeDetailModal();
        }
    });

    /* -------------------------------------------------------------
       6. Booking Request Modal Controller
       ------------------------------------------------------------- */
    reserveSpaceBtn.addEventListener('click', () => {
        if (!currentProperty) return;

        // Setup booking request pre-fills
        modalPropertyId.value = currentProperty.id;
        summaryPropertyTitle.textContent = currentProperty.title;
        summaryPropertyRent.textContent = `Rent: ${formatCurrency(currentProperty.rent)} / month`;
        summaryPropertyAddress.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${currentProperty.address}`;

        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-date').min = today;

        // Close details modal and open booking modal
        closeDetailModal();
        bookingModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    function closeBookingModal() {
        bookingModal.classList.remove('show');
        document.body.style.overflow = '';
        bookingForm.reset();
    }

    closeModalBtn.addEventListener('click', closeBookingModal);
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });

    /* -------------------------------------------------------------
       7. Form Submission & Simulated Auto-Approval (MODIFIED)
       ------------------------------------------------------------- */
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const propertyId = parseInt(modalPropertyId.value);
        const name = document.getElementById('booking-name').value;
        const email = document.getElementById('booking-email').value;
        const phone = document.getElementById('booking-phone').value;
        const date = document.getElementById('booking-date').value;
        const message = document.getElementById('booking-message').value;

        const prop = properties.find(p => p.id === propertyId);

        const newBooking = {
            id: 'book_' + Date.now(),
            propertyId: propertyId,
            propertyTitle: prop.title,
            propertyImage: prop.image,
            propertyAddress: prop.address,
            propertyRent: prop.rent,
            name: name,
            email: email,
            phone: phone,
            moveInDate: date,
            message: message,
            status: 'Pending',
            createdAt: new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        };

        bookings.unshift(newBooking);
        localStorage.setItem('haven_bookings', JSON.stringify(bookings));

        closeBookingModal();
        showToast(`Booking request submitted for "${prop.title}"!`);

        // Send booking submitted email notification
        sendEmailNotification('submitted', newBooking);

        // NOTE: Auto-approval is disabled so the Admin can manually test approval/rejection emails!
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }

    /* -------------------------------------------------------------
       8. Bookings Dashboard Panel (Renter View)
       ------------------------------------------------------------- */
    function renderBookings() {
        bookingsList.innerHTML = '';

        if (bookings.length === 0) {
            bookingsList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-calendar-xmark"></i>
                    <h3>No Active Reservations</h3>
                    <p>Go to the properties catalog to schedule a booking request.</p>
                    <button class="btn-primary-custom" id="back-to-browse-btn" style="margin-top: 1rem;">
                        <i class="fa-solid fa-compass"></i> Browse Properties
                    </button>
                </div>
            `;
            
            document.getElementById('back-to-browse-btn').addEventListener('click', () => {
                showView('browse');
            });
            return;
        }

        bookings.forEach(book => {
            const card = document.createElement('div');
            card.className = 'booking-card glass-effect';
            
            let badgeClass = 'status-pending';
            let badgeIcon = 'fa-solid fa-circle-notch fa-spin';
            
            if (book.status === 'Approved') {
                badgeClass = 'status-approved';
                badgeIcon = 'fa-solid fa-circle-check';
            } else if (book.status === 'Rejected') {
                badgeClass = 'btn-danger-custom'; // reuse styling red
                badgeIcon = 'fa-solid fa-circle-xmark';
                // Inline override for red badge
                badgeClass = 'booking-status-badge'; 
            }

            card.innerHTML = `
                <div class="booking-main-info">
                    <img src="${book.propertyImage}" alt="${book.propertyTitle}" class="booking-prop-img" onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'">
                    <div class="booking-text-details">
                        <h4>${book.propertyTitle}</h4>
                        <p style="font-size: 0.85rem; opacity: 0.8;"><i class="fa-solid fa-location-dot"></i> ${book.propertyAddress}</p>
                        <div class="booking-meta-row">
                            <span><strong>Move-in:</strong> ${book.moveInDate}</span>
                            <span><strong>Rent:</strong> ${formatCurrency(book.propertyRent)}/mo</span>
                            <span><strong>Requested:</strong> ${book.createdAt}</span>
                        </div>
                    </div>
                </div>
                <div class="booking-actions">
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem;">
                        <span class="booking-status-badge ${badgeClass}" ${book.status === 'Rejected' ? 'style="background: rgba(239, 68, 68, 0.15); color: #ef4444;"' : ''}>
                            <i class="${badgeIcon}"></i> ${book.status}
                        </span>
                        <button class="btn-danger-custom cancel-booking-btn" data-id="${book.id}">
                            Cancel Booking
                        </button>
                    </div>
                </div>
            `;
            bookingsList.appendChild(card);
        });

        // Cancel booking listeners
        document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookingId = btn.getAttribute('data-id');
                cancelBooking(bookingId);
            });
        });
    }

    function cancelBooking(bookingId) {
        if (confirm("Are you sure you want to cancel this booking request?")) {
            const bookingToCancel = bookings.find(b => b.id === bookingId);
            
            bookings = bookings.filter(b => b.id !== bookingId);
            localStorage.setItem('haven_bookings', JSON.stringify(bookings));
            showToast("Booking request cancelled successfully.");
            
            // Send cancellation email notification
            if (bookingToCancel) {
                sendEmailNotification('cancelled', bookingToCancel);
            }

            renderBookings();
        }
    }

    /* -------------------------------------------------------------
       9. API / Nodemailer Email Fetch Dispatcher
       ------------------------------------------------------------- */
    async function sendEmailNotification(eventType, booking) {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventType, booking })
            });
            const data = await response.json();
            console.log("Email Notification Sent:", eventType, data);
        } catch (err) {
            console.error("Error sending email notification:", err);
        }
    }

    /* -------------------------------------------------------------
       10. Hidden Admin Control Center Logic
       ------------------------------------------------------------- */
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = adminPasscode.value;
        if (code === 'admin123') {
            adminLoginCard.classList.add('hidden');
            adminDashboardLayout.classList.remove('hidden');
            showToast("Session unlocked. Welcome system administrator.");
            renderAdminBookings();
        } else {
            alert("Invalid security passcode. Access denied.");
            adminPasscode.value = '';
        }
    });

    adminLogoutBtn.addEventListener('click', () => {
        adminDashboardLayout.classList.add('hidden');
        adminLoginCard.classList.remove('hidden');
        adminPasscode.value = '';
        showToast("Session locked successfully.");
    });

    function renderAdminBookings() {
        adminBookingsRows.innerHTML = '';
        bookings = JSON.parse(localStorage.getItem('haven_bookings')) || [];

        if (bookings.length === 0) {
            adminBookingsRows.innerHTML = `
                <tr>
                    <td colspan="5" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                        No rental requests submitted yet.
                    </td>
                </tr>
            `;
            return;
        }

        bookings.forEach(book => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid var(--border-color)';
            
            let statusBadge = '';
            if (book.status === 'Pending') {
                statusBadge = `<span class="booking-status-badge status-pending"><i class="fa-solid fa-circle-notch fa-spin"></i> Pending</span>`;
            } else if (book.status === 'Approved') {
                statusBadge = `<span class="booking-status-badge status-approved"><i class="fa-solid fa-circle-check"></i> Approved</span>`;
            } else if (book.status === 'Rejected') {
                statusBadge = `<span class="booking-status-badge" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;"><i class="fa-solid fa-circle-xmark"></i> Declined</span>`;
            }

            const actionSelectHtml = `
                <select class="admin-status-select" data-id="${book.id}" style="padding: 0.35rem 0.5rem; font-size: 0.8rem; font-weight: 600; width: 140px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; outline: none;">
                    <option value="Pending" ${book.status === 'Pending' ? 'selected' : ''}>⏳ Mark Pending</option>
                    <option value="Approved" ${book.status === 'Approved' ? 'selected' : ''}>✅ Mark Approved</option>
                    <option value="Rejected" ${book.status === 'Rejected' ? 'selected' : ''}>❌ Mark Decline</option>
                </select>
            `;

            row.innerHTML = `
                <td style="padding: 1rem 0.5rem;">
                    <strong>${book.name}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">${book.email}</span>
                </td>
                <td style="padding: 1rem 0.5rem;">
                    <strong>${book.propertyTitle}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">${formatCurrency(book.propertyRent)}/mo</span>
                </td>
                <td style="padding: 1rem 0.5rem; font-size: 0.8rem; font-weight: 550;">${book.moveInDate}</td>
                <td style="padding: 1rem 0.5rem;">${statusBadge}</td>
                <td style="padding: 1rem 0.5rem; text-align: right; display: flex; justify-content: flex-end; align-items: center; min-height: 57px;">
                    ${actionSelectHtml}
                </td>
            `;
            adminBookingsRows.appendChild(row);
        });

        // Add action change handlers
        document.querySelectorAll('.admin-status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const bookingId = select.getAttribute('data-id');
                const newStatus = e.target.value;
                adminUpdateBookingStatus(bookingId, newStatus);
            });
        });
    }

    function adminUpdateBookingStatus(bookingId, newStatus) {
        bookings = JSON.parse(localStorage.getItem('haven_bookings')) || [];
        const bookingIdx = bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIdx !== -1) {
            const oldStatus = bookings[bookingIdx].status;
            if (oldStatus === newStatus) return; // no change

            bookings[bookingIdx].status = newStatus;
            localStorage.setItem('haven_bookings', JSON.stringify(bookings));
            
            showToast(`Request for "${bookings[bookingIdx].propertyTitle}" changed to ${newStatus.toUpperCase()}.`);
            
            // Dispatch real email on approved/rejected transitions
            if (newStatus === 'Approved') {
                sendEmailNotification('approved', bookings[bookingIdx]);
            } else if (newStatus === 'Rejected') {
                sendEmailNotification('rejected', bookings[bookingIdx]);
            }

            renderAdminBookings();
        }
    }

    /* Admin Property Form Submission */
    adminPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('prop-title').value;
        const city = document.getElementById('prop-city').value;
        const address = document.getElementById('prop-address').value;
        const rent = parseInt(document.getElementById('prop-rent').value);
        const area = parseInt(document.getElementById('prop-area').value);
        const bedrooms = parseInt(document.getElementById('prop-beds').value);
        const bathrooms = parseInt(document.getElementById('prop-baths').value);
        const furnished = document.getElementById('prop-furnished').checked;
        const parking = document.getElementById('prop-parking').checked;
        const description = document.getElementById('prop-desc').value;
        const imgExt = document.getElementById('prop-image-ext').value;
        const imgInt = document.getElementById('prop-image-int').value;
        const imgKtch = document.getElementById('prop-image-ktch').value;

        const newProp = {
            id: Date.now(),
            title: title,
            description: description,
            rent: rent,
            city: city,
            address: address,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            area: area,
            furnished: furnished,
            parking: parking,
            available: true,
            image: imgExt, // exterior main
            images: [imgExt, imgInt, imgKtch], // gallery carousel list
            rating: parseFloat((4.75 + Math.random() * 0.24).toFixed(2)),
            reviewsCount: Math.floor(Math.random() * 15) + 2,
            amenities: [
                "Verified Spaces", 
                "Air Conditioning", 
                furnished ? "Fully Furnished" : "Semi-Furnished", 
                parking ? "Dedicated Parking Garage" : "Street Parking", 
                "Elevator Support", 
                "24/7 Security"
            ]
        };

        // Save to local storage custom properties
        customProperties.push(newProp);
        localStorage.setItem('haven_custom_properties', JSON.stringify(customProperties));
        
        // Merge to current state
        properties = [...(window.PROPERTIES_DATA || []), ...customProperties];
        
        showToast(`Published listing: "${title}" successfully!`);
        adminPropertyForm.reset();
        
        // Render
        renderProperties();
    });
});
