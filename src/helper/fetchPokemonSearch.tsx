const fetchPokemonSearch = async (search: string) => {
  try {
    const pokemonSearchRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${search}`
    );
    if (!pokemonSearchRes.ok)
      throw new Error(`HTTP error! Status: ${pokemonSearchRes.status}`);

    const pokemonResult = await pokemonSearchRes.json();
    return pokemonResult;
  } catch (error) {
    console.error("Could not fetch Pokemon data: ", error);
  }
};

export default fetchPokemonSearch;
