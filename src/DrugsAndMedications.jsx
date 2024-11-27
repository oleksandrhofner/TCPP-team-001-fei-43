import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./DrugsAndMedications.module.css";
import Header from "./components/header";

export const drugsData = [];

const DrugsAndMedications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const navigate = useNavigate();

  // Fetch all drugs from the API
  useEffect(() => {
    const fetchAllDrugs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_all_drugs");
        const data = await response.json();
        if (response.ok) {
          drugsData.push(...data); // Populate `drugsData`
        } else {
          setError(data.error || "Failed to load drugs data.");
        }
      } catch (err) {
        setError("An error occurred while loading drugs data.");
      }
    };
    fetchAllDrugs();
  }, []);

  // Alphabet for A-Z navigation
  const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
  );

  const handleLetterClick = (letter) => {
    navigate(`/drugs/${letter.toLowerCase()}`);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter drugs based on search query
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      setSearchResults(
          drugsData.filter((drug) =>
              drug.medicine_name.toLowerCase().includes(query)
          )
      );
    }
  };

  // Handle drug selection and fetch its details
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
        <Header />
        <section className={style.container}>
          <h2 className={style.h2DrugsText}>Drugs & Medications A to Z</h2>

          {/* Search Section */}
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

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className={style.searchResults}>
                  {searchResults.map((result, index) => (
                      <span
                          key={index}
                          className={style.searchResultItem}
                          onClick={() => handleDrugClick(result.medicine_name)}
                      >
                  {result.medicine_name}
                </span>
                  ))}
                </div>
            )}
          </div>

          {/* Alphabet Navigation */}
          <h3 className={style.searchTitle}>Browse A-Z</h3>
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

          {/* Display selected drug details */}
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
                <img src={selectedDrug.image_url} alt={selectedDrug.medicine_name} />
              </div>
          )}

          {error && <p className={style.error}>{error}</p>}
        </section>
      </div>
  );
};

export default DrugsAndMedications;
