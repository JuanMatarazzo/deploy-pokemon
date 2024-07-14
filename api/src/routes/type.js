const { Router } = require("express");
const {getTypes} = require('../controllers/typeControles')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const types = Router();


types.get("/", async (req, res) => {
    try {
      let types = await getTypes();
      return res.status(200).json(types);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = types;
