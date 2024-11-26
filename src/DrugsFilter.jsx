import { useParams, useNavigate } from "react-router-dom";
import style from "./DrugsFilter.module.css";
import { drugsData } from "./DrugsAndMedications";

const DrugsFilterPage = () => {
    const { letter } = useParams();
    const navigate = useNavigate();

    // Фільтруємо ліки, які починаються на вказану літеру
    const filteredDrugs = drugsData.filter((drug) =>
        drug.medicine_name.toLowerCase().startsWith(letter.toLowerCase())
    );

    const handleDrugClick = (medicineName) => {
        // Перехід до сторінки деталей препарату
        navigate(`/drugs/detail/${medicineName}`);
    };

    return (
        <section className={style.container}>
            <h2 className={style.header}>
                Drugs that start with '{letter.toUpperCase()}'
            </h2>
            <div className={style.drugListContainer}>
                {filteredDrugs.length > 0 ? (
                    filteredDrugs.map((drug, index) => (
                        <div key={index} className={style.drugItem} onClick={() => handleDrugClick(drug.medicine_name)}>
                            <h3>{drug.medicine_name}</h3>
                            <p>{drug.composition}</p>
                            <p>{drug.uses}</p>
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
