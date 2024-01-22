const pool = require("./bd");

async function getCasas() {
  try {
    var query =
      "SELECT c.id, c.nombre, c.dormitorios, c.linkpdf, c.linkvideo, c.linkimagen, CONCAT(p.apellido,', ',p.nombre) as propietario," +
      "c.banos,v.vista ,c.propietario idPropietario,c.vista idVista,c.area idArea,a.area  FROM casas c " +
      "LEFT JOIN propietarios p on p.id =c.propietario " +
      "LEFT JOIN vistas v on v.id =c.vista " +
      "LEFT JOIN areas a on a.id =c.area ;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getCasa(id) {
  try {
    var query =
      "SELECT c.id, c.nombre, c.dormitorios, c.linkpdf, c.linkvideo, c.linkimagen, CONCAT(p.apellido,', ',p.nombre) as propietario," +
      "c.banos,v.vista ,c.propietario idPropietario,c.vista idVista,c.area idArea,a.area  FROM casas c " +
      "LEFT JOIN propietarios p on p.id =c.propietario " +
      "LEFT JOIN vistas v on v.id =c.vista " +
      "LEFT JOIN areas a on a.id =c.area " +
      "WHERE c.id = ? ;";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addCasas(obj) {
  try {
    var query = "INSERT INTO casas SET ?;";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateCasa(obj, id) {
  try {
    var query = "UPDATE casas SET ? WHERE id = ?;";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCasa(id) {
  var query = "DELETE FROM casas WHERE id = ?;";
  var rows = await pool.query(query, [id]);
  return rows;
}
module.exports = { getCasas, getCasa, addCasas, updateCasa, deleteCasa };
