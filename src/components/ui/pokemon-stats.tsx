import React from "react";

interface PokemonDetails {
  stats?: { base_stat: number; stat: { name: string } }[];
}

const PokemonStats: React.FC<{ pokemonDetails: PokemonDetails }> = ({
  pokemonDetails,
}) => {
  return (
    <div className="flex flex-col w-full mt-3 gap-3">
      <div>
        <span className="font-bold text-xl">Stats:</span>
      </div>
      <div>
        {pokemonDetails?.stats?.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-40 font-bold">{stat.stat.name}:</span>
            <div className="bg-gray-300 h-4 flex items-center rounded-full w-full relative">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              ></div>
              <span className="absolute right-2 text-sm text-black font-bold">
                {stat.base_stat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
