import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('password123');
    const [name, setName] = useState('');
    const [role, setRole] = useState('tourist');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        
        if (isLogin) {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError(t('login.error_not_found'));
            }
        } else {
            const success = await register(name, email, password, role);
            if (success) {
                navigate('/');
            } else {
                setError(t('register.error'));
            }
        }
    };

    const handleDemoLogin = async (userEmail) => {
        const success = await login(userEmail, 'password123');
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: 'var(--spacing-xl) 0' }}>
            <div className="card" style={{ padding: 'var(--spacing-xl)', width: '100%', maxWidth: '450px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    {isLogin ? t('login.welcome') : t('register.title')}
                </h1>

                {error && <div style={{
                    backgroundColor: '#ffebee',
                    color: 'var(--color-danger)',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-md)',
                    textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleAuth} style={{ marginBottom: 'var(--spacing-lg)' }}>
                    {!isLogin && (
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>{t('register.name_label')}</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('register.name_placeholder')}
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            />
                        </div>
                    )}
                    
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>{t('login.email_label')}</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('login.email_placeholder')}
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>{t('login.password_label')}</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>{t('register.role_label')}</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            >
                                <option value="tourist">{t('register.role_tourist')}</option>
                                <option value="host">{t('register.role_host')}</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}>
                        {isLogin ? t('login.button') : t('register.button')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {isLogin ? t('login.no_account') : t('login.have_account')}{' '}
                        <button 
                            type="button" 
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                        >
                            {isLogin ? t('login.sign_up') : t('login.login_here')}
                        </button>
                    </p>
                </div>

                {isLogin && (
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)', textAlign: 'center' }}>
                            {t('login.demo_accounts')}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { id: 1, name: 'Alice Tourist', email: 'alice@example.com', role: 'tourist' },
                                { id: 2, name: 'Bob Host', email: 'bob@example.com', role: 'host' },
                                { id: 3, name: 'Admin User', email: 'admin@naryn.com', role: 'admin' }
                            ].map(u => (
                                <button
                                    key={u.id}
                                    type="button"
                                    onClick={() => handleDemoLogin(u.email)}
                                    className="btn btn-secondary"
                                    style={{ justifyContent: 'flex-start', width: '100%' }}
                                >
                                    <strong>{u.role.toUpperCase()}:</strong> {u.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
