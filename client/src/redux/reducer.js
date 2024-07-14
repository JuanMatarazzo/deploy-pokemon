import {
  ALL_POKES,
  GET_POKEMONBYNAME,
  FILTERS_BYAPIORDB,
  FILTERS_BYATTACK,
  FILTERS_BYNAME,
  TYPES,
  TYPES_FILTERS,
  POKEMONS_BYID,
  LIMP_DETAIL,
  GET_POKEMONCREATE,
  LIMP_FORMSTATE
  
} from "./actions";

const initialState = {
  AllPokemons: [],
  Types: [],
  PokemonDetail: {},
  PokeCreate: []
 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKES:
      return {
        ...state,
        AllPokemons: action.payload,
      };
    case GET_POKEMONBYNAME:
      return {
        ...state,
        AllPokemons: action.payload,
      };
    case FILTERS_BYAPIORDB:
      return {
        ...state,
        AllPokemons: action.payload,
      };
    case FILTERS_BYATTACK:
      for (let i = 0; i < state.AllPokemons.length; i++) {
        for (let j = i + 1; j < state.AllPokemons.length; j++) {
          if (state.AllPokemons[i].attack < state.AllPokemons[j].attack) {
            let aux = state.AllPokemons[i];
            state.AllPokemons[i] = state.AllPokemons[j];
            state.AllPokemons[j] = aux;
          }
        }
      }
      return {
        ...state,
        AllPokemons:
          action.payload === "asc"
            ? [...state.AllPokemons].reverse()
            : [...state.AllPokemons],
      };
    case FILTERS_BYNAME:
      return {
        ...state,
        AllPokemons: [...state.AllPokemons].sort((a, b) => {
          if (action.payload === "asc") {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          } else {
            return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
          }
        }),
      };
    case TYPES:
      return {
        ...state,
        Types: action.payload,
      };
    case TYPES_FILTERS:
      let arrTwo = [];
      for (let i = 0; i < state.AllPokemons.length; i++) {
        for (let j = 0; j < state.AllPokemons[i].types.length; j++) {
          console.log("stateee", state.AllPokemons[i].types[j].name);
          if (state.AllPokemons[i].types[j].name === action.payload) {
            arrTwo.push(state.AllPokemons[i]);
          }
        }
      }
      return {
        ...state,
        AllPokemons: arrTwo,
      };
      case POKEMONS_BYID:
        return{
          ...state, 
          PokemonDetail: action.payload
        }
        case LIMP_DETAIL:
          return{
            ...state,
            PokemonDetail: {}
          }
          case LIMP_FORMSTATE:
            return{
              ...state,
              PokeCreate: []
            }
        
          case GET_POKEMONCREATE:
            return{
              ...state,
              PokeCreate: action.payload.status,
              AllPokemons: [...state.AllPokemons, action.payload.data]
            }
    default:
      return { ...state };
  }
};

export default reducer;
