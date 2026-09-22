import { useState, useRef, useEffect, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './AppLayout.css';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { theme, toggleTheme, resetProfile } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReset = () => {
    resetProfile();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <div className="app-layout">
      {/* Sticky Top Navigation Bar */}
      <header className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <h2>CareerAI</h2>
              <span className="tagline">Your Career Co-pilot</span>
            </div>
          </div>

          <div className={`nav-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <nav className="nav-links">
              <NavLink to="/upload?type=resume" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-symbols-outlined nav-icon">upload_file</span>
                Upload
              </NavLink>

              <NavLink to="/review-profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-symbols-outlined nav-icon">verified_user</span>
                Review Profile
              </NavLink>
              
              <NavLink to="/gap-analysis" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-symbols-outlined nav-icon">analytics</span>
                Gap Analysis
              </NavLink>
              
              <NavLink to="/graph" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-symbols-outlined nav-icon">hub</span>
                Career Graph
              </NavLink>
              
              {/* Reset Dropdown */}
              <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                <button 
                  className={`nav-link dropdown-trigger ${isProfileMenuOpen ? 'active' : ''}`} 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="material-symbols-outlined nav-icon">settings</span>
                  Settings
                  <span className="material-symbols-outlined dropdown-arrow" style={{ transform: isProfileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    expand_more
                  </span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="profile-dropdown-menu">
                    <button className="dropdown-item destructive" onClick={handleReset}>
                      <span className="material-symbols-outlined">restart_alt</span>
                      Reset Data
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="nav-right">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle Dark Mode">
              <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="icon-btn mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
};
