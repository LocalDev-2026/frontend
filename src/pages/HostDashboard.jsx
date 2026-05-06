import { useAuth } from '../context/AuthContext';
import { BarChart, DollarSign, List, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import api from '../utils/api';

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
    const { t } = useTranslation();

    const [myListings, setMyListings] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // Fetch all listings to filter by hostId (or use a dedicated endpoint)
                const listingsData = await api('/listings?status=all');
                const filteredListings = Array.isArray(listingsData) ? listingsData.filter(l => l.hostId === user.id) : [];
                setMyListings(filteredListings);

                const bookingsData = await api('/bookings/my-bookings');
                setMyBookings(Array.isArray(bookingsData) ? bookingsData : []);
            } catch (error) {
                console.error('Fetch host data error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (!user || user.role !== 'host') {
        return <div className="container">{t('host.access_denied')}</div>;
    }

    if (loading) return <div className="container">{t('common.loading')}</div>;

    const totalEarnings = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-xxl)' }}>{t('host.title')}</h1>
                <Link to="/host/add-listing" className="btn btn-primary">
                    {t('host.add_new')}
                </Link>
            </div>

            <div className="grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <StatCard title={t('host.total_listings')} value={myListings.length} icon={List} color="var(--color-primary)" />
                <StatCard title={t('host.total_bookings')} value={myBookings.length} icon={Calendar} color="var(--color-accent)" />
                <StatCard title={t('host.total_earnings')} value={`$${totalEarnings}`} icon={DollarSign} color="var(--color-success)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
                {/* Recent Activity / Listings Table */}
                <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                        <h3 style={{ margin: 0 }}>{t('host.my_listings')}</h3>
                        <Link to="/host/listings" style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>{t('host.view_all')}</Link>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '8px' }}>{t('host.col_title')}</th>
                                <th style={{ padding: '8px' }}>{t('host.col_status')}</th>
                                <th style={{ padding: '8px' }}>{t('host.col_price')}</th>
                                <th style={{ padding: '8px' }}>{t('host.col_views')}</th>
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
                                            {t(`host.status_${listing.status}`)}
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
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{t('host.tips_title')}</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
                        <li style={{ marginBottom: '8px' }}>{t('host.tip_1')}</li>
                        <li style={{ marginBottom: '8px' }}>{t('host.tip_2')}</li>
                        <li style={{ marginBottom: '8px' }}>{t('host.tip_3')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
