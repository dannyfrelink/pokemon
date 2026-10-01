import { Search } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import fetchPokemonSearch from "../helper/fetchPokemonSearch";
import { useAppContext } from "../context/AppContext";

const SearchBar = () => {
  const { setSearchResult } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["pokemon", searchQuery],
    queryFn: () => fetchPokemonSearch(searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearch = (e: any) => {
    e.preventDefault();

    setSearchQuery(searchTerm);
  };

  useEffect(() => {
    if (isError) {
      setSearchQuery("");
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!isError) {
      setSearchResult(data);
    }
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

      {isLoading && (
        <div>
          <CircularProgress
            size={"1.5rem"}
            aria-label="loading"
            sx={{ flexGrow: 1, mt: "0.5rem" }}
          />
        </div>
      )}

      {isError && (
        <div>
          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1, color: "red", mt: "0.5rem" }}
          >
            Pokemon {searchTerm} cannot be found.
          </Typography>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
