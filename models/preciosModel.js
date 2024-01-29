const pool = require("./bd");

async function getPrecios() {
  try {
    var query = "SELECT p.id, c.nombre, p.precio, p.costo, p.rentaPorcentual, m.mes  FROM precios p "
    +"INNER JOIN meses m ON m.id = p.idMes "
    +"INNER JOIN casas c ON c.id = p.idCasa ORDER BY c.nombre ;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getPrecio(id) {
  try {
    var query = "SELECT p.id, c.nombre, p.precio, p.costo, p.rentaPorcentual, m.mes FROM precios p "
    +"INNER JOIN meses m on m.id =p.idMes "
    +"INNER JOIN casas c ON c.id = p.idCasa "
    +"WHERE p.id = ? ;" ;
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addPrecio(obj) {
  try {
    var query = "INSERT INTO precios SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updatePrecio(obj,id) {
  try {
    var query = "UPDATE precios SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deletePrecio(id) {

    var query = "DELETE FROM precios WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getPrecios, getPrecio , addPrecio, updatePrecio, deletePrecio};