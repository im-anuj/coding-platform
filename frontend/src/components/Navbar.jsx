import { UserSvg, LogOutSvg } from './icons';
import '../styles/Navbar.css';

export default function Navbar({ user, onLogout, showBack, onBack }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {showBack ? (
          <button onClick={onBack} className="navbar-back-btn">
            ← Back to Problems
          </button>
        ) : (
          <h1 className="navbar-title">CodePractice</h1>
        )}
        
        <div className="navbar-user-section">
          {user && (
            <div className="navbar-user-info">
              <UserSvg />
              <span>{user.email}</span>
            </div>
          )}
          <button onClick={onLogout} className="navbar-logout-btn">
            <LogOutSvg />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}