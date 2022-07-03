const { Pokemoons } = require('../../models');
const exclude = ['updateAt', 'createdAt'];

exports.myPokemons = async (req, res) => {
  try {
    let allPokemons = await Pokemoons.findAll({
      attributes: {
        exclude
      },
    });

    res.status(200).send({
      status: 'Success',
      allPokemons,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};

exports.myPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    let pokemon = await Pokemoons.findOne({
      where: {
        id: id,
      },
      attributes : {
        exclude,
      },
    });

    if (!pokemon) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Pokemon not Found',
      });
    };

    res.status(200).send({
      status: 'Success',
      pokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};

exports.checkProbability = async (req, res) => {
  try {
    const successRate = Math.ceil(Math.random() * 4);

    if (successRate > 2) {
      res.status(200).send({
        status: 'Success',
        catchStatus: 'Success',
      });
    } else {
      res.status(200).send({
        status: 'Success',
        catchStatus: 'Failed',
      });
    };
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};

exports.catchPokemon = async (req, res) => {
  try {
    const data = req.body
    const nickname = data.nickname

    const exist = await Pokemoons.findOne({
      where: {
        nickname,
      },
      exclude
    });

    if (exist) {
      res.status(409).send({
        status: 'Failed',
        message: 'Nickname Already Exist'
      });
    };

    newPokemon = await Pokemoons.create({ ...data, renameCount: '0' });

    res.status(200).send({
      status: 'Success',
      newPokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};

exports.checkNumber = async (req, res) => {
  try {
    const number = Math.ceil(Math.random() * 30);

    res.status(200).send({
      status: 'Success',
      number
    });
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};

exports.releasePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemoons.findOne({
      where: {
        id: id,
      },
    });

    if (!pokemon) {
      res.status(404).send({
        status: 'Failed',
        message: 'Pokemon not Found',
      });
    };

    await Pokemoons.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: 'Success',
      message: 'Pokemon Released',
    });
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};

const generateFibonacciNumber = (num) => {
  var a = 1,
  b = 0,
  temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  };
  return b;
};

exports.renamePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const pokemonExist = await Pokemoons.findOne({
      where: {
        id,
      },
    });

    if (!pokemonExist) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Pokemon not Found',
      });
    };

    const fibonacciIndex = Number(pokemonExist.renameCount) - 1;
    const fibonacciNumber = generateFibonacciNumber(fibonacciIndex);
    const pokemon = {
      nickname: `${data.nickname} - ${fibonacciNumber}`,
      imageUrl: data.imageUrl,
      pokemonId: data.pokemonId,
      renameCount: Number(pokemonExist.renameCount) + 1,
    };

    await Pokemoons.update(pokemon, {
      where: {
        id,
      },
    });

    const updatePokemon = await Pokemoons.findOne({
      where: {
        id,
      },
      attributes: {
        exclude,
      },
    });

    res.status(200).send({
      status: 'Success',
      pokemon: updatePokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  };
};
