import { call, put, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import { getPokemons, getPokemon } from '../../../domain/pokemonAPI';
import { GET_POKEMONS, GET_POKEMON } from '../../constants';
import { setGetPokemons, setGetPokemon } from '../../action/';

function* getAllPokemons() {
  try {
    const pokemons = yield call(getPokemons);
    if (!isEmpty(pokemons)) {
      let characters = [];
      pokemons.results.map((pokemon, i) => {
        return characters.push({
          name: pokemon.name,
          url: pokemon.url,
          imageUrl: `${process.env.REACT_APP_IMG_API}/${i+1}.png`,
        });
      })
      yield put(setGetPokemons(characters));
    }
  } catch (error) {
    console.log(error);
  };
};

function* getPokemonDetail(id) {
  try {
    let pokemon = yield call(getPokemon, id);
    if (!isEmpty(pokemon)) {
        pokemon = {
          ...pokemon,
          id: Number(id.id),
          name: pokemon.name,
          imageUrl: `${process.env.REACT_APP_IMG_API}/${id.id}.png`,
          moves: pokemon.moves.map((item) => item.move.name).slice(0, 4).join(', '),
          types: pokemon.types.map((item) => item.type.name).join(', '),
          abilities: pokemon.abilities.map((item) => item.ability.name).join(', '),
        }
        yield put(setGetPokemon(pokemon));
      }
  } catch (error) {
    console.log(error);
  };
};

export default function* allPokemons() {
  yield takeLatest(GET_POKEMONS, getAllPokemons);
  yield takeLatest(GET_POKEMON, getPokemonDetail);
};
