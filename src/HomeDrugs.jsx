import React from "react";
import "./App.css";
import "./styles/Scrollable.css";
import Header from "./components/header";
import { useNavigate } from "react-router-dom";

import ScrollableIcons from "./scrollable";

function HomePage() {
  const navigate = useNavigate(); // Хук для навігації
  const handleChatButtonClick = () => {
    navigate("/chat"); // Перехід на сторінку чату
  };

  return (
    <>
      {/* Header */}
      <div className="page-container">
      <Header />
        {/* Search Section */}

        <section className="search-section">
          <div className="search-container">
            <h2 className="search-title">Find Drugs & Conditions</h2>
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Enter a drug name, pill imprint, etc."
              />
              <button className="search-button">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                  alt="Search"
                  className="search-icon"
                />
              </button>
            </div>
          </div>
        </section>

        {/* Companion Section */}
        <section className="companion-section">
          <div className="companion-container">
            <div className="text-content">
              <h2 className="companion-title">Your Health Companion</h2>
              <p className="companion-subtitle">
                Expert advice in matters of choice and advice on medicines.
              </p>
            </div>
            <button className="chat-button" onClick={handleChatButtonClick}>
              Let's Chat
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-contact">
            <span className="footer-icon">📧</span>
            <a href="mailto:info@medianalytics.com" className="footer-email">
              info@medianalytics.com
            </a>
            <p className="footer-address">
              вул. Драгоманова 50, м. Львів, Україна
            </p>
          </div>
          <p className="footer-copyright">&copy; 2024 MediAnalytics</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
