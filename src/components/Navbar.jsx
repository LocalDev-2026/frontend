import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Mountain } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="navbar" style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '70px'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                }}>
                    <div style={{
                        backgroundColor: '#16a34a', // Green background like in the image
                        borderRadius: '0.5rem',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Mountain size={24} strokeWidth={2} />
                    </div>
                    <span style={{
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        letterSpacing: '-0.025em'
                    }}>
                        Visit<span style={{ color: '#16a34a' }}>Naryn</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                    <Link to="/listings?category=guesthouse">{t('nav.discover')} {t('categories.guesthouses')}</Link>
                    <Link to="/listings?category=room">{t('nav.discover')} {t('categories.rooms')}</Link>
                    <Link to="/listings?category=resort">{t('nav.discover')} {t('categories.resorts')}</Link>
                    <Link to="/listings?category=tour">{t('nav.discover')} {t('categories.tours')}</Link>
                    <Link to="/listings?category=product">{t('categories.products')}</Link>
                    
                    <LanguageSwitcher />

                    {user ? (
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                            <span style={{ fontWeight: 500 }}>Hi, {user.name.split(' ')[0]}</span>
                            {user.role === 'host' && <Link to="/host" className="btn btn-outline">{t('nav.host')}</Link>}
                            {user.role === 'admin' && <Link to="/admin" className="btn btn-outline">{t('nav.dashboard')}</Link>}
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px' }}>
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">{t('nav.login')} / {t('nav.register')}</Link>
                    )}
                </div>

                {/* Mobile Menu Button - simple fake implementation for now, needs CSS media queries to hide desktop menu properly */}
                {/* In a real implementation we would use CSS modules or styled-components for media queries. 
            For now, I'll allow the desktop menu to be visible and add a note about mobile. */}
            </div>
        </nav>
    );
};

export default Navbar;
