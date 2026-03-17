import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <>
            <Hero />

            <section className="container" style={{ padding: 'var(--spacing-xxl) var(--spacing-md)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xxl)',
                    marginBottom: 'var(--spacing-xl)',
                    textAlign: 'center'
                }}>
                    {t('home.featured')}
                </h2>
                <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
                    <CategoryCard
                        title={t('categories.guesthouses')}
                        link="/listings?category=guesthouse"
                        image="https://images.unsplash.com/photo-1549557404-5544715566d9?w=800&q=80"
                    />
                    <CategoryCard
                        title={t('categories.tours')}
                        link="/listings?category=tour"
                        image="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
                    />
                    <CategoryCard
                        title={t('categories.resorts')}
                        link="/listings?category=resort"
                        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                    />
                    <CategoryCard
                        title={t('categories.products')}
                        link="/listings?category=product"
                        image="https://images.unsplash.com/photo-1596238426034-318e88941038?w=800&q=80"
                    />
                </div>
            </section>

            <section style={{ backgroundColor: '#f0f0f0', padding: 'var(--spacing-xxl) 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xxl)', marginBottom: 'var(--spacing-md)' }}>
                            {t('home.host_prompt')}
                        </h2>
                        <p style={{ maxWidth: '600px', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                            {t('home.host_desc')}
                        </p>
                        <Link to="/login" className="btn btn-primary">{t('home.become_host')}</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
