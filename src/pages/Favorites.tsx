import { IconButton, Snackbar } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import PokemonDetails from "../components/PokemonDetails";
import { useAppContext } from "../context/AppContext";
import { Close } from "@mui/icons-material";

const Favorites = () => {
  const { favorites, details, snackbarMessage, setSnackbarMessage } =
    useAppContext();

  return (
    <>
      <section className="pokemon_list">
        {favorites.map((favorite) => (
          <PokemonCard key={favorite.name} pokemon={favorite} />
        ))}
      </section>

      {details && <PokemonDetails />}

      <Snackbar
        open={snackbarMessage !== ""}
        autoHideDuration={2000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarMessage("")}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default Favorites;
