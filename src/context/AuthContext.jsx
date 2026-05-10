import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('naryn_user');
        const token = localStorage.getItem('naryn_token');
        console.log('AuthProvider Init:', { hasUser: !!storedUser, hasToken: !!token });
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse stored user');
                localStorage.removeItem('naryn_user');
                localStorage.removeItem('naryn_token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await api('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            setUser(data.user);
            localStorage.setItem('naryn_token', data.token);
            localStorage.setItem('naryn_user', JSON.stringify(data.user));
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const data = await api('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password, role })
            });
            setUser(data.user);
            localStorage.setItem('naryn_token', data.token);
            localStorage.setItem('naryn_user', JSON.stringify(data.user));
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        console.log('Logging out...');
        setUser(null);
        localStorage.removeItem('naryn_user');
        localStorage.removeItem('naryn_token');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
