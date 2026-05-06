import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';

const AdminDashboard = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') return;
        fetchListings();
    }, [user]);

    if (!user || user.role !== 'admin') {
        return <div className="container">{t('admin.access_denied')}</div>;
    }

    if (loading) return <div className="container">{t('common.loading')}</div>;

    const pendingListings = listings.filter(l => l.status === 'pending');
    const activeListings = listings.filter(l => l.status === 'approved');

    const fetchListings = async () => {
        try {
            const data = await api('/listings?status=all');
            setListings(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch admin data error:', error);
            setListings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api(`/listings/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            fetchListings();
            alert(t('admin.success', { status: newStatus }));
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>{t('admin.title')}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3>{t('admin.pending_review')}</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-warning)' }}>{pendingListings.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3>{t('admin.active_listings')}</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-success)' }}>{activeListings.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3>{t('admin.total_users')}</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>3</p> {/* Hardcoded for mock */}
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-md)' }}>{t('admin.pending_approvals')}</h2>

                {pendingListings.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)' }}>{t('admin.no_pending')}</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>{t('admin.col_listing')}</th>
                                <th style={{ padding: '12px' }}>{t('admin.col_host')}</th>
                                <th style={{ padding: '12px' }}>{t('admin.col_date')}</th>
                                <th style={{ padding: '12px' }}>{t('admin.col_actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingListings.map(listing => (
                                <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{listing.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t(`categories.${listing.category}s`)} • {listing.location}</div>
                                    </td>
                                    <td style={{ padding: '12px' }}>{t('admin.col_host')} {listing.hostId}</td>
                                    <td style={{ padding: '12px' }}>{t('admin.today')}</td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link to={`/listings/${listing.id}`} target="_blank" className="btn btn-secondary" style={{ padding: '6px' }} title={t('admin.view')}>
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleStatusChange(listing.id, 'approved')}
                                                className="btn btn-primary"
                                                style={{ padding: '6px', backgroundColor: 'var(--color-success)' }}
                                                title={t('admin.approve')}
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(listing.id, 'rejected')}
                                                className="btn btn-primary"
                                                style={{ padding: '6px', backgroundColor: 'var(--color-danger)' }}
                                                title={t('admin.reject')}
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
