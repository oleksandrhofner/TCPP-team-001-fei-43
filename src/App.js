import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*
import Header from './components/header';
import Companion from "./components/companion";
import SearchBlock from "./components/search";
import Footer from "./components/footer";
*/

import Form from './form';
import DrugsFilterPage from './DrugsFilter';
import HomePage from "./HomeDrugs";
import DrugsAndMedications from "./DrugsAndMedications";
import SymptomsPage from "./SymptomsChatGPT";
import AboutUS from "./AboutUs";
import DrugDetailPage from "./DrugDetailPage";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/drugs" element={<DrugsAndMedications />} />
                    <Route path="/drugs/:letter" element={<DrugsFilterPage />} />
                    <Route path="/symptoms" element={<SymptomsPage/>} />
                    <Route path="/chat" element={<Form/>}/>
                    <Route path="/aboutus" element={<AboutUS />} />
                    <Route path="/drugs/detail/:medicineName" element={<DrugDetailPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;