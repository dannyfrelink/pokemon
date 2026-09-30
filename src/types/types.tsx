export interface PokemonInfoType {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  description: string;
  evolutions: {
    id: number;
    baby_trigger_item: null;
    chain: {
      evolution_details: any[];
      evolves_to: any[];
      is_baby: boolean;
      species: {
        name: string;
        url: string;
      };
    };
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: any[];
  }[];
  name: string;
  order: number;
  past_abilities: {
    abilities: {
      ability: any;
      is_hidden: boolean;
      slot: number;
    }[];
    generation: {
      name: string;
      url: string;
    };
  }[];
  past_stats: {
    generation: {
      name: string;
      url: string;
    };
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    };
  }[];
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      dream_world: {
        [key: string]: string | undefined;
      };
      home: {
        [key: string]: string | undefined;
      };
      "official-artwork": {
        [key: string]: string | undefined;
      };
      showdown: {
        [key: string]: string | undefined;
      };
    };
    versions: any;
    back_default: string | undefined;
    back_shiny_female: string | undefined;
    back_shiny: string | undefined;
    back_female: string | undefined;
    front_default: string | undefined;
    front_shiny_female: string | undefined;
    front_shiny: string | undefined;
    front_female: string | undefined;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}
