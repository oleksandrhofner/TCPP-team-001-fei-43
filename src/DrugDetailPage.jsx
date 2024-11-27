import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./DrugDetailPage.module.css";

const DrugDetailPage = () => {
    const { medicineName } = useParams();
    const [drugDetails, setDrugDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrugDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/get_drug_info?drug_name=${medicineName}`);
                const data = await response.json();
                if (response.ok) {
                    setDrugDetails(data[0]); // Припускаємо, що ми отримуємо лише один препарат
                } else {
                    setError(data.error || "Failed to fetch drug details.");
                }
            } catch (err) {
                setError("An error occurred while loading drug details.");
            }
        };

        fetchDrugDetails();
    }, [medicineName]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!drugDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className={style.container}>
            <h1>{drugDetails.medicine_name}</h1>
            <p><strong>Composition:</strong> {drugDetails.composition}</p>
            <p><strong>Uses:</strong> {drugDetails.uses}</p>
            <p><strong>Side Effects:</strong> {drugDetails.side_effects}</p>
            <p><strong>Manufacturer:</strong> {drugDetails.manufacturer}</p>
            <img src={drugDetails.image_url} alt={drugDetails.medicine_name} />
            <p><strong>Excellent Review %:</strong> {drugDetails.excellent_review_percent}</p>
            <p><strong>Average Review %:</strong> {drugDetails.average_review_percent}</p>
            <p><strong>Poor Review %:</strong> {drugDetails.poor_review_percent}</p>
        </div>
    );
};

export default DrugDetailPage;
