import { useState, useEffect, useMemo } from 'react'
import axios from "axios";
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PokemondbPage from './components/PokemondbPage'
import CardInfoPage from './components/CardInfoPage';

function App() {
  
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
      async function fetchData() {
        try {

          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`);
          const data = res.data.results
          
          const allData = await Promise.all(
              data.map(async (p) => {

                  const res = await axios.get(p.url)
                  return res.data;
                  
              })
              
          );
          
          setPokemon(allData);
          
          
      
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
    

  return (
    <>
    
    <Routes>
      <Route path='/' element={<PokemondbPage pokemon={pokemon} />} />
      <Route path='/:name' element={<CardInfoPage pokemon={pokemon} />} />
    </Routes>
    </>
  )
}

export default App
