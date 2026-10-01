import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchPokemonList from "../helper/fetchPokemonList";
import PokemonCard from "../components/PokemonCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "../context/AppContext";
import PokemonDetails from "../components/PokemonDetails";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [page, setPage] = useState<number>(0);
  const { searchResult, details } = useAppContext();

  const { data } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
    placeholderData: keepPreviousData,
  });

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
      </div>

      {details && <PokemonDetails />}
    </>
  );
};

export default Home;
