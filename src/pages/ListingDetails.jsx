import { useParams, useNavigate } from 'react-router-dom';
import { listings, users } from '../data/mockData';
import { MapPin, Star, User, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ListingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const listing = listings.find(l => l.id === id);
    const host = users.find(u => u.id === listing?.hostId);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = end.getTime() - start.getTime();
        return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
    };

    const nights = calculateNights();
    const totalPrice = listing.price * nights;

    if (!listing) return <div className="container">Listing not found</div>;

    const handleBooking = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to book.');
            navigate('/login');
            return;
        }
        if (nights <= 0) {
            alert('Please select valid check-in and check-out dates.');
            return;
        }
        alert(`Booking request sent for ${listing.title}!\nDates: ${checkIn} to ${checkOut}\nGuests: ${adults} Adults, ${children} Children\nTotal Price: $${totalPrice}`);
    };

    return (
        <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> Back to Search
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Left Column: Images & Info */}
                <div>
                    {/* Image Gallery (Simplified) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: 'var(--spacing-md)' }}>
                        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '400px', gridColumn: 'span 2' }}>
                            <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        {listing.images.slice(1).map((img, idx) => (
                            <div key={idx} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '150px' }}>
                                <img src={img} alt={`${listing.title} ${idx + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <h1 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-xs)', fontWeight: 700 }}>{listing.title}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Star size={18} fill="var(--color-warning)" color="var(--color-warning)" />
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-text-main)' }}>{listing.rating || 'New'}</span>
                                    <span>({listing.reviews} reviews)</span>
                                </div>
                                <span>•</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={18} />
                                    <span>{listing.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--spacing-lg) 0' }} />

                    {/* Host Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f3f4f6', border: '2px solid #e5e7eb' }}>
                            {host?.avatar ? <img src={host.avatar} alt={host.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={30} style={{ margin: '13px' }} />}
                        </div>
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Hosted by {host?.name}</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Superhost • Joined in 2023</p>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--spacing-lg) 0' }} />

                    {/* Description */}
                    <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>About this listing</h3>
                    <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: 'var(--spacing-xl)', fontSize: '1.05rem' }}>
                        {listing.description}
                    </p>

                    {/* Amenities */}
                    {listing.amenities && listing.amenities.length > 0 && (
                        <div style={{ marginBottom: 'var(--spacing-xxl)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem' }}>What this place offers</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                                {listing.amenities.map(item => (
                                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', color: '#4b5563' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Booking Card */}
                <div>
                    <div className="card" style={{ padding: 'var(--spacing-lg)', position: 'sticky', top: '90px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--spacing-lg)' }}>
                            <div>
                                <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>${listing.price}</span>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}> / night</span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600 }}>
                                {listing.availableRooms} rooms left!
                            </div>
                        </div>

                        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ padding: '10px', borderRight: '1px solid var(--color-border)' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Check-in</label>
                                        <input
                                            type="date"
                                            required
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            style={{ border: 'none', width: '100%', fontSize: '0.9rem', outline: 'none', paddingTop: '4px' }}
                                        />
                                    </div>
                                    <div style={{ padding: '10px' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Checkout</label>
                                        <input
                                            type="date"
                                            required
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            style={{ border: 'none', width: '100%', fontSize: '0.9rem', outline: 'none', paddingTop: '4px' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Guests</label>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '0.9rem' }}>{adults} Adults, {children} Children</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} style={{ padding: '2px 8px', borderRadius: '50%', border: '1px solid #ccc' }}>-</button>
                                            <button type="button" onClick={() => setAdults(Math.min(listing.maxGuests || 4, adults + 1))} style={{ padding: '2px 8px', borderRadius: '50%', border: '1px solid #ccc' }}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: 600, borderRadius: 'var(--radius-md)' }}>
                                {nights > 0 ? `Reserve for ${nights} nights` : 'Check Availability'}
                            </button>
                        </form>

                        {nights > 0 && (
                            <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)', color: '#4b5563' }}>
                                    <span>${listing.price} x {nights} nights</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)', color: '#4b5563' }}>
                                    <span>Service fee</span>
                                    <span>$0 (Free for now!)</span>
                                </div>
                                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--spacing-sm) 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginTop: 'var(--spacing-sm)' }}>
                                    <span>Total (USD)</span>
                                    <span>${totalPrice}</span>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 'var(--spacing-lg)', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                            You won't be charged yet. Host will review your request.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;
