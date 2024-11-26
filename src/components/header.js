import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo-name">
          MediAnalytics
        </a>
        <nav className="navigation">
          <a href="/drugs" className="nav-link">
            Drugs A-Z
          </a>
          <a href="#" className="nav-link">
            ...
          </a>
          <a href="#" className="nav-link">
            Exploration More
          </a>
          <a href="/chat" target="_blank" className="nav-link">
            Communication
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
