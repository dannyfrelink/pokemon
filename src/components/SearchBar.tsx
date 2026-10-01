import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import fetchPokemonSearch from "../helper/fetchPokemonSearch";
import { useAppContext } from "../context/AppContext";

const SearchBar = () => {
  const { setSearchResult } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["pokemon", searchQuery],
    queryFn: () => fetchPokemonSearch(searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearch = (e: any) => {
    e.preventDefault();

    setSearchQuery(searchTerm);
  };

  useEffect(() => {
    setSearchResult(data);
  }, [data]);

  return (
    <section className="search_bar">
      <form onSubmit={handleSearch}>
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokémon by name or number"
          variant="outlined"
          size="small"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" aria-label="search" edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
    </section>
  );
};

export default SearchBar;
