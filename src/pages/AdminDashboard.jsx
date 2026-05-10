import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Check, X, Eye, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    
    const [activeTab, setActiveTab] = useState('requests'); // requests, listings
    const [previewModal, setPreviewModal] = useState({ open: false, request: null });
    const [pendingRequests, setPendingRequests] = useState([]);
    const [listings, setListings] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const fetchAdminData = async () => {
        try {
            const [requestsRes, listingsRes] = await Promise.all([
                api('/requests/pending'),
                api('/listings?status=all') // We might need all listings to match titles
            ]);
            setPendingRequests(requestsRes);
            setListings(listingsRes);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchAdminData();
        } else {
            setDataLoading(false);
        }
    }, [user]);

    if (!user || user.role !== 'admin') {
        return <div className="container">{t('admin.access_denied')}</div>;
    }

    if (dataLoading) return <div className="container">{t('common.loading')}</div>;

    const activeListings = listings.filter(l => l.status === 'approved');
    const pendingListings = listings.filter(l => l.status === 'pending');

    const handleRequestAction = async (id, status) => {
        try {
            await api(`/requests/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });
            alert(t('admin.req_success', { status }));
            setPreviewModal({ open: false, request: null });
            fetchAdminData(); // Refresh data
        } catch (error) {
            alert(error.message);
        }
    };

    const handleListingAction = async (id, status) => {
        try {
            await api(`/listings/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });
            alert(`Listing ${status} successfully`);
            fetchAdminData();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
            <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>{t('admin.title')}</h1>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Pending Requests</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-warning)' }}>{pendingRequests.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{t('admin.active_listings')}</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-success)' }}>{activeListings.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Pending Listings</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-warning)' }}>{pendingListings.length}</p>
                </div>
                <div className="card" style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{t('admin.total_users')}</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>3</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <button 
                    className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('requests')}
                >
                    {t('admin.requests_tab')} ({pendingRequests.length})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('listings')}
                >
                    {t('admin.listings_tab')}
                </button>
            </div>

            {/* Tab Content: Requests */}
            {activeTab === 'requests' && (
                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Pending Content Requests</h2>

                    {pendingRequests.length === 0 ? (
                        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--spacing-xxl) 0' }}>
                            {t('admin.no_pending')}
                        </p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                                    <th style={{ padding: '12px', width: '35%' }}>{t('admin.col_listing')}</th>
                                    <th style={{ padding: '12px', width: '15%' }}>Type</th>
                                    <th style={{ padding: '12px', width: '15%' }}>{t('admin.col_host')}</th>
                                    <th style={{ padding: '12px', width: '15%' }}>{t('admin.col_date')}</th>
                                    <th style={{ padding: '12px', width: '20%' }}>{t('admin.col_actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map(req => {
                                    const listing = listings.find(l => l.id === req.listingId);
                                    return (
                                        <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '16px 12px' }}>
                                                <div style={{ fontWeight: 'bold' }}>{listing ? listing.title : req.listingId}</div>
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>
                                                    {t(`content_request.type_${req.type}`)}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>{req.hostId}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '0.9rem' }}>{new Date(req.createdAt).toLocaleDateString()}</td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        onClick={() => setPreviewModal({ open: true, request: req })}
                                                        className="btn btn-secondary"
                                                        style={{ padding: '6px' }}
                                                        title="Preview Content"
                                                    >
                                                        <Eye size={18} /> Preview
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Tab Content: Listings */}
            {activeTab === 'listings' && (
                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Pending Listings Approval</h2>
                    
                    {pendingListings.length === 0 ? (
                        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--spacing-xxl) 0' }}>
                            No pending listings to approve.
                        </p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                                    <th style={{ padding: '12px', width: '40%' }}>Listing Title</th>
                                    <th style={{ padding: '12px', width: '20%' }}>Category</th>
                                    <th style={{ padding: '12px', width: '20%' }}>Price</th>
                                    <th style={{ padding: '12px', width: '20%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingListings.map(listing => (
                                    <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '16px 12px' }}>
                                            <div style={{ fontWeight: 'bold' }}>{listing.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{listing.location}</div>
                                        </td>
                                        <td style={{ padding: '16px 12px', textTransform: 'capitalize' }}>
                                            {listing.category}
                                        </td>
                                        <td style={{ padding: '16px 12px' }}>${listing.price}</td>
                                        <td style={{ padding: '16px 12px' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleListingAction(listing.id, 'rejected')}
                                                    className="btn btn-secondary"
                                                    style={{ padding: '6px', color: 'var(--color-danger)' }}
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleListingAction(listing.id, 'approved')}
                                                    className="btn btn-primary"
                                                    style={{ padding: '6px' }}
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <Link to={`/listings/${listing.id}`} target="_blank" className="btn btn-secondary" style={{ padding: '6px' }} title="View Listing">
                                                    <Eye size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Request Preview Modal */}
            {previewModal.open && previewModal.request && (
                <div className="modal-overlay" onClick={() => setPreviewModal({ open: false, request: null })}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t('admin.req_preview')}</h3>
                            <button className="close-btn" onClick={() => setPreviewModal({ open: false, request: null })}>
                                <XCircle size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', fontSize: '0.95rem' }}>
                                <div><strong style={{ color: 'var(--color-text-muted)' }}>{t('admin.req_listing')}</strong> <br/>{listings.find(l => l.id === previewModal.request.listingId)?.title}</div>
                                <div><strong style={{ color: 'var(--color-text-muted)' }}>{t('admin.req_type')}</strong> <br/>{t(`content_request.type_${previewModal.request.type}`)}</div>
                                <div><strong style={{ color: 'var(--color-text-muted)' }}>{t('admin.req_host')}</strong> <br/>{previewModal.request.hostId}</div>
                                <div><strong style={{ color: 'var(--color-text-muted)' }}>{t('admin.req_date')}</strong> <br/>{new Date(previewModal.request.createdAt).toLocaleString()}</div>
                            </div>
                            
                            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--spacing-lg) 0' }} />
                            
                            <h4>Content to Add:</h4>
                            
                            {previewModal.request.type === 'images' && previewModal.request.images && (
                                <div className="preview-grid">
                                    {previewModal.request.images.map((img, i) => (
                                        <div key={i} className="preview-item">
                                            <img src={img} alt={`Request img ${i}`} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(previewModal.request.type === 'video' || previewModal.request.type === 'videos') && previewModal.request.videos && previewModal.request.videos.length > 0 && (
                                <div style={{ marginTop: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                    {previewModal.request.videos.map((vid, i) => (
                                        <video key={i} src={vid} controls style={{ width: '100%', maxHeight: '200px', backgroundColor: '#000', borderRadius: 'var(--radius-md)' }} />
                                    ))}
                                </div>
                            )}

                            {previewModal.request.type === 'description' && (
                                <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-md)', backgroundColor: '#f3f4f6', borderRadius: 'var(--radius-md)', whiteSpace: 'pre-wrap' }}>
                                    {previewModal.request.description}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button 
                                onClick={() => handleRequestAction(previewModal.request.id, 'rejected')}
                                className="btn" 
                                style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
                            >
                                <X size={18} /> {t('admin.req_reject')}
                            </button>
                            <button 
                                onClick={() => handleRequestAction(previewModal.request.id, 'approved')}
                                className="btn" 
                                style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
                            >
                                <Check size={18} /> {t('admin.req_approve')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
