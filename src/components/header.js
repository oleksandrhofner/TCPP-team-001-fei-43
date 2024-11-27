import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          MediAnalytics
        </a>
        <nav className="navigation">
          <a href="/drugs" className="nav-link">
            Drugs A-Z
          </a>
          <a href="/symptoms" className="nav-link">
            Symptoms
          </a>
          <a href="/chat" target="_blank" className="nav-link">
            Communication
          </a>
          <a href="/aboutus" className="nav-link">
            About us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
