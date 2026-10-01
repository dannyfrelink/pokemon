import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchPokemonList from "../helper/fetchPokemonList";
import PokemonCard from "../components/PokemonCard";
import { Button, IconButton, LinearProgress, Typography } from "@mui/material";
import { PokemonInfoType } from "../types/types";
import { Clear } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [page, setPage] = useState<number>(0);
  const [details, setDetails] = useState<PokemonInfoType | null>(null);

  const { data } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
    placeholderData: keepPreviousData,
  });

  const handleShowDetails = (e: string) => {
    const selectedPokemon = data?.find((pokemon) => pokemon.name === e);

    setDetails(selectedPokemon);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="pokemon_list">
        {data &&
          data.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              handleShowDetails={handleShowDetails}
            />
          ))}
      </section>

      {details && (
        <section className="pokemon_details">
          <div>
            <header>
              <div>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
                >
                  {details.name.toUpperCase()}
                </Typography>

                <Typography
                  variant="caption"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Pokédex: {details?.id}
                </Typography>
              </div>

              <IconButton
                color="inherit"
                aria-label="close"
                onClick={() => setDetails(null)}
              >
                <Clear fontSize="large" />
              </IconButton>
            </header>

            <section className="pokemon_details_description">
              {/* Pokemon Image Carousel */}
              <Slider className="pokemon_details_slider" {...sliderSettings}>
                {Object.values(details.sprites.other["official-artwork"]).map(
                  (image, index) =>
                    typeof image === "string" && (
                      <div key={index} className="pokemon_details_slider_item">
                        <img
                          src={image}
                          alt={`${details.name} ${index}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </div>
                    )
                )}
              </Slider>

              <div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
                >
                  Description
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  {details.description}
                </Typography>

                <div className="pokemon_details_types">
                  {details.types.map((type) => (
                    <Button
                      variant="contained"
                      sx={{ pointerEvents: "none" }}
                      tabIndex={-1}
                    >
                      {type.type.name.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            <section className="pokemon_details_stats">
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
                >
                  Base stats
                </Typography>

                <div className="pokemon_details_base_stats">
                  {details.stats.map((stat) => {
                    let name;
                    let maximumStat;

                    switch (stat.stat.name) {
                      case "attack":
                        name = "ATK";
                        maximumStat = 1.5;
                        break;
                      case "defense":
                        name = "DEF";
                        maximumStat = 2;
                        break;
                      case "speed":
                        name = "SPD";
                        maximumStat = 1.5;
                        break;
                      case "hp":
                        name = "HP";
                        maximumStat = 2;
                        break;
                      default:
                        return;
                    }

                    const percentage =
                      maximumStat && stat.base_stat / maximumStat;

                    return (
                      <div>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ flexGrow: 1, mr: "1rem" }}
                        >
                          {name}
                        </Typography>

                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{
                            height: "2rem",
                            width: "90%",
                            borderRadius: 1,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
                >
                  Moves
                </Typography>

                <div className="pokemon_details_moves">
                  {details.moves.map(
                    (move, index) =>
                      index < 15 && (
                        <Button
                          variant="contained"
                          sx={{ pointerEvents: "none" }}
                          tabIndex={-1}
                        >
                          {move.move.name}
                        </Button>
                      )
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
