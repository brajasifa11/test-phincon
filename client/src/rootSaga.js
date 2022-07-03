import { all } from 'redux-saga/effects';

import allPokemons from './store/sagas/pokemon';
import pokemonCondition from './store/sagas/condition';
import myPokemon from './store/sagas/myPokemon';

export default function* rootSaga() {
  yield all([
    allPokemons(),
    pokemonCondition(),
    myPokemon(),
  ]);
};
