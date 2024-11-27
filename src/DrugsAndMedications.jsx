import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import style from "./DrugsAndMedications.module.css";

import Header from "./components/header";

// Test data for drugs names
export const drugsData = [
    "Aspirin",
    "Ibuprofen",
    "Paracetamol",
    "Amoxicillin",
    "Metformin",
    "Lisinopril",
    "Lipitor",
    "Prednisone",
    "Atorvastatin",
    "Levothyroxine",
    "Omeprazole",
    "Gabapentin",
    "Alprazolam",
    "Fluoxetine",
    "Clonazepam",
    "Zoloft",
    "Citalopram",
    "Tamsulosin",
    "Hydrochlorothiazide",
    "Warfarin",
];


const DrugsByCategory = [
    "Drug Dosage",
];

const popularDrugSearches = [
    "Aspirin",
    "Ibuprofen",
    "Paracetamol",
    "Amoxicillin",
    "Metformin",
    "Lisinopril",
    "Lipitor",
    "Prednisone",
    "Atorvastatin",
    "Levothyroxine",
    "Omeprazole",
    "Gabapentin",
    "Alprazolam",
    "Fluoxetine",
    "Clonazepam",
    "Zoloft",
    "Citalopram",
    "Tamsulosin",
    "Hydrochlorothiazide",
    "Warfarin",
];

function DrugsAndMedications() {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(97 + i) // Літери a-z
    );
    const navigate = useNavigate();

    // Обробка натискання на букву
    const handleLetterClick = (letter) => {
        navigate(`/drugs/${letter.toLowerCase()}`); // Перехід на сторінку фільтрації по літері
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [drugInfo, setDrugInfo] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]);
        } else {
            // Фільтрація результатів
            setSearchResults(
                drugsData.filter((drug) => drug.toLowerCase().includes(query))
            );
        }
    };

    const fetchDrugInfo = async (drugName) => {
        try {
            setError(""); // Скидання помилки перед запитом
            const response = await fetch(
                `http://127.0.0.1:5000/get_drug_info?drug_name=${drugName}`
            );

            const data = await response.json();
            console.log("Fetched drug info:", data);

            if (response.ok) {
                setDrugInfo(data);
            } else {
                setError(data.error || "An error occurred.");
            }
        } catch (err) {
            setError("Failed to fetch drug information.");
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
                                <span key={index} className={style.searchResultItem}>
                                    {result}
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
                                onClick={() => fetchDrugInfo(item)}
                                className={style.drugButton}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className={style.error}>{error}</p>}

                {drugInfo && (
                    <div className={style.drugInfo}>
                        <h3>Drug Information</h3>
                        <div className={style.drugCard}>
                            {drugInfo.length > 0 ? (
                                drugInfo.map((info, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{info.medicine_name}</strong>
                                        </p>
                                        <p>
                                            <strong>Composition:</strong> {info.composition}
                                        </p>
                                        <p>
                                            <strong>Uses:</strong> {info.uses}
                                        </p>
                                        <p>
                                            <strong>Side Effects:</strong> {info.side_effects}
                                        </p>
                                        <img src={info.image_url} alt={info.medicine_name}/>
                                        <p>
                                            <strong>Manufacturer:</strong> {info.manufacturer}
                                        </p>
                                        <p>
                                            <strong>Excellent Review %:</strong>{" "}
                                            {info.excellent_review_percent}%
                                        </p>
                                        <p>
                                            <strong>Average Review %:</strong>{" "}
                                            {info.average_review_percent}%
                                        </p>
                                        <p>
                                            <strong>Poor Review %:</strong> {info.poor_review_percent}
                                            %
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No information available for this drug.</p>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default DrugsAndMedications;