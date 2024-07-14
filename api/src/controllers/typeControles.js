const { Type } = require("../db");
const axios = require("axios");


const getTypes = async () => {
  try {
    let arr = [];
    let url = "https://pokeapi.co/api/v2/type";
    while (arr.length < 22) {
      const response = await axios.get(url);
      const pokes = response.data.results;

      pokes.forEach((data) => {
        arr.push(data);
      });

      url = response.data.next;

      if (!url) break;
    }

    const typesAll = await Promise.all(
      arr.map(async (types) => {
        const name = types.name;
        const [typess, created] = await Type.findOrCreate({ where: { name: name } });
        return typess;
      })
    );
    return typesAll;
  } catch (error) {
    throw new Error("Error al obtener los tipos de Pokémon: " + error.message);
  }
};

module.exports = {
  getTypes,
};
