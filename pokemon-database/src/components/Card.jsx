import { React } from "react";
import { useNavigate } from "react-router-dom";
export default function Card({ displayedPokemon }) {
  const nav = useNavigate();

  return (
    <>
      {displayedPokemon.map((pokemon, index) => {
        return (
          <div
            className="max-w-[150px] p-3 text-center border border-black rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 hover: bg-red-200"
            key={index}
            onClick={() => nav(`/${pokemon.name}`)}
          >
            <p>
              #{pokemon.id} {pokemon.name}
            </p>
            <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} height={64} />
          </div>
        );
      })}
    </>
  );
}
