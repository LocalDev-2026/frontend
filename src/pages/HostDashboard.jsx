import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { BarChart, DollarSign, List, Calendar, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

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
    const [activeTab, setActiveTab] = useState('overview'); // overview, requests, profile
    const [myListings, setMyListings] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const [businessName, setBusinessName] = useState(user?.businessName || '');
    const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || '');
    const [profileSaving, setProfileSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        
        const fetchData = async () => {
            try {
                const [listingsRes, requestsRes, bookingsRes] = await Promise.all([
                    api('/listings/my-listings'),
                    api('/requests/my-requests'),
                    api('/bookings/my-bookings')
                ]);
                setMyListings(listingsRes);
                setMyRequests(requestsRes);
                setMyBookings(bookingsRes);
            } catch (error) {
                console.error("Error fetching host data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (!user || user.role !== 'host') {
        return <div className="container">{t('host.access_denied')}</div>;
    }

    if (dataLoading) return <div className="container">{t('common.loading')}</div>;

    const totalEarnings = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    return (
        <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h1 style={{ fontSize: 'var(--font-size-xxl)' }}>{t('host.title')}</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/host/submit-request" className="btn btn-outline" style={{ backgroundColor: 'white' }}>
                        {t('host.submit_request')}
                    </Link>
                    <Link to="/host/add-listing" className="btn btn-primary">
                        <PlusCircle size={18} /> {t('host.add_new')}
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <button 
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    {t('host.tab_overview')}
                </button>
                <button 
                    className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('requests')}
                >
                    {t('host.tab_requests')} ({myRequests.length})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Business Profile
                </button>
            </div>

            {activeTab === 'overview' && (
                <>
                    <div className="grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <StatCard title={t('host.total_listings')} value={myListings.length} icon={List} color="var(--color-primary)" />
                        <StatCard title={t('host.total_bookings')} value={myBookings.length} icon={Calendar} color="var(--color-accent)" />
                        <StatCard title={t('host.total_earnings')} value={`$${totalEarnings}`} icon={DollarSign} color="var(--color-success)" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
                        {/* Listings Table */}
                        <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                                <h3 style={{ margin: 0 }}>{t('host.my_listings')}</h3>
                            </div>

                            {myListings.length === 0 ? (
                                <p style={{ color: 'var(--color-text-muted)' }}>No listings found. Add one to get started!</p>
                            ) : (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                            <th style={{ padding: '8px' }}>{t('host.col_title')}</th>
                                            <th style={{ padding: '8px' }}>{t('host.col_status')}</th>
                                            <th style={{ padding: '8px' }}>{t('host.col_price')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myListings.slice(0, 5).map(listing => (
                                            <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '12px 8px' }}>{listing.title}</td>
                                                <td style={{ padding: '12px 8px' }}>
                                                    <span className={`status-badge ${listing.status}`}>
                                                        {t(`host.status_${listing.status}`)}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '12px 8px' }}>${listing.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Tips */}
                        <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{t('host.tips_title')}</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
                                <li style={{ marginBottom: '8px' }}>{t('host.tip_1')}</li>
                                <li style={{ marginBottom: '8px' }}>{t('host.tip_2')}</li>
                                <li style={{ marginBottom: '8px' }}>{t('host.tip_3')}</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'requests' && (
                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h3 style={{ margin: 0 }}>{t('host.tab_requests')}</h3>
                    </div>

                    {myRequests.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl) 0', color: 'var(--color-text-muted)' }}>
                            <p>{t('host.no_requests')}</p>
                            <Link to="/host/submit-request" className="btn btn-outline" style={{ marginTop: 'var(--spacing-md)' }}>
                                {t('host.submit_request')}
                            </Link>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                                    <th style={{ padding: '12px' }}>{t('host.req_listing')}</th>
                                    <th style={{ padding: '12px' }}>{t('host.req_type')}</th>
                                    <th style={{ padding: '12px' }}>{t('host.req_date')}</th>
                                    <th style={{ padding: '12px' }}>{t('host.req_status')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRequests.map(req => {
                                    const listing = myListings.find(l => l.id === req.listingId);
                                    return (
                                        <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '16px 12px', fontWeight: '500' }}>
                                                {listing ? listing.title : req.listingId}
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>
                                                    {t(`content_request.type_${req.type}`)}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 12px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <span className={`status-badge ${req.status}`}>
                                                    {t(`host.status_${req.status}`)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="card" style={{ padding: 'var(--spacing-xl)', maxWidth: '600px' }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <h3 style={{ margin: 0 }}>Business Profile</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Customize how your business appears to tourists on your Business Page.</p>
                    </div>

                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setProfileSaving(true);
                        try {
                            await api('/hosts/profile', {
                                method: 'PATCH',
                                body: JSON.stringify({ businessName, businessDescription })
                            });
                            // Update user context manually so it reflects immediately
                            user.businessName = businessName;
                            user.businessDescription = businessDescription;
                            alert('Business profile updated successfully!');
                        } catch (error) {
                            alert(error.message);
                        } finally {
                            setProfileSaving(false);
                        }
                    }}>
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Business Name</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="e.g. Bob's Adventure Tours"
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            />
                        </div>
                        
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Business Description</label>
                            <textarea
                                value={businessDescription}
                                onChange={(e) => setBusinessDescription(e.target.value)}
                                rows="5"
                                placeholder="Tell tourists about your business, the services you provide, and what makes you special..."
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', resize: 'vertical' }}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={profileSaving}>
                            {profileSaving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default HostDashboard;
