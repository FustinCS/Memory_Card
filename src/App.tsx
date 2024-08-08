import { useEffect, useState } from "react";
import "./App.css";
import { Homepage } from "./components/homepage";
import { CardItem } from "./interfaces";
import { createPokemonCardList } from "./utils/PokemonAPI";
import { Typography } from "@mui/material";

function App() {
  // stored values for all pokemon
  const [pokemonData, setPokemonData] = useState<CardItem[]>([]);

  useEffect(() => {
    // Fetch the Pokémon data when the component mounts
    async function fetchData() {
      try {
        const data = await createPokemonCardList();
        setPokemonData(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
    fetchData();

    return setPokemonData([]);

  }, []);

  return (
    <>
      {pokemonData.length ? (
        <Homepage allPokemon={pokemonData} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}

export default App;
