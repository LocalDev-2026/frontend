import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/mockData';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(email);
        if (success) {
            navigate('/');
        } else {
            setError('User not found. Try one of the demo accounts.');
        }
    };

    const handleDemoLogin = (userEmail) => {
        login(userEmail);
        navigate('/');
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ padding: 'var(--spacing-xl)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Welcome Back</h1>

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
                        <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email..."
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)', textAlign: 'center' }}>
                        Demo Accounts (Click to login):
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
