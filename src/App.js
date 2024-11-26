import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*
import Header from './components/header';
import Companion from "./components/companion";
import SearchBlock from "./components/search";
import Footer from "./components/footer";
*/

//import Page from "./components/testPage"

import Drugs from "./DrugsAndMedications";
import HomePage from "./HomeDrugs";
import DrugsAndMedications from "./DrugsAndMedications";
import HomeDrugs from "./HomeDrugs";
import Page from "./components/testPage";
import Form from "./form";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeDrugs />} />
          <Route path="/drugs" element={<DrugsAndMedications />} />
          <Route path="/chat" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
