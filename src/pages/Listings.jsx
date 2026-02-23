import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/mockData';
import ListingCard from '../components/ListingCard';

const Listings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredListings = useMemo(() => {
        const result = listings.filter(item => {
            const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase());
            const isApproved = item.status === 'approved'; // Only show approved listings
            return matchesCategory && matchesSearch && isApproved;
        });

        // Smart Sort: Higher ratings + more reviews appear first
        return result.sort((a, b) => {
            // Simple weighting: Rating * 1.0 + Log(Reviews) * 0.5
            const scoreA = (a.rating || 0) + (Math.log10((a.reviews || 0) + 1) * 0.5);
            const scoreB = (b.rating || 0) + (Math.log10((b.reviews || 0) + 1) * 0.5);
            return scoreB - scoreA;
        });
    }, [categoryFilter, searchTerm]);

    return (
        <div className="container">
            <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-lg)' }}>
                    {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}s` : 'All Listings'}
                </h2>

                {/* Search Input */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '16px 24px',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--color-border)',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 'var(--shadow-md)',
                            outline: 'none',
                            transition: 'box-shadow var(--transition-normal)'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = 'var(--shadow-lg)'}
                        onBlur={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
                    />
                </div>
            </header>

            {filteredListings.length > 0 ? (
                <div className="grid-cols-3">
                    {filteredListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)', color: 'var(--color-text-muted)' }}>
                    <p>No listings found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Listings;
