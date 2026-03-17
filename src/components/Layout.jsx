import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
    const { t } = useTranslation();

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
                            {t('footer.desc')}
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{t('footer.explore')}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', color: '#aaa' }}>
                            <a href="#">{t('footer.destinations')}</a>
                            <a href="#">{t('footer.tours')}</a>
                            <a href="#">{t('footer.guesthouses')}</a>
                            <a href="#">{t('footer.culture')}</a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{t('footer.support')}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', color: '#aaa' }}>
                            <a href="#">{t('footer.help')}</a>
                            <a href="#">{t('footer.for_hosts')}</a>
                            <a href="#">{t('footer.for_admins')}</a>
                            <a href="#">{t('footer.contact')}</a>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid #444', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
                    {t('footer.rights')}
                </div>
            </footer>
        </div>
    );
};

export default Layout;
