import React, { useMemo, useState } from "react";
import Card from "./Card";

export default function PokemondbPage({ pokemon }) {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("id");

  const sortedPokemon = useMemo(() => {
    let sorted = [...pokemon];
    if (sortType === "id") {
      sorted.sort((a, b) => a.id - b.id);
    } else if (sortType === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [pokemon, sortType]);

  const searchedPokemon = useMemo(() => {
    let searched = [...pokemon];
    const resultByName = searched.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
    const resultById = searched.filter((el) => el.id === parseInt(search));

    const results = [...new Set([...resultByName, ...resultById])];

    return results;
  }, [pokemon, search]);

  const displayedPokemon = search ? searchedPokemon : sortedPokemon;

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center">Pokemon Database</h1>
        <div className="flex justify-center mt-5 gap-4 ">
          <input className="bg-red-200 placeholder-gray-700" type="text" placeholder="Search pokemon" onChange={(e) => setSearch(e.target.value)} />
          <span>
            <label>Sort by: </label>
            <select className="bg-red-200" onChange={(e) => setSortType(e.target.value)}>
              <option className="placeholder-gray-700" value="id">
                Id
              </option>
              <option className="placeholder-gray-700" value="name">
                Name
              </option>
            </select>
          </span>
        </div>
        <div className="h-screen flex flex-wrap justify-start gap-3 m-5 p-3">
          <Card displayedPokemon={displayedPokemon} />
        </div>
      </div>
    </>
  );
}
