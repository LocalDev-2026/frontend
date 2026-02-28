export const users = [
    {
        id: 'u1',
        name: 'Alice Tourist',
        role: 'tourist',
        email: 'alice@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    {
        id: 'u2',
        name: 'Bob Host',
        role: 'host',
        email: 'bob@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    {
        id: 'u3',
        name: 'Admin User',
        role: 'admin',
        email: 'admin@naryn.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    }
];

export const listings = [
    {
        id: 'l1',
        hostId: 'u2',
        title: 'Cozy Yurt in Tash Rabat',
        category: 'guesthouse',
        price: 35,
        location: 'Tash Rabat, Naryn',
        description: 'Experience authentic nomadic life in a comfortable yurt near the historic Tash Rabat Caravanserai. Wake up to the sound of nature and enjoy traditional Kyrgyz hospitality.',
        images: [
            'https://images.unsplash.com/photo-1549557404-5544715566d9?w=1200&q=80',
            'https://images.unsplash.com/photo-1628198759080-605bb1da7697?w=1200&q=80'
        ],
        rating: 4.8,
        reviews: 24,
        status: 'approved',
        availableRooms: 3,
        maxGuests: 4,
        amenities: ['Breakfast', 'Hiking', 'Parking', 'Heating']
    },
    {
        id: 'l2',
        hostId: 'u2',
        title: 'Naryn River Breeze Hotel',
        category: 'resort',
        price: 65,
        location: 'Naryn Riverside',
        description: 'A premium riverside resort offering stunning mountain views and modern amenities. Perfect for families and business travelers alike.',
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80'
        ],
        rating: 4.6,
        reviews: 15,
        status: 'approved',
        availableRooms: 8,
        maxGuests: 3,
        amenities: ['WiFi', 'Kitchen', 'Hot Shower', 'Restaurant', 'Gym']
    },
    {
        id: 'l3',
        hostId: 'u2',
        title: 'Horse Trekking to Song-Kul',
        category: 'tour',
        price: 120,
        location: 'Song-Kul Lake',
        description: '3-day horse trekking adventure to the breathtaking Song-Kul Lake. Includes experienced guide, high-quality gear, and authentic nomadic meals.',
        images: [
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
            'https://images.unsplash.com/photo-1625244724123-1ee70e28f145?w=1200&q=80'
        ],
        rating: 5.0,
        reviews: 12,
        status: 'approved',
        availableRooms: 5,
        maxGuests: 10,
        amenities: ['Guide', 'Meals', 'Horses', 'Camping Gear']
    },
    {
        id: 'l4',
        hostId: 'u2',
        title: 'Handmade Shirdak Rug - Premium Grade',
        category: 'product',
        price: 180,
        location: 'Kochkor Workshop',
        description: 'A masterpiece of Kyrgyz craftsmanship. This heavy felt rug features traditional patterns symbolizing health and prosperity.',
        images: [
            'https://images.unsplash.com/photo-1596238426034-318e88941038?w=1200&q=80'
        ],
        rating: 4.9,
        reviews: 7,
        status: 'approved',
        availableRooms: 2,
        maxGuests: 1,
        amenities: ['Authenticity Certificate', 'Global Shipping']
    },
    {
        id: 'l5',
        hostId: 'u2',
        title: 'Khan Tengri Base Camp Expedition',
        category: 'tour',
        price: 850,
        location: 'Central Tien-Shan',
        description: 'Elite mountaineering experience for seasoned adventurers. High-altitude camp with full logistics support.',
        images: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80'
        ],
        rating: 4.7,
        reviews: 4,
        status: 'approved',
        availableRooms: 10,
        maxGuests: 2,
        amenities: ['Professional Guide', 'Oxygen Support', 'Full Board']
    }
];

export const bookings = [
    {
        id: 'b1',
        listingId: 'l1',
        touristId: 'u1',
        date: '2023-10-15',
        status: 'confirmed',
        totalPrice: 70
    }
];
