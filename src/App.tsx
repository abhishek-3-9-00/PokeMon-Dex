import "./App.css";
import React from "react";
import Landing from "./components/Landing/landing";
import Layout from "./Layout/layout-wrapper";
import LandingSearch from "./components/Landing/landing-search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokeMonsList from "./components/PokemonList/pokemon-list";
import PokemonDetail from "./components/DetailPage/pokemon-detail-page";
import "react-responsive-carousel/lib/styles/carousel.min.css";


function App() {
  return (
    <Router>
      <Layout>
        <ToastContainer position="top-center" stacked autoClose={700} />
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/list" element={<PokeMonsList />} />
            <Route path="/details" element={<PokemonDetail />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
