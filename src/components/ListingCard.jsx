import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListingCard = ({ listing }) => {
    const { t } = useTranslation();

    return (
        <Link to={`/listings/${listing.id}`} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}>
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-normal)' }}
                    className="hover-zoom"
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'white',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    ${listing.price} / {t('listing.night')}
                </div>
            </div>
            <div style={{ padding: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-xs)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{listing.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                        <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                        <span>{listing.rating || t('details.new')}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>
                    <MapPin size={14} />
                    <span>{listing.location}</span>
                </div>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {listing.description}
                </p>
            </div>
        </Link>
    );
};

export default ListingCard;
