import produce from "immer";
import {
  SET_PROBABILITY_POKEMON, RESET_PROBABILITY_POKEMON
} from '../../constants';

export const initialState = {
  probability: null,
};

const conditionReducer = (state = initialState, action) =>
produce(state, (draft) => {
  switch (action.type) {
    case SET_PROBABILITY_POKEMON:
      draft.probability = action.probability
      break;
    case RESET_PROBABILITY_POKEMON:
      draft.probability = null
      break;
      default:
        return state
  };
});

export default conditionReducer;
