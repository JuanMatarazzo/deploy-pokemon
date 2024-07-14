import axios from "axios";
export const ALL_POKES = "ALL_POKES";
export const GET_POKEMONBYNAME = "GET_POKEMONBYNAME";
export const FILTERS_BYAPIORDB = "FILTERS_BYAPIORDB";
export const FILTERS_BYATTACK = "FILTERS_BYATTACK";
export const FILTERS_BYNAME = "FILTERS_BYNAME";
export const TYPES = "TYPES";
export const TYPES_FILTERS = "TYPES_FILTERS";
export const POKEMONS_BYID = "POKEMONS_BYID";
export const LIMP_DETAIL = "LIMP_DETAIL";
export const GET_POKEMONCREATE = "GET_POKEMONCREATE";
export const LIMP_FORMSTATE = "LIMP_FORMSTATE";

export const GetPokemonsAll = () => {
  return function (dispatch) {
    try {
      axios
        .get("/pokemons")
        .then((data) => dispatch({ type: ALL_POKES, payload: data.data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/pokemons?name=${name}`
      );
      dispatch({ type: GET_POKEMONBYNAME, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_POKEMONBYNAME, payload: ["No existe"] });
      console.error("Error fetching Pokémon by name:", error);
    }
  };
};

export const FiltersByApiOrDb = (cod) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/filters?data=${cod}`
      );
      dispatch({ type: FILTERS_BYAPIORDB, payload: response.data });
    } catch (error) {
      console.error("Error fetching Pokémon by name:", error);
    }
  };
};

export const FilterByAttack = (data) => {
  return { type: FILTERS_BYATTACK, payload: data };
};

export const FilterByName = (data) => {
  return { type: FILTERS_BYNAME, payload: data };
};

export const Types = () => {
  return function (dispatch) {
    try {
      axios
        .get("/types/")
        .then((data) => dispatch({ type: TYPES, payload: data.data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const FiltersType = (data) => {
  return { type: TYPES_FILTERS, payload: data };
};

export const PokemonsById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/${id}`);
      dispatch({ type: POKEMONS_BYID, payload: response.data });
    } catch (error) {
      console.error("Error fetching Pokémon by ID:", error);
    }
  };
};

export const LimpDetail = () => {
  return { type: LIMP_DETAIL };
};

export const GetPokemonCreate = (data) => {
  return async function (dispatch) {
    try {
    let arr = [];
    for (let i = 0; i < data.type.length; i++) {
      arr.push(parseInt(data.type[i]));
    }
    data.type = arr;
      const response = await axios.post(
        `/pokemons/`,
        data
      );
      console.log(response.data)
      dispatch({ type: GET_POKEMONCREATE, payload: {data: response.data, status: ['Creado']} });
    } catch (error) {
      dispatch({ type: GET_POKEMONCREATE, payload: {status: ['Error']}});
      console.error("Not create:", error);
    }
  };
};


export const LimpFormState = () => {
  return { type: LIMP_FORMSTATE };
};

