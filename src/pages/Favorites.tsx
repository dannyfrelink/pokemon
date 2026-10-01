import { IconButton, Snackbar } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import PokemonDetails from "../components/PokemonDetails";
import { useAppContext } from "../context/AppContext";
import { Close } from "@mui/icons-material";
import SearchBar from "../components/SearchBar";
import { useMemo, useState } from "react";
import { PokemonInfoType } from "../types/types";

const Favorites = () => {
  const { favorites, details, snackbarMessage, setSnackbarMessage } =
    useAppContext();
  const [favoritesSearch, setFavoritesSearch] =
    useState<PokemonInfoType | null>();
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = (
    e: React.SubmitEvent<HTMLFormElement>,
    search: string
  ) => {
    e.preventDefault();
    const favoriteFound = favorites.find(
      (favorite) =>
        favorite.name === search || favorite.id.toString() === search
    );

    if (favoriteFound) {
      setFavoritesSearch(favoriteFound);
    } else {
      setIsError(true);
      setFavoritesSearch(null);
    }
  };

  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => a.id - b.id);
  }, [favorites]);

  return (
    <>
      <div className="pokemon_content">
        <SearchBar
          handleSearch={handleSearch}
          isError={isError}
          resetError={() => setIsError(false)}
        />

        <section className="pokemon_list">
          {favoritesSearch ? (
            <PokemonCard pokemon={favoritesSearch} />
          ) : (
            sortedFavorites.map((favorite) => (
              <PokemonCard key={favorite.name} pokemon={favorite} />
            ))
          )}
        </section>
      </div>

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
