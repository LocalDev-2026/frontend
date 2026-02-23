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
    const [bookingDate, setBookingDate] = useState('');

    if (!listing) return <div className="container">Listing not found</div>;

    const handleBooking = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to book.');
            navigate('/login');
            return;
        }
        alert(`Booking request sent for ${listing.title} on ${bookingDate}!`);
    };

    return (
        <div className="container">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: 'var(--spacing-md)' }}>
                &larr; Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Left Column: Images & Info */}
                <div>
                    {/* Main Image */}
                    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '400px', marginBottom: 'var(--spacing-md)' }}>
                        <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <h1 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-xs)' }}>{listing.title}</h1>
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
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#eee' }}>
                            {host?.avatar ? <img src={host.avatar} alt={host.name} /> : <User size={30} style={{ margin: '10px' }} />}
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>Hosted by {host?.name}</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Joined in 2023</p>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--spacing-lg) 0' }} />

                    {/* Description */}
                    <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>About this listing</h3>
                    <p style={{ lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                        {listing.description}
                    </p>

                    {/* Amenities */}
                    {listing.amenities && listing.amenities.length > 0 && (
                        <>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>What this place offers</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-sm)' }}>
                                {listing.amenities.map(item => (
                                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right Column: Booking Card */}
                <div>
                    <div className="card" style={{ padding: 'var(--spacing-lg)', position: 'sticky', top: '90px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${listing.price}</span>
                            <span style={{ color: 'var(--color-text-muted)' }}>/ night</span>
                        </div>

                        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>CHECK-IN</label>
                                <input
                                    type="date"
                                    required
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                                Reserve
                            </button>
                        </form>

                        <div style={{ marginTop: 'var(--spacing-md)', fontSize: '0.9rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                            You won't be charged yet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;
