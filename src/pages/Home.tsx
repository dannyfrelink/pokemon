import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchPokemonList from "../helper/fetchPokemonList";
import PokemonCard from "../components/PokemonCard";

const Home = () => {
  const [page, setPage] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <section className="pokemon_list">
      {data &&
        data.map((pokemon) => (
          <PokemonCard
            name={pokemon.name}
            pokedex={pokemon.id}
            image={pokemon.sprites.other["official-artwork"].front_default}
          />
        ))}
    </section>
  );
};

export default Home;
