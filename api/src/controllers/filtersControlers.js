const { Pokemon, Type } = require("../db");

let PokeDb = async () => {
    try {
        const allPokemons = await Pokemon.findAll({
            include: {
              model: Type,
              through: {
                attributes: [],
              },
            },
          });
          return allPokemons
    } catch (error) {
        throw Error('Error' + error.mesagge)
    }
}



module.exports = {
    PokeDb
}