import React from "react";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">MediAnalytics</h1>
                <nav className="navigation">
                    <a href="#" className="nav-link">Drugs A-Z</a>
                    <a href="#" className="nav-link">...</a>
                    <a href="#" className="nav-link">Exploration More</a>
                    <a href="#" className="nav-link">Communication</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;