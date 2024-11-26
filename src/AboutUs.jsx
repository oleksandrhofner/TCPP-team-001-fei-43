import React from "react";
import "./App.css";
import "./styles/AboutUs.css"
import Header from "./components/header";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
        <Header />
        <div className="page-container">
        

        <section className="section-text">
          <div className="text-content">
            <h2>About us</h2>
            <p>
                Welcome to <strong>MediAnalytics</strong>, your gateway to accessible and innovative 
                solutions in the intersection of technology and healthcare. We are a team of dedicated 
                students driven by a shared passion for leveraging the power of technology to make health-related 
                information more accessible and user-friendly.

Our primary mission is to develop intuitive tools that empower individuals to explore and understand various aspects of medications and health topics. By providing an easily navigable platform, we aim to bridge the gap between complex medical knowledge and everyday users who seek clarity and insight.
            </p>
            <p>
                However, <strong>we are not medical experts</strong>, and our website should not be considered 
                a reliable source of professional consultation. Always consult a qualified 
                healthcare professional for accurate advice or information. Verify the 
                information you find here with trusted sources.
            </p>
          </div>

          <h2>Our Team</h2>
          <div className="team-photos">
            <div className="team-photo one">
            </div>
            <div className="team-photo two">
            </div>
            <div className="team-photo three">
            </div>
            <div className="team-photo four">
            </div>
            <div className="team-photo five">
            </div>
          </div>
        </section>
      </div>

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

export default AboutUs;
