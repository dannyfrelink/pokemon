import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchPokemonList from "../helper/fetchPokemonList";
import PokemonCard from "../components/PokemonCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "../context/AppContext";
import PokemonDetails from "../components/PokemonDetails";
import SearchBar from "../components/SearchBar";
import { Box, Pagination } from "@mui/material";

const Home = () => {
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("page");
    return savedPage ? JSON.parse(savedPage) : 1;
  });
  const { searchResult, details } = useAppContext();

  const { data } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  const handlePagination = (_: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className="pokemon_content">
        <SearchBar />

        <section className="pokemon_list">
          {searchResult ? (
            <PokemonCard pokemon={searchResult} />
          ) : (
            data &&
            data.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          )}
        </section>

        <Box sx={{ width: "100%" }}>
          <Pagination
            count={5}
            page={page}
            onChange={handlePagination}
            sx={{ width: "fit-content", mx: "auto" }}
          />
        </Box>
      </div>

      {details && <PokemonDetails />}
    </>
  );
};

export default Home;
