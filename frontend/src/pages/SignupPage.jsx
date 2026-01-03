import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import '../styles/SignupPage.css';

export default function SignupPage() {
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
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        navigate('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Signup failed');
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
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        {error && <div className="signup-error">{error}</div>}
        <div>
          <div className="signup-form-group">
            <label className="signup-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              className="signup-input"
            />
          </div>
          <div className="signup-form-group">
            <label className="signup-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              className="signup-input"
            />
          </div>
          <button onClick={handleSubmit} className="signup-button">
            Sign Up
          </button>
        </div>
        <p className="signup-switch">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="signup-link">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}