import _ from 'lodash';
import request from '../utils/request';
const base_URL = process.env.REACT_APP_POKE_API;
const pokemon = 'pokemon';

const urls = {
  getPokemons: 'pokemon',
  pokemonDetails: `${pokemon}`
};

const callApi = (endpoint, method, params = {}, data = {}) => {
  const options = {
    baseURL: base_URL,
    url: endpoint,
    method, params,
    data
  };

  return request(options).then((response) => {
    const responseAPI = response?.data;
    return responseAPI;
  });
};

export const getPokemons = () => {
  return callApi(urls.getPokemons, 'get', {}, {});
};

export const getPokemon = (id) => {
  return callApi(`${urls.pokemonDetails}/${id.id}`, 'get', {}, {});
};

