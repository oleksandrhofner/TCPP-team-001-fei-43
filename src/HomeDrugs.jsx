import React, {useState} from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";


import {drugsData} from "./DrugsAndMedications";


function HomePage() {
    const navigate = useNavigate(); // Хук для навігації
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChatButtonClick = () => {
        navigate("/chat"); // Перехід на сторінку чату
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Якщо рядок пошуку пустий, не відображаємо результати
        if (query.trim() === "") {
            setSearchResults([]);
        } else {
            // Фільтрація результатів
            setSearchResults(
                drugsData.filter((drug) => drug.toLowerCase().includes(query))
            );
        }
    };

    return (
        <>
            {/* Header */}
            <div className="page-container">
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

                {/* Search Section */}

                <section className="search-section">
                    <div className="search-container">
                        <h2 className="search-title">Find Drugs & Conditions</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearch}
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
                        {/* Мінімалістична стрічка результатів */}
                        {searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map((drug, index) => (
                                    <span key={index} className="search-result-item">
                {drug}
              </span>
                                ))}
                            </div>
                        )}
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

            <div className="disclaimer-wrapper">
                <div className="disclaimer-centered">
                    <p className="disclaimer-title">Disclaimer</p>
                    <p className="disclaimer-text">
                        Every effort has been made to ensure that the information provided is accurate, up-to-date and complete, but no guarantee is made to that effect. In addition, the drug information contained herein may be time sensitive and should not be utilized as a reference resource beyond the date hereof. This material does not endorse drugs, diagnose patients, or recommend therapy. This information is a reference resource designed as a supplement to, and not a substitute for, the expertise, skill, knowledge, and judgement of healthcare practitioners in patient care. The absence of a warning for a given drug or combination thereof in no way should be construed to indicate safety, effectiveness, or appropriateness for any given patient.
                        We does not assume any responsibility for any aspect of healthcare administered with the aid of materials provided. The information contained herein is not intended to cover all possible uses, directions, precautions, warnings, drug interactions, allergic reactions, or adverse effects. If you have questions about the substances you are taking, check with your doctor, nurse, or pharmacist.
                        Statistical data in medical articles offer general trends, not individual advice. Individual factors can vary significantly, so always seek personalized medical quidance for vour specific healthcare choices.
                    </p>
                </div>
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
