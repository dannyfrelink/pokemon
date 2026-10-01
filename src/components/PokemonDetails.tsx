import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { Clear } from "@mui/icons-material";
import Slider from "react-slick";

const PokemonDetails = () => {
  const { details, setDetails } = useAppContext();

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
                <Button
                  key={type.type.name}
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
              {details?.stats.map((stat) => {
                let name;
                let maximumStat;

                switch (stat.stat.name) {
                  case "attack":
                    name = "ATK";
                    maximumStat = 150;
                    break;
                  case "defense":
                    name = "DEF";
                    maximumStat = 200;
                    break;
                  case "speed":
                    name = "SPD";
                    maximumStat = 150;
                    break;
                  case "hp":
                    name = "HP";
                    maximumStat = 200;
                    break;
                  default:
                    return;
                }

                const percentage =
                  maximumStat && (stat.base_stat / maximumStat) * 100;

                return (
                  <div key={stat.stat.name}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ flexGrow: 1, mr: "1rem" }}
                    >
                      {name}
                    </Typography>

                    <Box
                      sx={{
                        position: "relative",
                        width: "90%",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: "2rem",
                          width: "100%",
                          borderRadius: 1,
                        }}
                      />

                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {`${stat.base_stat} / ${maximumStat}`}
                        </Typography>
                      </Box>
                    </Box>
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
              {details?.moves.map(
                (move, index) =>
                  index < 15 && (
                    <Button
                      key={move.move.name}
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
  );
};

export default PokemonDetails;
