import produce from 'immer';
import {
  SET_MY_POKEMONS, SET_RENAME_POKEMON, 
  SET_RELEASE_POKEMON
} from '../../constants';

export const initialState = {
  myPokemons: [],
  renamePokemon: {},
};

const myPokemon = (state = initialState, action) =>
produce(state, (draft) => {
  switch (action.type) {
    case SET_MY_POKEMONS:
      draft.myPokemons = action.response;
      break;
    case SET_RENAME_POKEMON:
      let filter = state.myPokemons.filter(item => item.id !== action.response.id);
      filter = filter.concat(action.response);
      filter.sort((a, b) => (a.id > b.id) ? 1 : -1);
      draft.myPokemons = filter;
      break;
    case SET_RELEASE_POKEMON:
      draft.myPokemons = state.myPokemons.filter(item => item.id !== action.id);
      break;
        default:
      return state;
  };
});

export default myPokemon;
