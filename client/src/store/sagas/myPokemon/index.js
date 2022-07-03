import { call, put, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import { CAUGHT_POKEMON, MY_POKEMONS, RENAME_POKEMON, CHECK_NUMBER, RELEASE_POKEMON } from '../../constants';
import { setCaughtPokemon, setMyPokemons, setRenamePokemon, setReleasePokemon } from '../../action/serverIndex';
import { 
  catchingPokemon, 
  myPokemons, renamePokemon,
  checkNumber, releasePokemon,
} from '../../../domain/myAPI';
import { isPrimeNumber } from '../../../utils/primeNumber';

function* caughtPokemon({ payload, cbSuccess }) {
  try {
    const pokemon = yield call(catchingPokemon, payload);
    if (!isEmpty(pokemon)) {
      yield put(setCaughtPokemon(pokemon));
      cbSuccess && cbSuccess();
    }
  } catch (error) {
    console.log(error);
  };
};

function* getPokemons() {
  try {
    const pokemons = yield call(myPokemons);
    if (!isEmpty(pokemons)) {
      yield put(setMyPokemons(pokemons.allPokemons));
    }
  } catch (error) {
    console.log(error);
  };
};

function* renameMonster({data, cb}) {
  try {
    const pokemon = yield call(renamePokemon, data)
    if (!isEmpty(pokemon)) {
      yield put(setRenamePokemon(pokemon.pokemon));
      cb && cb();
    }
  } catch (error) {
    console.log(error);
  };
};

function* checkIsPrime({cb, cbFailed}) {
  try {
    const response = yield call(checkNumber)
    if (isPrimeNumber(response.number)) {
      cb && cb();
    } else {
      cbFailed && cbFailed();
    }
  } catch (error) {
    console.log(error);
  };
};

function* removePokemon({id, cb}) {
  try {
    const response = yield call(releasePokemon, id);
    if (!isEmpty(response)) {
      yield put(setReleasePokemon(id));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* myPokemon() {
  yield takeLatest(CAUGHT_POKEMON, caughtPokemon);
  yield takeLatest(MY_POKEMONS, getPokemons);
  yield takeLatest(RENAME_POKEMON, renameMonster);
  yield takeLatest(CHECK_NUMBER, checkIsPrime);
  yield takeLatest(RELEASE_POKEMON, removePokemon);
};
