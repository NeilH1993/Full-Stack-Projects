import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CardInfoPage({ pokemon }) {
  const { name } = useParams();
  const [pokemonStats, setPokemonStats] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const nav = useNavigate();
  const selectedPokemon = pokemon.find((el) => el.name === name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  useEffect(() => {
    if (selectedPokemon) {
      const types = selectedPokemon.types;
      types.map((type) => type.type.name);
      setPokemonTypes(types);

      const stats = selectedPokemon.stats;

      stats.map((el) => el.base_stat);
      setPokemonStats(stats);
    }
  }, [selectedPokemon]);

  return (
    <>
      <span>
        <button
          className="mb-4 px-4 py-2 bg-red-200 text-black rounded-lg shadow-md hover:bg-red-300 transition border-black relative top-20 left-96"
          onClick={() => nav("/")}
        >
          back
        </button>
      </span>
      {selectedPokemon && (
        <div className="h-screen flex flex-col items-center relative top-16">
          <div className="max-w-sm bg-red-200 shadow-lg rounded-lg p-9 flex flex-col items-center relative top-10 border border-black">
            <div className="relative w-full flex justify-center">
              <img src={selectedPokemon.sprites.other.home.front_default} alt={selectedPokemon.name} className="w-40 h-40 object-contain" />
            </div>
            <span className="bg-red-300 text-white text-xs px-2 py-1 rounded mt-3">#{selectedPokemon.id}</span>
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-bold capitalize">name: {selectedPokemon.name}</p>
            </div>
            <div className="card-info-types">
              <p className="text-sm bg-red-200 text-white px-2 py-1 rounded">
                {pokemonTypes.map((type, index) => {
                  return (
                    <span key={index}>
                      {type.type.name}
                      {index < pokemonTypes.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
              {pokemonStats.map((stat, index) => {
                return (
                  <p key={index} className="text-sm font-medium">
                    {stat.stat.name}: <span className="font-bold">{stat.base_stat}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
