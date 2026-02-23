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
        description: 'Experience authentic nomadic life in a comfortable yurt near the historic Tash Rabat Caravanserai.',
        images: ['https://images.unsplash.com/photo-1528642474493-2243863b1e97?w=800&q=80', 'https://images.unsplash.com/photo-1628198759080-605bb1da7697?w=800&q=80'],
        rating: 4.8,
        reviews: 12,
        status: 'approved',
        amenities: ['Breakfast', 'Hiking', 'Parking']
    },
    {
        id: 'l2',
        hostId: 'u2',
        title: 'Naryn City Guesthouse',
        category: 'guesthouse',
        price: 25,
        location: 'Naryn City Center',
        description: 'Modern comfort in the heart of Naryn. Close to all amenities and local markets.',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
        rating: 4.5,
        reviews: 8,
        status: 'approved',
        amenities: ['WiFi', 'Kitchen', 'Hot Shower']
    },
    {
        id: 'l3',
        hostId: 'u2',
        title: 'Horse Trekking to Song-Kul',
        category: 'tour',
        price: 120,
        location: 'Song-Kul Lake',
        description: '3-day horse trekking adventure to the breathtaking Song-Kul Lake. Includes guide and meals.',
        images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'],
        rating: 5.0,
        reviews: 5,
        status: 'pending',
        amenities: ['Guide', 'Meals', 'Horses']
    },
    {
        id: 'l4',
        hostId: 'u2',
        title: 'Handmade Shirdak Rug',
        category: 'product',
        price: 150,
        location: 'Kochkor',
        description: 'Traditional felt rug made by local artisans using ancient techniques.',
        images: ['https://images.unsplash.com/photo-1596238426034-318e88941038?w=800&q=80'],
        status: 'approved',
        amenities: []
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
