import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./DrugsAndMedications.module.css";
import Header from "./components/header";

export const drugsData = []; // Динамічно заповнюється при завантаженні

const DrugsAndMedications = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDrugs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_all_drugs");
        const data = await response.json();
        if (response.ok) {
          drugsData.push(...data); // Заповнюємо `drugsData`
        } else {
          setError(data.error || "Failed to load drugs data.");
        }
      } catch (err) {
        setError("An error occurred while loading drugs data.");
      }
    };
    fetchAllDrugs();
  }, []);

  const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
  );

  const handleLetterClick = (letter) => {
    navigate(`/drugs/${letter.toLowerCase()}`);
  };

  return (
      <div>
        <Header />
        <section className={style.container}>
          <h2 className={style.h2DrugsText}>Drugs & Medications A to Z</h2>
          <div className={style.alphabetContainer}>
            {alphabet.map((letter, index) => (
                <div
                    key={index}
                    className={style.alphabet}
                    onClick={() => handleLetterClick(letter)}
                >
                  {letter.toUpperCase()}
                </div>
            ))}
          </div>
          {error && <p className={style.error}>{error}</p>}
        </section>
      </div>
  );
};

export default DrugsAndMedications;
