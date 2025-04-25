// context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Set API URL with fallback for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Log API URL at startup
console.log('AuthContext initialized with API_URL:', API_URL);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Set up axios instance
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
          setToken(storedToken);

          // Verify token by fetching user data
          const config = {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          };

          const res = await api.get('/auth/me', config);
          setUser(res.data.data);
        }
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/register', userData);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);

        // Fetch user data
        const userRes = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });

        setUser(userRes.data.data);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);

        // Fetch user data
        const userRes = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });

        setUser(userRes.data.data);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      router.push('/');
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await api.put('/auth/updatedetails', userData, config);
      setUser(res.data.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.put('/auth/updatepassword', passwordData, config);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      await api.post('/auth/forgotpassword', { email });
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (resetToken, password) => {
    setLoading(true);
    setError(null);

    try {
      await api.put(`/auth/resetpassword/${resetToken}`, { password });
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        updatePassword,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isAgent: user?.role === 'agent' || user?.role === 'admin',
      }}>
      {children}
    </AuthContext.Provider>
  );
};
