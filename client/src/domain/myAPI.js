import _ from 'lodash';
import request from '../utils/request';
const base_api_URL = process.env.REACT_APP_BASE_API;
const probability = '/check-probability';
const catchPokemon ='/catch-pokemon';
const number = '/check-number';
const pokemons = '/my-pokemons';
const rename = '/rename-pokemon';
const prime = '/check-number';
const release = '/release-pokemon';

const urls = {
  probabilityAPI: `${probability}`,
  numberAPI: `${number}`,
  catchPokemonAPI: `${catchPokemon}`,
  myPokemons: `${pokemons}`,
  renamePokemon: `${rename}`,
  getPrime: `${prime}`,
  releasePokemon: `${release}`
};

const callApi = (endpoint, method, params = {}, data = {}) => {
  const options = {
    baseURL: base_api_URL,
    url: endpoint,
    method, params,
    data
  };
  
  return request(options).then((response) => {
    const responseAPI = response?.data;
    return responseAPI;
  });
};

export const checkProbability = () => {
  return callApi(urls.probabilityAPI, 'get', {}, {});
};

export const catchingPokemon = (payload) => {
  return callApi(urls.catchPokemonAPI, 'post', {}, payload);
};

export const myPokemons = () => {
  return callApi(urls.myPokemons, 'get', {}, {});
};

export const renamePokemon = (data) => {
  return callApi(`${urls.renamePokemon}/${data.id}`, 'patch', {}, data);
};

export const checkNumber = () => {
  return callApi(urls.getPrime, 'get', {}, {});
};

export const releasePokemon = (id) => {
  return callApi(`${urls.releasePokemon}/${id}`, 'delete', {}, {});
};
