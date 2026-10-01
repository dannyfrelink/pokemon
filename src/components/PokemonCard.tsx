import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { PokemonInfoType } from "../types/types";
import { useAppContext } from "../context/AppContext";

interface PokemonCardType {
  pokemon: PokemonInfoType;
}
const PokemonCard = ({ pokemon }: PokemonCardType) => {
  const { favorites, toggleFavorite, setDetails } = useAppContext();

  return (
    <div
      id={pokemon.name}
      className="pokemon_card"
      onClick={() => setDetails(pokemon)}
    >
      <IconButton
        className="favorite"
        color="inherit"
        aria-label="favorite"
        onClick={(e) => toggleFavorite(e, pokemon)}
      >
        {favorites.some((favorite) => favorite.name === pokemon.name) ? (
          <Favorite color="error" fontSize="large" />
        ) : (
          <FavoriteBorder color="error" fontSize="large" />
        )}
      </IconButton>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        loading="lazy"
      />

      <article>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
        >
          {pokemon.name.toUpperCase()}
        </Typography>

        <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
          Pokédex: {pokemon.id}
        </Typography>
      </article>
    </div>
  );
};

export default PokemonCard;
