import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchPokemonList from "../api/fetchPokemonList";
import PokemonCard from "../components/PokemonCard";
import { useAppContext } from "../context/AppContext";
import PokemonDetails from "../components/PokemonDetails";
import SearchBar from "../components/SearchBar";
import { Box, IconButton, Pagination, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import fetchPokemonSearch from "../api/fetchPokemonSearch";

const Home = () => {
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("page");
    return savedPage ? JSON.parse(savedPage) : 1;
  });
  const { details, snackbarMessage, setSnackbarMessage } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  // Fetching Searched Pokemon
  const {
    data: pokemonSearch,
    isError: isErrorSearch,
    isLoading: isLoadingSearch,
  } = useQuery({
    queryKey: ["pokemon", searchQuery],
    queryFn: () => fetchPokemonSearch(searchQuery),
    enabled: !!searchQuery,
  });

  const searchedPokemon = !isErrorSearch ? pokemonSearch : null;

  // Fetching Pokemon List
  const { data: pokemonList } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (
    e: React.SubmitEvent<HTMLFormElement>,
    search: string
  ) => {
    e.preventDefault();

    setSearchQuery(search);
  };
  const handlePagination = (_: any, value: number) => {
    setPage(value);
    localStorage.setItem("page", JSON.stringify(value));
  };

  return (
    <>
      <div className="pokemon_content">
        <SearchBar
          handleSearch={handleSearch}
          isLoading={isLoadingSearch}
          isError={isErrorSearch}
          resetError={() => setSearchQuery("")}
        />

        <section className="pokemon_list">
          {searchedPokemon ? (
            <PokemonCard pokemon={searchedPokemon} />
          ) : (
            pokemonList &&
            pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          )}
        </section>

        {searchQuery === "" && (
          <Box sx={{ width: "100%" }}>
            <Pagination
              count={5}
              page={page}
              onChange={handlePagination}
              sx={{ width: "fit-content", mx: "auto" }}
            />
          </Box>
        )}
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

export default Home;
