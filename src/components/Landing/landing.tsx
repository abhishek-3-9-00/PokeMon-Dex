import React from "react";
import pokeball from "../../assets/pokemon.svg";
import Search from "../common/search";
import Button from "../common/button";
import LandingSearch from "./landing-search";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <nav className="p-4 bg-transparent flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <img src={pokeball} alt="Pokeball" className="h-20 w-20" />
          <h1 className="text-3xl font-bold text-black">Pokedex</h1>
        </div>
        <div className="flex items-center w-auto gap-2">
          <Link to="/list">
            <Button text="View Pokemons" />
          </Link>
        </div>
      </nav>
      <LandingSearch />
    </>
  );
};

export default Landing;
