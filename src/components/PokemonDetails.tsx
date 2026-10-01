import { Chip, IconButton, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { Clear, Favorite, FavoriteBorder } from "@mui/icons-material";
import Slider from "react-slick";
import BarChart from "./BarChart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface StatsConfigsType {
  [key: string]: {
    label: string;
    max: number;
  };
}

const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const statsConfigs: StatsConfigsType = {
  hp: { label: "HP", max: 200 },
  attack: { label: "ATK", max: 150 },
  defense: { label: "DEF", max: 200 },
  speed: { label: "SPD", max: 150 },
};

const PokemonDetails = () => {
  const { favorites, toggleFavorite, details, setDetails } = useAppContext();

  return (
    <section className="pokemon_details">
      <div>
        <header>
          <div>
            <Typography
              variant="body1"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
            >
              {details?.name.toUpperCase()}
            </Typography>

            <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
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
          <div className="pokemon_details_images">
            <Slider className="pokemon_details_slider" {...sliderSettings}>
              {details &&
                Object.values(details.sprites.other["official-artwork"]).map(
                  (image, index) =>
                    typeof image === "string" && (
                      <div key={index} className="pokemon_details_slider_item">
                        <img
                          src={image}
                          alt={`${details?.name} ${index}`}
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

            <IconButton
              className="favorite"
              color="inherit"
              aria-label="favorite"
              onClick={(e) => details && toggleFavorite(e, details)}
            >
              {favorites.find((favorite) => favorite.name === details?.name) ? (
                <Favorite color="error" fontSize="large" />
              ) : (
                <FavoriteBorder color="error" fontSize="large" />
              )}
            </IconButton>
          </div>

          <div>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600, mb: "0.25rem" }}
            >
              Description
            </Typography>

            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              {details?.description}
            </Typography>

            <div className="pokemon_details_types">
              {details?.types.map((type) => (
                <Chip
                  key={type.type.name}
                  label={type.type.name.toUpperCase()}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    height: "2.25rem",
                    px: "0.5rem",
                  }}
                />
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
              {details?.stats
                .filter((stat) => stat.stat.name in statsConfigs)
                .map((stat) => {
                  const config = statsConfigs[stat.stat.name];
                  const percentage = (stat.base_stat / config.max) * 100;

                  return (
                    <BarChart
                      key={stat.stat.name}
                      label={config.label}
                      percentage={percentage}
                      input={`${stat.base_stat} / ${config.max}`}
                    />
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
              {details?.moves.slice(0, 15).map((move, index) => (
                <Chip
                  key={move.move.name}
                  label={move.move.name.toUpperCase()}
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    fontWeight: 600,
                    py: "1.1rem",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PokemonDetails;
