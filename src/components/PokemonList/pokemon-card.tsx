import React from "react";
import { useNavigate } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();
  const extractPokemonId = (url: string): string => {
    const parts = url.split("/");
    return parts[parts?.length - 2];
  };

  const handleCardNavigate = () => {
    navigate(`/details?name=${pokemon?.name}`);
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-md flex flex-col items-center cursor-pointer"
      onClick={handleCardNavigate}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(
          pokemon?.url
        )}.png`}
        alt={pokemon.name}
        className="h-32 w-32"
      />
      <h2 className="text-xl font-semibold mt-2">{pokemon.name}</h2>
    </div>
  );
};

export default PokemonCard;
