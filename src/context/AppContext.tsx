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
  favorites: PokemonInfoType[];
  toggleFavorite: (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: PokemonInfoType
  ) => void;
  details: PokemonInfoType | null;
  setDetails: Dispatch<SetStateAction<PokemonInfoType | null>>;
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
  const [favorites, setFavorites] = useState<PokemonInfoType[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [details, setDetails] = useState<PokemonInfoType | null>(null);

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
        return prevFavorites.filter((prev) => prev.name !== pokemon.name);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{ favorites, toggleFavorite, details, setDetails }}
    >
      {children}
    </AppContext.Provider>
  );
};
