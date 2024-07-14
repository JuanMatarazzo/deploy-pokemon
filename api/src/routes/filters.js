const { Router } = require("express");
const { PokeDb } = require("../controllers/filtersControlers");
const { getPokeUrl } = require("../controllers/pokemonControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const filters = Router();

filters.get("/", async (req, res) => {
    let { data } = req.query;
    let pokemons;
  try {
    if (data === "api") {
      pokemons = await getPokeUrl();
      return res.status(200).json(pokemons);
    }
    if (data === "db") {
      pokemons = await PokeDb();
      return res.status(200).json(pokemons);
    }else{
        res.status(400).json('No existe un filtro con esas caracteristicas')
    }
  } catch (error) {
    res.status(400).json({ error: error.mesage });
  }
});

module.exports = filters;
