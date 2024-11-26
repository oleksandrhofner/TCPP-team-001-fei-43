import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./form";
import DrugsFilterPage from "./DrugsFilter";
import HomePage from "./HomeDrugs";
import DrugsAndMedications from "./DrugsAndMedications";
import DrugDetailPage from "./DrugDetailPage";  // Новий компонент для деталей препарату

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drugs" element={<DrugsAndMedications />} />
          <Route path="/drugs/:letter" element={<DrugsFilterPage />} />
          <Route path="/drugs/detail/:medicineName" element={<DrugDetailPage />} /> {/* Новий маршрут */}
          <Route path="/chat" element={<Form />} />
        </Routes>
      </Router>
  );
}

export default App;
