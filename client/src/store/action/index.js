import {
  GET_POKEMONS, SET_GET_POKEMONS,
  GET_POKEMON, SET_GET_POKEMON,

} from '../constants';

export const getPokemons = () => {
  return {
    type: GET_POKEMONS,
  };
};

export const setGetPokemons = (response) => {
  return {
    type: SET_GET_POKEMONS,
    response
  };
};

export const getPokemon = (id) => {
  return {
    type: GET_POKEMON,
    id,
  };
};

export const setGetPokemon = (response) => {
  return {
    type: SET_GET_POKEMON,
    response
  };
};
