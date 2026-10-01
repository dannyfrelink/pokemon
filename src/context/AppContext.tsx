import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { PokemonInfoType } from "../types/types";

interface AppContextType {
  searchResult: PokemonInfoType | null;
  setSearchResult: Dispatch<SetStateAction<PokemonInfoType | null>>;
  favorites: PokemonInfoType[];
  toggleFavorite: (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: PokemonInfoType
  ) => void;
  details: PokemonInfoType | null;
  setDetails: Dispatch<SetStateAction<PokemonInfoType | null>>;
  snackbarMessage: string;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchResult, setSearchResult] = useState<PokemonInfoType | null>(
    null
  );
  const [favorites, setFavorites] = useState<PokemonInfoType[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [details, setDetails] = useState<PokemonInfoType | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const toggleFavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: PokemonInfoType
  ) => {
    e.stopPropagation();

    setFavorites((prevFavorites) => {
      const alreadyFavorited = prevFavorites.some(
        (prev) => prev.name === pokemon.name
      );

      if (alreadyFavorited) {
        setSnackbarMessage(
          `${pokemon.name.toUpperCase()} has been removed from your favorites.`
        );
        return prevFavorites.filter((prev) => prev.name !== pokemon.name);
      } else {
        setSnackbarMessage(
          `${pokemon.name.toUpperCase()} has been added to your favorites.`
        );
        return [...prevFavorites, pokemon];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        searchResult,
        setSearchResult,
        favorites,
        toggleFavorite,
        details,
        setDetails,
        snackbarMessage,
        setSnackbarMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
