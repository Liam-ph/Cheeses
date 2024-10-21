import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cheese from "./Cheese.jsx";
import CheeseDetail from "./CheeseDetail.jsx";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes> 
          <Route path="/cheeses/:cheeseId" element={<CheeseDetail />} /> 
          <Route path="/cheeses" element={<Cheese />} /> 
          <Route path="/" element={<Cheese />} /> 
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
