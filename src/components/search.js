import React from "react";

const SearchBlock = () => {
    return (
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
                        <img src="https://cdn-icons-png.flaticon.com/512/622/622669.png" alt="Search"
                             className="search-icon"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default  SearchBlock ;