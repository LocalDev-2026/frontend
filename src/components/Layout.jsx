import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <footer style={{
                backgroundColor: '#262626',
                color: 'white',
                padding: 'var(--spacing-xl) 0',
                marginTop: 'auto'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-xl)' }}>
                    <div>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>NarynTravel</h3>
                        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                            Discover the beauty of Naryn region. Book authentic stays, experiences, and buy local products directly from the community.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Explore</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', color: '#aaa' }}>
                            <a href="#">Destinations</a>
                            <a href="#">Tours</a>
                            <a href="#">Guesthouses</a>
                            <a href="#">Culture</a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Support</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', color: '#aaa' }}>
                            <a href="#">Help Center</a>
                            <a href="#">For Hosts</a>
                            <a href="#">For Admins</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid #444', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
                    &copy; 2024 Naryn Tourism & Marketplace. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
