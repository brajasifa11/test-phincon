import { combineReducers } from "redux";
import getPokemons from '../reducers/pokemon/pokemonReducers';
import conditionReducer from '../reducers/condition';
import myPokemons from '../reducers/myPokemons';

const rootReducer = combineReducers({
  getPokemons: getPokemons,
  conditionReducer: conditionReducer,
  myPokemons: myPokemons
});

export default rootReducer;
