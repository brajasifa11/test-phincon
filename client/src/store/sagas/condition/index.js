import { call, put, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import { checkProbability } from '../../../domain/myAPI';
import { PROBABILITY_POKEMON } from '../../constants';
import { setProbability } from '../../action/serverIndex';

function* probabilityPokemon() {
  try {
    const value = yield call(checkProbability);
    if (!isEmpty(value)) {
      yield put(setProbability(value.catchStatus));
    }
  } catch (error) {
    console.log(error);
  };
};

export default function* pokemonCondition() {
  yield takeLatest(PROBABILITY_POKEMON, probabilityPokemon);
};
