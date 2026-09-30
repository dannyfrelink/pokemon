import { Typography } from "@mui/material";

interface PokemonCardType {
  name: string;
  pokedex: number;
  image: string;
  handleShowDetails: (e: string) => void;
}

const PokemonCard = ({
  name,
  pokedex,
  image,
  handleShowDetails,
}: PokemonCardType) => {
  return (
    <div
      id={name}
      className="pokemon_card"
      onClick={(e) => handleShowDetails(e.currentTarget.id)}
    >
      <img src={image} alt={name} loading="lazy" />

      <article>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
        >
          {name.toUpperCase()}
        </Typography>

        <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
          Pokédex: {pokedex}
        </Typography>
      </article>
    </div>
  );
};

export default PokemonCard;
