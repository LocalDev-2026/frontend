import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, image, link }) => (
    <Link to={link} className="category-card" style={{
        position: 'relative',
        height: '300px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'block',
        boxShadow: 'var(--shadow-md)'
    }}>
        <div style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
            transition: 'transform var(--transition-normal)'
        }} className="hover-zoom"></div>
        <h3 style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            color: 'white',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 600
        }}>{title}</h3>
    </Link>
);

const Home = () => {
    return (
        <>
            <Hero />

            <section className="container" style={{ padding: 'var(--spacing-xxl) var(--spacing-md)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xxl)',
                    marginBottom: 'var(--spacing-xl)',
                    textAlign: 'center'
                }}>
                    Explore Categories
                </h2>
                <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
                    <CategoryCard
                        title="Guesthouses"
                        link="/listings?category=guesthouse"
                        image="https://images.unsplash.com/photo-1560130958-fded4f277eb3?w=600&q=80"
                    />
                    <CategoryCard
                        title="Tours & Treks"
                        link="/listings?category=tour"
                        image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
                    />
                    <CategoryCard
                        title="Yurt Stays"
                        link="/listings?category=guesthouse"
                        image="https://images.unsplash.com/photo-1549557404-5544715566d9?w=600&q=80"
                    />
                    <CategoryCard
                        title="Local Products"
                        link="/listings?category=product"
                        image="https://images.unsplash.com/photo-1607082352121-5240bab999e8?w=600&q=80"
                    />
                </div>
            </section>

            <section style={{ backgroundColor: '#f0f0f0', padding: 'var(--spacing-xxl) 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-md)' }}>
                            Are you a local business owner?
                        </h2>
                        <p style={{ maxWidth: '600px', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                            Join our marketplace to showcase your guesthouse, tours, or handcrafted products to travelers from around the world.
                        </p>
                        <Link to="/login" className="btn btn-primary">Become a Host</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
