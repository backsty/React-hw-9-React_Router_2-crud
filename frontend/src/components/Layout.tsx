import React, { memo } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-container">
          <h1>
            <Link to="/" className="header-title">
              Социальная сеть
            </Link>
          </h1>
          <nav className="header-nav">
            <Link to="/" className="nav-link">
              Главная
            </Link>
            <Link to="/posts/new" className="nav-link">
              Создать пост
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} CRUD React Application</p>
        </div>
      </footer>
    </div>
  );
};

export default memo(Layout);
