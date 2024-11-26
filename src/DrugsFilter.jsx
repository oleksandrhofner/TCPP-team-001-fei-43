import { useParams } from "react-router-dom";
import style from "./DrugsFilter.module.css";
import { drugsData } from "./DrugsAndMedications"; // Імпортуємо дані

const DrugsFilterPage = () => {
    const { letter } = useParams(); // Отримуємо літеру з URL

    // Фільтруємо ліки, що починаються на певну літеру
    const filteredDrugs = drugsData.filter((drug) =>
        drug.name.toLowerCase().startsWith(letter.toLowerCase())
    );

    return (
        <section className={style.container}>
            <h2 className={style.header}>
                Drugs that start with '{letter.toUpperCase()}'
            </h2>

            <div className={style.drugListContainer}>
                {filteredDrugs.length > 0 ? (
                    filteredDrugs.map((drug, index) => (
                        <div key={index} className={style.drugItem}>
                            <h3>{drug.name}</h3>
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