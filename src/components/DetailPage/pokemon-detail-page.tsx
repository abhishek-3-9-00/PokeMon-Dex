import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PokemonTypes from "../ui/pokemon-types";
import PokemonStats from "../ui/pokemon-stats";

const PokemonDetailPage: React.FC = () => {
  const location = useLocation();
  const pokemonName = new URLSearchParams(location.search).get("name");
  const [loading, setLoading] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<any>({});
  const [speciesInfo, setSpeciesInfo] = useState<any>({});
  const [types, setTypes] = useState([]);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }
      const data = await response.json();
      setPokemonDetails(data);
      console.log();
    } catch (error) {
      toast.error("Failed to fetch Pokémon details");
    } finally {
      setLoading(false);
    }
  };

  const fetchSpeciesInfo = async () => {
    setLoading(true);

    try {
      const response = await fetch(pokemonDetails.species.url);
      if (!response.ok) {
        throw new Error("Failed to fetch species info");
      }
      const data = await response.json();
      setSpeciesInfo(data);
    } catch (error) {
      toast.error("Failed to fetch species info");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetails();
    }
  }, [pokemonName]);

  useEffect(() => {
    if (pokemonDetails.species) {
      fetchSpeciesInfo();
    }
  }, [pokemonDetails]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="bg-white/100 rounded-xl w-full flex flex-col border border-green-400 p-5 pb-20">
          {loading ? (
            <div className=" flex justify-center w-full items-center">
              <div className="font-bold text-2xl">....Loading</div>
            </div>
          ) : (
            <>
              <div className="w-full flex justify-center m-10">
                <div className="">
                  <h3 className="font-bold text-3xl">
                    {pokemonDetails.name?.charAt(0)?.toUpperCase() +
                      pokemonDetails?.name?.slice(1)}
                  </h3>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="bg-slate-400/10 w-[50%]  rounded-xl items-center justify-center flex">
                  <div>
                    <img
                      src={pokemonDetails.sprites?.front_default}
                      alt={pokemonDetails.name}
                      className="w-48 h-48 mb-2 z-10"
                    />
                  </div>
                </div>
                <div className=" w-[50%] rounded-xl items-center  flex flex-col p-2 gap-3">
                  <div className="border-2 border-gray-700/10 w-full p-2 rounded-lg">
                    <p className="font-bold">
                      {speciesInfo.flavor_text_entries?.[0]?.flavor_text}
                    </p>
                  </div>
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col w-full items-center">
                      <div className="border-2 border-gray-700/10 w-full p-2 rounded-lg flex justify-center items-center">
                        {pokemonDetails.height / 10} m
                      </div>
                      <div className="text-sm font-semibold">Height</div>
                    </div>
                    <div className="flex flex-col w-full items-center">
                      <div className="border-2 border-gray-700/10 w-full p-2 rounded-lg flex justify-center items-center">
                        {pokemonDetails.weight / 10} kg
                      </div>
                      <div className="text-sm font-semibold">Weight</div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full mt-3 gap-3">
                    <div>
                      <span className="font-bold text-xl">Types:</span>
                    </div>
                    <PokemonTypes pokemonDetails={pokemonDetails} />
                  </div>
                  <PokemonStats pokemonDetails={pokemonDetails} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonDetailPage;
