import React from "react";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-contact">
                    <span className="footer-icon">📧</span>
                    <a href="mailto:info@medianalytics.com" className="footer-email">info@medianalytics.com</a>
                    <p className="footer-address">вул. Драгоманова 50, м. Львів, Україна</p>
                </div>
                <p className="footer-copyright">
                    &copy; 2024 MediAnalytics
                </p>
            </div>
        </footer>
    );
};

export default Footer;