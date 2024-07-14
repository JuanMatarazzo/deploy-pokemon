const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const {
  getPokemons,
  createPokemon,
  getPokemonID,
  getPokeName,
} = require("../controllers/pokemonControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Ruta All
router.get("/", async (req, res) => {
  const { name } = req.query;
  let pokemons;
  try {
    if (name) pokemons = await getPokeName(name);
    else pokemons = await getPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.mesage });
  }
});

// Ruta ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await getPokemonID(id);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RUTA CREACION
router.post("/", async (req, res) => {
  try {
    const { name, vida, fuerza, defensa, velocidad, altura, peso, type, img } =
      req.body;
    const newPokemon = await createPokemon(
      name,
      vida,
      fuerza,
      defensa,
      velocidad,
      altura,
      peso,
      type,
      img
    );

    
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
