import { useAuth } from '../context/AuthContext';
import { listings, bookings } from '../data/mockData';
import { BarChart, DollarSign, List, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card" style={{ padding: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <div style={{
            backgroundColor: color,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>{title}</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{value}</h3>
        </div>
    </div>
);

const HostDashboard = () => {
    const { user } = useAuth();

    if (!user || user.role !== 'host') { // Simple unauthorized protection
        return <div className="container">Please login as a host.</div>;
    }

    const myListings = listings.filter(l => l.hostId === user.id);
    const myBookings = bookings.filter(b => myListings.some(l => l.id === b.listingId));
    const totalEarnings = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-xxl)' }}>Host Dashboard</h1>
                <Link to="/host/add-listing" className="btn btn-primary">
                    + Add New Listing
                </Link>
            </div>

            <div className="grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <StatCard title="Total Listings" value={myListings.length} icon={List} color="var(--color-primary)" />
                <StatCard title="Total Bookings" value={myBookings.length} icon={Calendar} color="var(--color-accent)" />
                <StatCard title="Total Earnings" value={`$${totalEarnings}`} icon={DollarSign} color="var(--color-success)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
                {/* Recent Activity / Listings Table */}
                <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                        <h3 style={{ margin: 0 }}>My Listings</h3>
                        <Link to="/host/listings" style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>View All</Link>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '8px' }}>Title</th>
                                <th style={{ padding: '8px' }}>Status</th>
                                <th style={{ padding: '8px' }}>Price</th>
                                <th style={{ padding: '8px' }}>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myListings.slice(0, 5).map(listing => (
                                <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px 8px' }}>{listing.title}</td>
                                    <td style={{ padding: '12px 8px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.8rem',
                                            backgroundColor: listing.status === 'approved' ? '#e8f5e9' : listing.status === 'pending' ? '#fff8e1' : '#ffebee',
                                            color: listing.status === 'approved' ? '#2e7d32' : listing.status === 'pending' ? '#f57f17' : '#c62828'
                                        }}>
                                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 8px' }}>${listing.price}</td>
                                    <td style={{ padding: '12px 8px' }}>{Math.floor(Math.random() * 100)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Notifications or Tips */}
                <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Tips for Hosts</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
                        <li style={{ marginBottom: '8px' }}>Add high-quality photos to attract more guests.</li>
                        <li style={{ marginBottom: '8px' }}>Respond to inquiries within 24 hours.</li>
                        <li style={{ marginBottom: '8px' }}>Keep your calendar up to date.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
