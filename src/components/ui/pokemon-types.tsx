import React from "react";

interface PokemonDetails {
  types?: { type: { name: string } }[];
}

const typeColors: { [key: string]: string } = {
  normal: "gray-200",
  fire: "red-400",
  water: "blue-400",
  electric: "yellow-400",
  grass: "green-400",
  ice: "blue-200",
  fighting: "red-600",
  poison: "purple-400",
  ground: "yellow-600",
  flying: "indigo-400",
  psychic: "pink-400",
  bug: "green-600",
  rock: "gray-600",
  ghost: "indigo-800",
  dragon: "purple-600",
  dark: "gray-800",
  steel: "gray-500",
  fairy: "pink-200",
};

const PokemonTypes: React.FC<{ pokemonDetails: PokemonDetails }> = ({
  pokemonDetails,
}) => {
  return (
    <div className="flex">
      {pokemonDetails?.types?.map((item, index) => {
        const typeName: string = item.type.name;
        const colorClass: string = typeColors[typeName] || "bg-gray-200";
        return (
          <span
            key={index}
            className={`rounded-2xl px-4 py-2 text-sm font-bold mr-2 bg-${colorClass} border border-${colorClass} shadow-md`}
          >
            {typeName}
          </span>
        );
      })}
    </div>
  );
};

export default PokemonTypes;
