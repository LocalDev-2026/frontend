import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { listings } from '../data/mockData';
import { Check, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(0); // Simple way to force re-render after mock data mutation

    if (!user || user.role !== 'admin') {
        return <div className="container">Access Denied. Please login as Admin.</div>;
    }

    const pendingListings = listings.filter(l => l.status === 'pending');
    const activeListings = listings.filter(l => l.status === 'approved');

    const handleStatusChange = (id, newStatus) => {
        const listing = listings.find(l => l.id === id);
        if (listing) {
            listing.status = newStatus;
            setRefresh(refresh + 1); // Trigger re-render
            alert(`Listing ${newStatus} successfully!`);
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3>Pending Review</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-warning)' }}>{pendingListings.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3>Active Listings</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-success)' }}>{activeListings.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3>Total Users</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>3</p> {/* Hardcoded for mock */}
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Pending Approvals</h2>

                {pendingListings.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)' }}>No pending listings to review.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>Listing</th>
                                <th style={{ padding: '12px' }}>Host</th>
                                <th style={{ padding: '12px' }}>Date</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingListings.map(listing => (
                                <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{listing.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{listing.category} • {listing.location}</div>
                                    </td>
                                    <td style={{ padding: '12px' }}>User {listing.hostId}</td>
                                    <td style={{ padding: '12px' }}>Today</td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link to={`/listings/${listing.id}`} target="_blank" className="btn btn-secondary" style={{ padding: '6px' }} title="View">
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleStatusChange(listing.id, 'approved')}
                                                className="btn btn-primary"
                                                style={{ padding: '6px', backgroundColor: 'var(--color-success)' }}
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(listing.id, 'rejected')}
                                                className="btn btn-primary"
                                                style={{ padding: '6px', backgroundColor: 'var(--color-danger)' }}
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
