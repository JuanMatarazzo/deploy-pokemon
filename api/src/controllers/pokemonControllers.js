// let {Pokemon} = require("../models/Pokemon");
const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getPokeName = async (name) => {
  let poke;
  try {
    let rename = name.toLowerCase();
    let pokeDb = await Pokemon.findOne({
      where: { name: rename },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (pokeDb) {
      let res = pokeDb.dataValues.types.map((e) => {
        return {
          name: e.name
        }
      });
      poke = {
        id: pokeDb.id,
        name: pokeDb.name,
        img: pokeDb.img,
        hp: pokeDb.vida,
        types: res,
        attack: pokeDb.fuerza,
        defense: pokeDb.defensa,
        speed: pokeDb.velocidad,
        height: pokeDb.altura,
        weight: pokeDb.defensa,
      };
      return [poke];
    }

    let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${rename}`);

    poke = {
      id: data.data.id,
      name: data.data.name,
      img: data.data.sprites.other.home.front_shiny,
      hp: data.data.stats[0].base_stat,
      types: data.data.types.map((e) => {
        return {name: e.type.name};
      }),
      attack: data.data.stats[1].base_stat,
      defense: data.data.stats[2].base_stat,
      speed: data.data.stats[5].base_stat,
      height: data.data.height,
      weight: data.data.weight,
    };

    return [poke];
  } catch (error) {
    throw Error("Error" + error.message);
  }
};
const getPokeUrl = async () => {
  let arr = [];
  let url = "https://pokeapi.co/api/v2/pokemon";
  try {
    while (arr.length < 80) {
      const response = await axios.get(url);
      const pokes = response.data.results;

      pokes.forEach((data) => {
        arr.push(data);
      });

      url = response.data.next;

      if (!url) break; // Si no hay más páginas, salir del bucle
    }

    const pokemonDetails = await Promise.all(
      arr.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return {
          id: response.data.id,
          name: response.data.name,
          img: response.data.sprites.other.home.front_shiny,
          types: response.data.types.map((e) => {
            return {
              name: e.type.name,
            };
          }),
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          height: response.data.height,
          weight: response.data.weight,
        };
      })
    );
    return pokemonDetails;
  } catch (error) {
    throw Error("Error" + error.message);
  }
};

const getPokemons = async () => {
  try {
    const allPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    let pokesApi = await getPokeUrl();
    const allPokemon = allPokemons.concat(pokesApi);
    return allPokemon;
  } catch (error) {
    throw Error("Error" + error.message);
  }
};

const getPokemonID = async (id) => {
  try {
    if (id.includes("-")) {
      const pokemon = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      if (pokemon === null) throw Error("No existe");
      else {
        let res = pokemon.dataValues.types.map((e) => {
          return{
            name: e.name
          }
        });
        poke = {
          id: pokemon.id,
          name: pokemon.name,
          hp: pokemon.hp,
          types: res,
          attack: pokemon.attack,
          defense: pokemon.defense,
          speed: pokemon.speed,
          height: pokemon.height,
          weight: pokemon.weight,
          img: pokemon.img
        };
        return poke;
      }
    } else {
      let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return {
        id: data.data.id,
        name: data.data.name,
        img: data.data.sprites.other.home.front_shiny,
        hp: data.data.stats[0].base_stat,
        types: data.data.types.map((e) => {
          return {
            name: e.type.name
          };
        }),
        attack: data.data.stats[1].base_stat,
        defense: data.data.stats[2].base_stat,
        speed: data.data.stats[5].base_stat,
        height: data.data.height,
        weight: data.data.weight,
      };
    }
  } catch (error) {
    throw Error("Error" + error.message);
  }
};

const createPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
  img
) => {
  try {
    const imageRegex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i;
    if (
      !name ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !types ||
      !imageRegex.test(img)
    )
      throw Error("Faltan datos");

    let rename = name.toLowerCase();
    let pokeDb = await Pokemon.findOne({ where: { name: rename } });
    if (pokeDb) throw Error("El Personaje ya esta creado");

    const newPokemon = await Pokemon.create({
      name: rename,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      img: img,
    });
    await newPokemon.addTypes(types);
    return newPokemon;
  } catch (error) {
    throw Error("Error" + error.message);
  }
};

module.exports = {
  getPokemons,
  createPokemon,
  getPokemonID,
  getPokeName,
  getPokeUrl,
};
