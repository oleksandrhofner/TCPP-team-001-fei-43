import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*
import Header from './components/header';
import Companion from "./components/companion";
import SearchBlock from "./components/search";
import Footer from "./components/footer";
*/

import Form from "./form";

import DrugsFilterPage from "./DrugsFilter";
import HomePage from "./HomeDrugs";
import DrugsAndMedications from "./DrugsAndMedications";
import HomeDrugs from "./HomeDrugs";

/*
const drugsData = [
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
*/
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drugs" element={<DrugsAndMedications />} />
          <Route path="/drugs/:letter" element={<DrugsFilterPage />} />
          <Route path="/chat" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
