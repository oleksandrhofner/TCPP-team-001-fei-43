import React, { useState } from "react";
import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";

function SymptomsChatGPT() {
    const [symptoms, setSymptoms] = useState(""); // State for input symptoms
    const [responseHtml, setResponseHtml] = useState(""); // State for the API response (HTML)
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleSearch = async () => {
        if (!symptoms.trim()) {
            alert("Please enter symptoms!");
            return;
        }

        setLoading(true);
        setResponseHtml(""); // Clear previous response

        try {
            const apiResponse = await fetch('http://localhost:5000/api/analyze-symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });

            if (!apiResponse.ok) {
                throw new Error('Failed to fetch response from server');
            }

            const data = await apiResponse.json();
            setResponseHtml(data.html); // Server returns HTML-formatted response
        } catch (error) {
            console.error('Error:', error);
            setResponseHtml("<p>An error occurred. Please try again later.</p>");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <Header />
                <section className="search-section">
                    <div className="search-container">
                        <h2 className="search-title">Symptoms</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Write your symptoms, e.g., headache, fever..."
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            />
                            <button
                                className="search-button"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                                    alt="Search"
                                    className="search-icon"
                                />
                            </button>
                        </div>
                    </div>
                </section>
                <section className="response-section">
                    {loading ? (
                        <p>Loading...</p>
                    ) : responseHtml ? (
                        <div
                            className="response-container"
                            dangerouslySetInnerHTML={{ __html: responseHtml }}
                        />
                    ) : null}
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default SymptomsChatGPT;