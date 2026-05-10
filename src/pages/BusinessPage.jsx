import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';
import { MapPin, Star, User, Building } from 'lucide-react';

const BusinessPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [host, setHost] = useState(null);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const data = await api(`/hosts/${id}`);
                setHost(data.host);
                setListings(data.listings);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, [id]);

    if (loading) return <div className="container">{t('common.loading')}</div>;
    if (error || !host) return <div className="container" style={{color: 'red', textAlign: 'center'}}>{error || 'Business not found'}</div>;

    const displayBusinessName = host.businessName || `${host.name}'s Services`;
    const displayBusinessDescription = host.businessDescription || 'Welcome to our service page. We offer a variety of services for your trip to Naryn.';

    return (
        <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
            {/* Header / Business Profile Section */}
            <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)', textAlign: 'center', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e5e7eb', margin: '0 auto var(--spacing-md) auto', border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    {host.avatar ? (
                        <img src={host.avatar} alt={displayBusinessName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Building size={60} color="#9ca3af" style={{ margin: '25px' }} />
                    )}
                </div>
                
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-primary)' }}>{displayBusinessName}</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: 'var(--spacing-md)' }}>
                    {t('details.hosted_by', { name: host.name })}
                </p>
                
                <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', color: 'var(--color-text-main)', fontSize: '1.1rem' }}>
                    {displayBusinessDescription}
                </p>
            </div>

            {/* Services / Listings Grid */}
            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.8rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', display: 'inline-block' }}>
                Our Services
            </h2>
            
            {listings.length === 0 ? (
                <p style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>This service provider has no active listings yet.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                    {listings.map(listing => (
                        <Link to={`/listings/${listing.id}`} key={listing.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="card listing-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                    <img 
                                        src={listing.images[0] || 'https://via.placeholder.com/400x300'} 
                                        alt={listing.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                        ${listing.price}/night
                                    </div>
                                    <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                                        {listing.category}
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>{listing.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                                            <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />
                                            <span>{listing.rating > 0 ? listing.rating : 'New'}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
                                        <MapPin size={16} />
                                        <span>{listing.location}</span>
                                    </div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {listing.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusinessPage;
