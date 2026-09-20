import React from 'react';

import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {title && <h2 className="sidebar-title">{title}</h2>}
          <button className="sidebar-close" onClick={onClose} style={{background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="sidebar-content">
          {children}
        </div>
      </aside>
    </>
  );
};
