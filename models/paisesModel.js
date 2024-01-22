const pool = require("./bd");

async function getPaises() {
  try {
    var query = "SELECT nombre FROM paises ORDER BY nombre;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getPaises };
