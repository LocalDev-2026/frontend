import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/mockData';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(email);
        if (success) {
            navigate('/');
        } else {
            setError(t('login.error_not_found'));
        }
    };

    const handleDemoLogin = (userEmail) => {
        login(userEmail);
        navigate('/');
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ padding: 'var(--spacing-xl)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>{t('login.welcome')}</h1>

                {error && <div style={{
                    backgroundColor: '#ffebee',
                    color: 'var(--color-danger)',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-md)',
                    textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ marginBottom: 'var(--spacing-lg)' }}>
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
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t('login.button')}</button>
                </form>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)', textAlign: 'center' }}>
                        {t('login.demo_accounts')}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {users.map(u => (
                            <button
                                key={u.id}
                                onClick={() => handleDemoLogin(u.email)}
                                className="btn btn-secondary"
                                style={{ justifyContent: 'flex-start', width: '100%' }}
                            >
                                <strong>{u.role.toUpperCase()}:</strong> {u.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
