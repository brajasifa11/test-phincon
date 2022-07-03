import produce from 'immer';
import {
  GET_POKEMONS, SET_GET_POKEMONS, 
  GET_POKEMON, SET_GET_POKEMON
} from '../../constants';

export const initialState = {
  pokemons: [],
  pokemon: {},
};

const getPokemons = (state = initialState, action) =>
produce(state, (draft) => {
  switch (action.type) {
    case GET_POKEMONS:
      draft.pokemons = action.pokemon
      break;
    case SET_GET_POKEMONS:
      draft.pokemons = action.response
      break;
    case GET_POKEMON:
      draft.pokemon = action.id.id
      break;
    case SET_GET_POKEMON:
      draft.pokemon = action.response
      break;
      default:
        return state;
  };
});

export default getPokemons;
