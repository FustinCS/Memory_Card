import { Stack, Typography } from "@mui/material";
import { Cards } from "./cards";
import { useState } from "react";
import { CardItem, Scores } from "../interfaces";
import { fillWithRandomPokemon } from "../utils/PokemonAPI";

interface HomepageProps {
    allPokemon: CardItem[];
}

function Homepage({ allPokemon }: HomepageProps) {
  const [scores, setScores] = useState<Scores>({currentScore: 0, highScore: 0});

  const pokemonCards = fillWithRandomPokemon(allPokemon, 9);

  return (
    <Stack>
      <Typography variant="h1" sx={{textAlign: "center"}}>Memory Game</Typography>
      <Stack
        sx={{justifyContent: "center"}}
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Typography variant="h4">Current Score: {scores.currentScore}</Typography>
        <Typography variant="h4">High Score: {scores.highScore}</Typography>
      </Stack>
      <Cards allCards={pokemonCards} scores={scores} setScores={setScores}></Cards>
    </Stack>
  );
}

export { Homepage };
