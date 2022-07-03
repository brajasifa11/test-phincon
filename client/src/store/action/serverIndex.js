import {
  PROBABILITY_POKEMON, SET_PROBABILITY_POKEMON,
  RESET_PROBABILITY_POKEMON, CAUGHT_POKEMON,
  SET_CAUGHT_POKEMON, MY_POKEMONS, SET_MY_POKEMONS,
  RENAME_POKEMON, SET_RENAME_POKEMON, CHECK_NUMBER,
  RELEASE_POKEMON, SET_RELEASE_POKEMON,
} from '../constants';

export const checkProbability = () => {
  return {
    type: PROBABILITY_POKEMON,
  };
};

export const setProbability = (probability) => {
  return {
    type: SET_PROBABILITY_POKEMON,
    probability,
  };
};

export const resetProbability = () => {
  return {
    type: RESET_PROBABILITY_POKEMON,
  };
};

export const caughtPokemon = (payload, cbSuccess) => {
  return {
    type: CAUGHT_POKEMON,
    payload, cbSuccess,
  };
};

export const setCaughtPokemon = (response) => {
  return {
    type: SET_CAUGHT_POKEMON,
    response,
  };
};

export const getPokemons = () => {
  return {
    type: MY_POKEMONS,
  };
};

export const setMyPokemons = (response) => {
  return {
    type: SET_MY_POKEMONS,
    response,
  };
};

export const renamePokemon = (data, cb) => {
  return {
    type: RENAME_POKEMON,
    data, cb,
  };
};

export const setRenamePokemon = (response) => {
  return {
    type: SET_RENAME_POKEMON,
    response,
  };
};

export const checkNumber = (cb, cbFailed) => {
  return {
    type: CHECK_NUMBER,
    cb, cbFailed,
  };
};

export const releasePokemon = (id, cb) => {
  return {
    type: RELEASE_POKEMON,
    id, cb,
  };
};

export const setReleasePokemon = (id) => {
  return {
    type: SET_RELEASE_POKEMON,
    id,
  };
};
