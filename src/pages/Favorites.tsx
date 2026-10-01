import PokemonCard from "../components/PokemonCard";
import PokemonDetails from "../components/PokemonDetails";
import { useAppContext } from "../context/AppContext";

const Favorites = () => {
  const { favorites, details } = useAppContext();

  return (
    <>
      <section className="pokemon_list">
        {favorites.map((favorite) => (
          <PokemonCard key={favorite.name} pokemon={favorite} />
        ))}
      </section>

      {details && <PokemonDetails />}
    </>
  );
};

export default Favorites;
