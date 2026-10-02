interface StatsConfigsType {
  [key: string]: {
    label: string;
    max: number;
  };
}

export const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const statsConfigs: StatsConfigsType = {
  hp: { label: "HP", max: 200 },
  attack: { label: "ATK", max: 150 },
  defense: { label: "DEF", max: 200 },
  speed: { label: "SPD", max: 150 },
};
