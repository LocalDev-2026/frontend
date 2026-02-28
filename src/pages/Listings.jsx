import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { Filter, Star, DollarSign } from 'lucide-react';

const Listings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');

    // Filters State
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [minRating, setMinRating] = useState(0);

    const filteredListings = useMemo(() => {
        const result = listings.filter(item => {
            const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
            const matchesRating = (item.rating || 0) >= minRating;
            const isApproved = item.status === 'approved';

            return matchesCategory && matchesPrice && matchesRating && isApproved;
        });

        return result.sort((a, b) => {
            const scoreA = (a.rating || 0) + (Math.log10((a.reviews || 0) + 1) * 0.5);
            const scoreB = (b.rating || 0) + (Math.log10((b.reviews || 0) + 1) * 0.5);
            return scoreB - scoreA;
        });
    }, [categoryFilter, priceRange, minRating]);

    return (
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 'var(--spacing-xl)', paddingTop: 'var(--spacing-xl)' }}>
            {/* Sidebar Filters */}
            <aside style={{
                backgroundColor: 'white',
                padding: 'var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                height: 'fit-content',
                position: 'sticky',
                top: '90px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-lg)' }}>
                    <Filter size={20} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Filters</h3>
                </div>

                {/* Price Filter */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h4 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Price Range (USD)
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="number"
                            placeholder="Min"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        />
                    </div>
                </div>

                {/* Rating Filter */}
                <div>
                    <h4 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Minimum Rating
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[4, 3, 2, 0].map(rating => (
                            <label key={rating} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1rem' }}>
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={minRating === rating}
                                    onChange={() => setMinRating(rating)}
                                />
                                {rating > 0 ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {rating}+ <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                                    </span>
                                ) : 'Any rating'}
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main>
                <header style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-xs)' }}>
                        {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}s` : 'All Listings'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {filteredListings.length} results found in this category
                    </p>
                </header>

                {filteredListings.length > 0 ? (
                    <div className="grid-cols-3">
                        {filteredListings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)', color: 'var(--color-text-muted)', backgroundColor: '#f9fafb', borderRadius: 'var(--radius-lg)' }}>
                        <p style={{ fontSize: '1.2rem' }}>No listings found matching your criteria.</p>
                        <button
                            className="btn btn-outline"
                            style={{ marginTop: 'var(--spacing-md)' }}
                            onClick={() => { setPriceRange([0, 1000]); setMinRating(0); }}
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Listings;
