import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import style from "./DrugsAndMedications.module.css";

import Header from "./components/header";

// Test data for drugs names
export const drugsData = [];


const DrugsByCategory = [
    "Drug Dosage",
];

function DrugsAndMedications() {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(97 + i) // Літери a-z
    );
    const navigate = useNavigate();


    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [popularDrugSearches, setPopularDrugSearches] = useState([]);

    //const [drugInfo, setDrugInfo] = useState(null);
    const [error, setError] = useState("");


    // Fetch all drugs from Flask API
    useEffect(() => {
        const fetchAllDrugs = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/get_all_drugs");
                const data = await response.json();
                if (response.ok) {
                    drugsData.push(...data); // Populate drugsData
                } else {
                    setError(data.error || "Failed to load drugs data.");
                }
            } catch (err) {
                setError("An error occurred while loading drugs data.");
            }
        };
        fetchAllDrugs();
    }, []);

    // Fetch popular drugs from Flask API
    useEffect(() => {
        const fetchPopularDrugs = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/get_popular_drugs");
                const data = await response.json();
                if (response.ok) {
                    setPopularDrugSearches(data); // Set popular drugs
                } else {
                    setError(data.error || "Failed to load popular drugs.");
                }
            } catch (err) {
                setError("An error occurred while fetching popular drugs.");
            }
        };
        fetchPopularDrugs();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]);
        } else {
            // Фільтрація результатів
            setSearchResults(
                drugsData.filter((drug) =>
                    drug.medicine_name.toLowerCase().includes(query)
                )
            );
        }
    };

    // Handle letter navigation (A-Z)
    const handleLetterClick = (letter) => {
        navigate(`/drugs/${letter.toLowerCase()}`);
    };

    // Handle drug selection and fetch details from Flask API
    const handleDrugClick = async (medicineName) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/get_drug_details?drug_name=${medicineName}`
            );
            const data = await response.json();
            if (response.ok) {
                setSelectedDrug(data);
            } else {
                setError(data.error || "Failed to fetch drug details");
            }
        } catch (err) {
            setError("An error occurred while fetching drug details.");
        }
    };



    return (
        <div>
            {/* Додавання Header зверху */}
            <Header />

            {/* Основний контент сторінки */}
            <section className={style.container}>
                <h2 className={style.h2DrugsText}>Drugs & Medications A to Z</h2>
                <p className={style.text}>
                    Detailed and accurate information for both consumers and
                    <span className={style.healthcare_professionals}> healthcare professionals</span>
                </p>
                <div className={style.searchContainer}>
                    <h3 className={style.searchTitle}>Search</h3>
                    <div className={style.search_bar}>
                        <input
                            type="text"
                            className={style.search_input}
                            placeholder="Enter a drug name"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button className={style.search_button}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                                alt="Search"
                                className={style.search_icon}
                            />
                        </button>
                    </div>
                    {/* Мінімалістична стрічка пошукових результатів */}
                    {searchResults.length > 0 && (
                        <div className={style.searchResults}>
                            {searchResults.map((result, index) => (
                                <span
                                    key={index}
                                    className={style.searchResultItem}
                                    onClick={() => handleDrugClick(result.medicine_name)} // Функція перенесена в коректний контекст
                                >
                    {result.medicine_name}
                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={style.searchContainer}>
                    <h3 className={style.searchTitle}>Browse A-Z</h3>
                    <div className={style.alphabetContainer}>
                        {alphabet.map((letter, index) => (
                            <div
                                key={index}
                                className={style.alphabet}
                                onClick={() => handleLetterClick(letter)} // Перехід при натисканні
                            >
                                {letter.toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.browseDrugContainer}>
                    <h3>Browse drugs by category</h3>
                    <div className={style.browseDrugItemContainer}>
                        <a>Drug Approvals</a>
                        {DrugsByCategory.map((item) => (
                            <a key={item}>{item}</a>
                        ))}
                    </div>
                </div>

                <div className={style.browseDrugContainer}>
                    <h3>Popular drug searches</h3>
                    <div className={style.PopularDrugItemContainer}>
                        {popularDrugSearches.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleDrugClick(item)}
                                className={style.drugButton}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className={style.error}>{error}</p>}

                {selectedDrug && (
                    <div className={style.drugDetails}>
                        <h3>{selectedDrug.medicine_name}</h3>
                        <p><strong>Composition:</strong> {selectedDrug.composition}</p>
                        <p><strong>Uses:</strong> {selectedDrug.uses}</p>
                        <p><strong>Side Effects:</strong> {selectedDrug.side_effects}</p>
                        <p><strong>Manufacturer:</strong> {selectedDrug.manufacturer}</p>
                        <p><strong>Excellent Review %:</strong> {selectedDrug.excellent_review_percent}</p>
                        <p><strong>Average Review %:</strong> {selectedDrug.average_review_percent}</p>
                        <p><strong>Poor Review %:</strong> {selectedDrug.poor_review_percent}</p>
                        <img src={selectedDrug.image_url} alt={selectedDrug.medicine_name}/>
                    </div>
                )}

                {/* Display error if any */}
                {error && <p className={style.error}>{error}</p>}
            </section>
        </div>
    );
}

export default DrugsAndMedications;