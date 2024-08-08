import {
  Card,
  CardMedia,
  Stack,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { CardItem } from "../interfaces";
import { Scores } from "../interfaces";
import { useState } from "react";

interface CardProps {
  allCards: CardItem[];
  scores: Scores;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
}

function Cards({ allCards, scores, setScores }: CardProps) {
  const [usedCards, setUsedCards] = useState<string[]>([]);


  const handleScore = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardText = event.currentTarget.querySelector("h6")!.textContent!;
    let newScore = scores.currentScore;

    if (usedCards.includes(cardText)) {
      setScores({ ...scores, currentScore: 0 });
      setUsedCards([]);
    } else {
      newScore++;

      // high score checking
      setScores({highScore: Math.max(newScore, scores.highScore), currentScore: newScore})
      setUsedCards([...usedCards, cardText]);
    }
  };

  const cards = allCards.map((card: CardItem) => (
    <Button
      sx={{
        textTransform: "none",
        "&:focus": {
          outline: "none",
        },
      }}
      onClick={handleScore}
      key={card.name}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 300,
          maxHeight: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          image={card.image}
          alt={card.name}
          sx={{ maxHeight: 100, maxWidth: 100, objectFit: "contain" }}
        />
        <Typography variant="h6">{card.name}</Typography>
      </Card>
    </Button>
  ));

  return (
    <Container>
      <Stack
        sx={{ justifyContent: "center" }}
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {cards}
      </Stack>
    </Container>
  );
}

export { Cards };
