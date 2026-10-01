import { createContext, useState, ReactNode, useContext } from "react";
import { PokemonInfoType } from "../types/types";

interface AppContextType {
  favorites: PokemonInfoType[];
  toggleFavorite: (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: PokemonInfoType
  ) => void;
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
    <AppContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};
