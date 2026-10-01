import { Search } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface SearchBarType {
  handleSearch: (e: any, search: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  resetError: () => void;
}

const SearchBar = ({
  handleSearch,
  isLoading,
  isError,
  resetError,
}: SearchBarType) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (isError) {
      resetError();
    }
  };

  return (
    <section className="search_bar">
      <form onSubmit={(e) => handleSearch(e, searchTerm)}>
        <TextField
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
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
            Pokemon {searchTerm.toUpperCase()} cannot be found.
          </Typography>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
