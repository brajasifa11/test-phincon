const express = require('express');
const router = express.Router();
const {
  myPokemons, myPokemon, checkNumber,
  checkProbability, catchPokemon,
  releasePokemon, renamePokemon
} = require('../controllers');

router.get('/my-pokemons', myPokemons);
router.get('/my-pokemon', myPokemon);
router.get('/check-probability', checkProbability);
router.get('/check-number', checkNumber);
router.post('/catch-pokemon', catchPokemon);
router.delete('/release-pokemon/:id', releasePokemon);
router.patch('/rename-pokemon/:id', renamePokemon);

module.exports = router;
