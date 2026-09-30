const pageSize = 20;

interface PokemonListItemType {
  name: string;
  url: string;
}

const fetchPokemonList = async (page: number) => {
  try {
    const offset = page * pageSize;

    // Fetch pokemon list
    const pokemonListRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
    );
    const pokemonList = await pokemonListRes.json();

    const mergedPokemonData = await Promise.all(
      pokemonList.results.map(async (pokemon: PokemonListItemType) => {
        const pokemonRes = await fetch(pokemon.url);
        const pokemonData = await pokemonRes.json();

        const speciesRes = await fetch(pokemonData.species.url);
        const speciesData = await speciesRes.json();

        const englishEntries = speciesData.flavor_text_entries.filter(
          (entry: any) => entry.language.name === "en"
        );
        const uniqueDescriptions = new Set(
          englishEntries.map((entry: any) =>
            entry.flavor_text.replace(/[\n\f\r]/g, " ").trim()
          )
        );
        pokemonData.description = Array.from(uniqueDescriptions)
          .slice(0, 4)
          .join(" ");

        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();

        pokemonData.evolutions = evolutionData;

        return pokemonData;
      })
    );

    return mergedPokemonData;
  } catch (error) {
    console.error("Could not fetch Pokemon data: ", error);
  }

  //   const evolutionRes = await fetch(speciesData.evolution_chain.url);
  //   const evolutionData = await evolutionRes.json();
};

export default fetchPokemonList;
