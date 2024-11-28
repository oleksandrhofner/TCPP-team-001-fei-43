import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./DrugsFilter.module.css";

// Функція для отримання даних з Flask API
const DrugsFilterPage = () => {
  const { letter } = useParams(); // Отримуємо літеру з URL
  const navigate = useNavigate(); // Хук для навігації
  const [drugs, setDrugs] = useState([]); // Зберігаємо всі препарати
  const [filteredDrugs, setFilteredDrugs] = useState([]); // Відфільтровані препарати
  const [error, setError] = useState("");
  const [columns, setColumns] = useState(2); // Стан для кількості колонок

  const handleColumnsChange = (e) => {
    setColumns(parseInt(e.target.value)); // Оновлюємо кількість колонок
  };
  // Отримуємо препарати для літери через Flask API
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
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query.trim() === "") {
      setFilteredDrugs(drugs);
    } else {
      setFilteredDrugs(
        drugs.filter((drug) => drug.medicine_name.toLowerCase().includes(query))
      );
    }
  };

  return (
    <section className={style.container}>
      <button className={style.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <div className={style.inputAndTiitleContainer}>
        <h2 className={style.header}>
          Drugs that start with '{letter.toUpperCase()}'
        </h2>
        {/* Поле для пошуку */}
        <div className={style.searchContainer}>
          <h3 className={style.searchTitle}>Search</h3>
          <div className={style.search_bar}>
            <input
              type="text"
              className={style.search_input}
              placeholder="Enter a drug name"
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
        </div>
      </div>
      <div className={style.columnsSelector}>
        <label htmlFor="columns">Select number of columns: </label>
        <select id="columns" value={columns} onChange={handleColumnsChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      {/* Список відфільтрованих препаратів */}
      <div
        className={style.drugListContainer}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`, // Динамічна кількість колонок
        }}
      >
        {error ? (
          <p className={style.error}>{error}</p>
        ) : filteredDrugs.length > 0 ? (
          filteredDrugs.map((drug, index) => (
            <div key={index} className={style.drugItem}>
              <h3>{drug.medicine_name}</h3>
              <button
                className={style.detailsButton}
                onClick={() =>
                  (window.location.href = `/drugs/detail/${drug.medicine_name}`)
                }
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No drugs found for this letter.</p>
        )}
      </div>
    </section>
  );
};

export default DrugsFilterPage;
