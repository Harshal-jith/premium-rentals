const PROPERTIES_DATA = [
    {
        id: 1,
        title: "Kochi Heritage Luxury Villa",
        description: "A stunning modern villa located near the scenic Marine Drive in Kochi. Features traditional Kerala architectural design touches combined with modern high ceilings, a grand foyer, custom infinity pool, and beautiful sea views.",
        rent: 450000,
        city: "Kochi",
        address: "Marine Drive Promenade, Kochi, Kerala",
        bedrooms: 4,
        bathrooms: 4,
        area: 4800,
        furnished: true,
        parking: true,
        available: true,
        image: "images/luxury_villa.jpg",
        images: [
            "images/luxury_villa.jpg",
            "images/luxury_villa_interior.jpg",
            "images/luxury_villa_kitchen.jpg"
        ],
        rating: 4.95,
        reviewsCount: 38,
        amenities: ["Infinity Pool", "Sea View", "Home Automation", "Private Garden", "24/7 Security", "Teak Wood Interiors", "Private Gym", "Fibre Internet"]
    },
    {
        id: 2,
        title: "Trivandrum Skyline Penthouse",
        description: "Breathtaking 8-bedroom penthouse with floor-to-ceiling windows offering views of the Arabian Sea and Trivandrum city skyline. Includes premium teakwood work, modern modular kitchen, private elevator access, and secure dual parking.",
        rent: 1100000,
        city: "Trivandrum",
        address: "Kovalam Beach Road, Trivandrum, Kerala",
        bedrooms: 8,
        bathrooms: 9,
        area: 6000,
        furnished: true,
        parking: true,
        available: true,
        image: "images/sea_penthouse_exterior.jpg",
        images: [
            "images/sea_penthouse_exterior.jpg",
            "images/sea_penthouse.jpg",
            "images/sea_penthouse_kitchen.jpg"
        ],
        rating: 4.91,
        reviewsCount: 16,
        amenities: ["Private Elevator", "Sky Deck", "Teak Finishings", "Beachfront Access", "Modular Kitchen", "Gym Access", "Concierge Service", "Smart Lock"]
    },
    {
        id: 3,
        title: "Munnar Tea Garden Cottage",
        description: "Tranquil stone cottage overlooking green tea plantations in Munnar. Features private balconies, cozy stone fireplace setup, and scenic misty valley views. Ideal for residents seeking peace and nature away from the city.",
        rent: 68000,
        city: "Munnar",
        address: "Munnar Hills View Road, Munnar, Kerala",
        bedrooms: 2,
        bathrooms: 2,
        area: 1650,
        furnished: true,
        parking: true,
        available: true,
        image: "images/tea_cottage.jpg",
        images: [
            "images/tea_cottage.jpg",
            "images/tea_cottage_interior.jpg",
            "images/tea_cottage_kitchen.jpg"
        ],
        rating: 4.88,
        reviewsCount: 42,
        amenities: ["Stone Fireplace", "Tea Garden View", "Private Balcony", "Heated Floors", "Misty Valley View", "High-speed Wifi", "Organic Garden Access"]
    },
    {
        id: 4,
        title: "Kozhikode Downtown Studio Loft",
        description: "Compact and highly functional loft-style studio situated in the Kozhikode city center. Close to major IT parks and top restaurants. Fully furnished with high-speed internet connectivity, modular convertible furniture, and balcony.",
        rent: 22000,
        city: "Kozhikode",
        address: "Mavoor Road, Kozhikode, Kerala",
        bedrooms: 1,
        bathrooms: 1,
        area: 620,
        furnished: true,
        parking: false,
        available: true,
        image: "images/studio_loft_exterior.jpg",
        images: [
            "images/studio_loft_exterior.jpg",
            "images/studio_loft.jpg",
            "images/studio_loft_kitchen.jpg"
        ],
        rating: 4.79,
        reviewsCount: 29,
        amenities: ["Convertible Furniture", "High-speed Fiber Wifi", "Balcony", "IT Park Proximity", "AC", "Laundry Room Access", "Rooftop Lounge"]
    },
    {
        id: 5,
        title: "Fort Kochi Heritage Bungalow",
        description: "A beautifully preserved colonial heritage bungalow in Fort Kochi. Features sprawling verandas, red oxide flooring, high rafters, antique rosewood furniture, and a private courtyard garden shaded by ancient mango trees.",
        rent: 150000,
        city: "Kochi",
        address: "Princess Street, Fort Kochi, Kerala",
        bedrooms: 3,
        bathrooms: 3,
        area: 3200,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800", // tropical villa pool
        images: [
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", // teak wood veranda
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800"  // traditional tiled kitchen style
        ],
        rating: 4.93,
        reviewsCount: 21,
        amenities: ["Sprawling Veranda", "Red Oxide Floors", "Antique Furniture", "Private Courtyard", "AC", "Staff Quarters"]
    },
    {
        id: 6,
        title: "Varkala Cliffside Beach Villa",
        description: "An architectural marvel perched on the Varkala North Cliff. Offering uninterrupted panoramic views of the Arabian Sea, private beach trail, plunge pool, and floor-to-ceiling glass paneling to soak in the famous Varkala sunset.",
        rent: 280000,
        city: "Trivandrum",
        address: "North Cliff Walkway, Varkala, Trivandrum, Kerala",
        bedrooms: 4,
        bathrooms: 4,
        area: 3500,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", // tropical beachfront house
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800", // sea view open bedroom
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800"  // coastal counter kitchen
        ],
        rating: 4.97,
        reviewsCount: 15,
        amenities: ["Sea Cliff View", "Private Plunge Pool", "Beach Access", "Outdoor Shower", "Sun Deck", "Sound System"]
    },
    {
        id: 7,
        title: "Kowdiar Royal Apartment",
        description: "An ultra-premium modern apartment located in the prestigious Kowdiar royal avenue. Offers access to high-end building facilities including rooftop pool, fully equipped gymnasium, 24/7 concierge service, and premium automation features.",
        rent: 85000,
        city: "Trivandrum",
        address: "Royal Palace Lane, Kowdiar, Trivandrum, Kerala",
        bedrooms: 3,
        bathrooms: 3,
        area: 2200,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", // sleek apartment building
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", // wood panel lobby
            "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800"  // modern high-end kitchen
        ],
        rating: 4.85,
        reviewsCount: 11,
        amenities: ["Rooftop Pool", "Concierge Service", "Video Door Phone", "Smart Lights", "Gym Access", "Clubhouse"]
    },
    {
        id: 8,
        title: "Kumarakom Lakefront Cottage",
        description: "A serene getaway cottage on the banks of the Vembanad Lake in Kumarakom. Fully modeled with traditional Kerala wooden gables, private fishing jetty, gazebo, and modern luxury bathrooms with outdoor soaking tubs.",
        rent: 180000,
        city: "Kumarakom",
        address: "Lake View Road, Kumarakom, Kottayam, Kerala",
        bedrooms: 2,
        bathrooms: 2,
        area: 1800,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800", // lakefront tropical home
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800", // teak bedroom lake view
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"  // rustic cottage kitchen
        ],
        rating: 4.90,
        reviewsCount: 22,
        amenities: ["Lake View", "Private Jetty", "Outdoor Soaking Tub", "Gazebo", "Speedboat Access", "Kayaking Gear"]
    },
    {
        id: 9,
        title: "Wayanad Canopy Treehouse",
        description: "An authentic, luxury treehouse built high in the rainforest canopies of Wayanad. Made from eco-friendly local materials, features a cozy wooden loft, high-speed starlink internet, and breathtaking view of the Western Ghats mountain mist.",
        rent: 95000,
        city: "Wayanad",
        address: "Rainforest Reserve Road, Vythiri, Wayanad, Kerala",
        bedrooms: 1,
        bathrooms: 1,
        area: 850,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800", // treehouse forest
        images: [
            "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800",
            "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800", // wood loft interior
            "https://images.unsplash.com/photo-1565538810844-1e119d82a221?w=800"  // wooden tea kitchen
        ],
        rating: 4.89,
        reviewsCount: 31,
        amenities: ["Canopy Views", "Eco Construction", "Starlink Internet", "Wooden Balcony", "Trekking Trail Access", "Organic Tea Station"]
    },
    {
        id: 10,
        title: "Alappuzha Backwater Houseboat",
        description: "A luxury floating residential houseboat permanently docked along the tranquil Punnamada backwaters of Alappuzha. Offers a modern air-conditioned cabin, sun deck, gourmet kitchen, and local fishing decks.",
        rent: 120000,
        city: "Alappuzha",
        address: "Punnamada Jetty, Alappuzha, Kerala",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800", // real kerala houseboat
        images: [
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800", // houseboat wood cabin bedroom
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"  // modern houseboat galley
        ],
        rating: 4.82,
        reviewsCount: 19,
        amenities: ["Backwater Frontage", "Sun Deck", "AC Cabins", "In-built Audio System", "Private Cook Option", "Fishing Gear"]
    },
    {
        id: 11,
        title: "Kakkanad Smart Studio",
        description: "A sleek smart-home studio apartment in the heart of Kakkanad's IT corridor. Equipped with Alexa-activated appliances, smart keyless entry, ergonomic work station, high-speed fiber internet, and modular space-saving layouts.",
        rent: 25000,
        city: "Kochi",
        address: "Infopark Expressway, Kakkanad, Kochi, Kerala",
        bedrooms: 1,
        bathrooms: 1,
        area: 550,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", // high rise glass building
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", // minimalist studio interior
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800"  // compact studio kitchen
        ],
        rating: 4.76,
        reviewsCount: 14,
        amenities: ["Smart Lock", "Alexa Automation", "Workstation Desk", "Gigabit Wifi", "Shared Gym", "24/7 Generator Backup"]
    },
    {
        id: 12,
        title: "Vythiri Forest Eco Cabin",
        description: "An off-grid high-end A-frame cabin built in the dense rainforests of Vythiri. Perfect for nature retreats, it offers solar power, spring water supply, glass skylights for stargazing, and wrap-around wooden decks.",
        rent: 60000,
        city: "Wayanad",
        address: "Chembra Peak Road, Vythiri, Wayanad, Kerala",
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800", // forest A-frame cabin
        images: [
            "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", // forest view cabin interior
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"  // rustic wood cabin kitchen
        ],
        rating: 4.91,
        reviewsCount: 25,
        amenities: ["Glass Skylight", "Solar Powered", "Mountain Spring Water", "Wrap-around Deck", "Fire Pit", "Coffee Plantations View"]
    },
    {
        id: 13,
        title: "Vagamon Meadows Chalet",
        description: "A gorgeous Swiss-style pine chalet situated on the green rolling hills of Vagamon. Features wood-clad walls, fireplace heaters, multi-level balconies, and immediate access to the beautiful pine forests and grassy meadows.",
        rent: 75000,
        city: "Vagamon",
        address: "Pine Valley Meadows, Vagamon, Idukki, Kerala",
        bedrooms: 3,
        bathrooms: 2,
        area: 1900,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800", // chalet in meadows
        images: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", // mezzanine view chalet living room
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"  // modern chalet kitchen
        ],
        rating: 4.87,
        reviewsCount: 18,
        amenities: ["Meadow View", "Fireplace Heater", "Pine Wood Interiors", "Scenic Balconies", "Mist Gazing Zone", "Hiking Access"]
    },
    {
        id: 14,
        title: "Ashtamudi Lakeview Mansion",
        description: "A colossal luxury mansion with sprawling manicured lawns overlooking Ashtamudi Lake in Kollam. Features classic architecture, private swimming pool, floating boat house, and custom marble design flooring.",
        rent: 320000,
        city: "Kollam",
        address: "Ashtamudi Lakefront Drive, Kollam, Kerala",
        bedrooms: 5,
        bathrooms: 6,
        area: 5000,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800", // tropical mansion lakefront pool
        images: [
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800", // marble luxury room
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"  // gourmet luxury kitchen
        ],
        rating: 4.96,
        reviewsCount: 8,
        amenities: ["Lake View", "Swimming Pool", "Classic Architecture", "Manicured Lawns", "Private Boat House", "Billiards Room"]
    },
    {
        id: 15,
        title: "Fort Kochi Dutch Loft",
        description: "An authentic warehouse loft redesigned by Dutch architects in Fort Kochi. Highlights exposed old brick walls, double-height arched windows, a minimalist workspace, custom industrial lights, and spiral staircases.",
        rent: 45000,
        city: "Kochi",
        address: "Bazar Road, Fort Kochi, Kochi, Kerala",
        bedrooms: 1,
        bathrooms: 1.5,
        area: 980,
        furnished: true,
        parking: false,
        available: true,
        image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800", // heritage brick warehouse
        images: [
            "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", // industrial loft bedroom
            "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800"  // brick warehouse kitchen
        ],
        rating: 4.81,
        reviewsCount: 15,
        amenities: ["Exposed Brick Walls", "Double-height Ceiling", "Spiral Staircase", "Industrial Lighting", "Bazar View", "AC Loft"]
    },
    {
        id: 16,
        title: "Traditional Thrissur Illam",
        description: "A massive, gorgeous traditional Kerala Illam home in Thrissur. Incorporates classic architectural wood pillars, open gables, red oxide courtyard spaces, and detailed wood carvings reflecting old world cultural beauty.",
        rent: 11000,
        city: "Thrissur",
        address: "Near Vadakkumnathan Temple, Thrissur, Kerala",
        bedrooms: 4,
        bathrooms: 3,
        area: 3600,
        furnished: true,
        parking: true,
        available: true,
        image: "images/thrissur_illam_exterior.jpg", // custom generated kerala illam
        images: [
            "images/thrissur_illam_exterior.jpg",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", // wood panel traditional living area
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800"  // traditional wood fire kitchen
        ],
        rating: 4.90,
        reviewsCount: 12,
        amenities: ["Traditional Architecture", "Teakwood Pillars", "Carved Gables", "Courtyard", "Pooja Hall", "Vast Compound"]
    },
    {
        id: 17,
        title: "Marari Beachfront House",
        description: "A cozy modern beach bungalow on Marari Beach in Alappuzha. Features a thatched clay-tile porch, tropical palm garden, open-air bathrooms, and private beach loungers to enjoy ocean views.",
        rent: 250000,
        city: "Alappuzha",
        address: "Marari Beach Promenade, Alappuzha, Kerala",
        bedrooms: 3,
        bathrooms: 3,
        area: 2800,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800", // beachfront tropical garden villa
        images: [
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800", // beachfront lounge room
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800"  // open ocean kitchen counter
        ],
        rating: 4.94,
        reviewsCount: 20,
        amenities: ["Beach Frontage", "Thatched Porch", "Open-air Shower", "Private Loungers", "Hammocks", "Coconut Grove"]
    },
    {
        id: 18,
        title: "Varkala Horizon Penthouse",
        description: "A luxury high-rise penthouse overlooking Varkala beach. Built with sleek contemporary designs, highlights floor-to-ceiling glasses, private sunset plunge pool, and expansive open-plan wooden decks.",
        rent: 160000,
        city: "Trivandrum",
        address: "Temple Road Cliffside, Varkala, Trivandrum, Kerala",
        bedrooms: 2,
        bathrooms: 2,
        area: 1750,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", // sleek sea facing building
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800", // penthouse sunset bedroom
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800"  // sleek beach kitchen counter
        ],
        rating: 4.88,
        reviewsCount: 16,
        amenities: ["Sunset Plunge Pool", "Panoramic Ocean View", "Glass Walls", "Spacious Sundeck", "AC", "High Speed Wifi"]
    },
    {
        id: 19,
        title: "Technopark Executive Suite",
        description: "An elegant corporate executive apartment located next to Technopark Phase 3 in Trivandrum. Specially designed for digital nomads and tech leaders, it features smart desks, ergonomic setup, and multi-cuisine restaurant access.",
        rent: 35000,
        city: "Trivandrum",
        address: "Technopark Phase 3 Boulevard, Trivandrum, Kerala",
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", // office block building
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", // business suite desk room
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800"  // modern galley kitchen studio
        ],
        rating: 4.79,
        reviewsCount: 22,
        amenities: ["IT Corridor Proximity", "Ergonomic Office Chair", "Smart TV", "Fibre Line Wifi", "Executive Lounge", "Gym Access"]
    },
    {
        id: 20,
        title: "Palakkad Heritage House",
        description: "An authentic, incredibly detailed Palakkad heritage mansion (Tharavad). Showcases an open central courtyard (Nadumuttom) to let in fresh monsoon rain and air, massive teakwood pillars, mud-tiled gabled roofs, and exquisite brass kitchen settings.",
        rent: 140000,
        city: "Palakkad",
        address: "Heritage Village Road, Kalpathy, Palakkad, Kerala",
        bedrooms: 3,
        bathrooms: 3,
        area: 3400,
        furnished: true,
        parking: true,
        available: true,
        image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800", // traditional courtyard slate villa exterior
        images: [
            "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", // open pillars interior courtyard view
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800"  // traditional wood fire kitchen and clay pots
        ],
        rating: 4.98,
        reviewsCount: 19,
        amenities: ["Central Courtyard (Nadumuttom)", "Kalpathy Village Proximity", "Clay Tile Roofs", "Teakwood Pillars", "Exquisite Brass Kitchenware", "Pond Access"]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROPERTIES_DATA;
} else {
    window.PROPERTIES_DATA = PROPERTIES_DATA;
}
