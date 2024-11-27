import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./DrugsFilter.module.css";

const DrugsFilterPage = () => {
    const { letter } = useParams(); // Отримуємо літеру з URL
    const [drugs, setDrugs] = useState([]); // Зберігаємо всі препарати для літери
    const [filteredDrugs, setFilteredDrugs] = useState([]); // Відфільтровані препарати
    const [searchQuery, setSearchQuery] = useState(""); // Зберігаємо запит для пошуку
    const [error, setError] = useState("");

    // Функція для отримання препаратів для літери
    useEffect(() => {
        const fetchDrugsByLetter = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/get_drug_info?drug_name=${letter}`
                );
                const data = await response.json();
                if (response.ok) {
                    setDrugs(data);
                    setFilteredDrugs(data); // Спочатку всі препарати
                } else {
                    setError(data.error || "No data found.");
                    setDrugs([]);
                    setFilteredDrugs([]);
                }
            } catch (err) {
                setError("Failed to fetch drugs.");
                setDrugs([]);
                setFilteredDrugs([]);
            }
        };
        fetchDrugsByLetter();
    }, [letter]);

    // Оновлюємо список препаратів на основі пошукового запиту
    useEffect(() => {
        if (searchQuery) {
            setFilteredDrugs(
                drugs.filter((drug) =>
                    drug.medicine_name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredDrugs(drugs);
        }
    }, [searchQuery, drugs]);

    return (
        <section className={style.container}>
            <h2 className={style.header}>
                Drugs that start with '{letter.toUpperCase()}'
            </h2>

            {/* Поле для пошуку */}
            <div className={style.searchContainer}>
                <input
                    type="text"
                    className={style.searchInput}
                    placeholder="Search for a drug"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Список відфільтрованих препаратів */}
            <div className={style.drugListContainer}>
                {error ? (
                    <p className={style.error}>{error}</p>
                ) : filteredDrugs.length > 0 ? (
                    filteredDrugs.map((drug, index) => (
                        <div key={index} className={style.drugItem}>
                            <h3>{drug.medicine_name}</h3>
                            <button
                                className={style.detailsButton}
                                onClick={() =>
                                    window.location.href = `/drugs/detail/${drug.medicine_name}`
                                }
                            >
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No drugs found.</p>
                )}
            </div>
        </section>
    );
};

export default DrugsFilterPage;
