import { Search } from 'lucide-react';

const Hero = () => {
    return (
        <div className="hero" style={{
            position: 'relative',
            height: '80vh',
            width: '100%',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url("naryn.png")', // Using this as naryn.webp placeholder
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
        }}>
            <div className="container">
                <h1 style={{
                    fontSize: 'var(--font-size-hero)',
                    fontWeight: 800,
                    marginBottom: 'var(--spacing-md)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    Discover the Soul of Naryn
                </h1>
                <p style={{
                    fontSize: 'var(--font-size-xl)',
                    marginBottom: 'var(--spacing-xl)',
                    maxWidth: '600px',
                    margin: '0 auto var(--spacing-xl) auto',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    Authentic yurts, breathtaking mountains, and local treasures.
                </p>

                {/* Search Bar */}
                {/* Search Bar */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '8px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <Search size={24} color="var(--color-primary)" style={{ marginLeft: '16px' }} />
                    <input
                        type="text"
                        placeholder="Try 'Yurt in Song-Kul' or 'Horse Trekking'..."
                        style={{
                            border: 'none',
                            padding: '16px',
                            flex: 1,
                            fontSize: '1.1rem',
                            outline: 'none',
                            borderRadius: 'var(--radius-full)'
                        }}
                    />
                    <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '16px 32px', fontSize: '1.1rem' }}>
                        Search
                    </button>
                </div>

                {/* Quick Tags */}
                <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: 'white', fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Trending:</span>
                    {['Yurt Stays', 'Kel-Suu Lake', 'Shirdak Rugs', 'Horse Riding'].map(tag => (
                        <button key={tag} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
