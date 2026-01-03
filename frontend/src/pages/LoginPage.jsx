import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (token) {
      navigate('/questions');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('authorization', data.token);
        navigate('/questions');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        {error && <div className="login-error">{error}</div>}
        <div>
          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              className="login-input"
            />
          </div>
          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              className="login-input"
            />
          </div>
          <button onClick={handleSubmit} className="login-button">
            Login
          </button>
        </div>
        <p className="login-switch">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="login-link">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}