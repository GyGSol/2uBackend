const pool = require("./bd");

async function getVistas() {
  try {
    var query = "SELECT * FROM vistas;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getVista(id) {
  try {
    var query = "SELECT * FROM vistas where id = ?";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addVista(obj) {
  try {
    var query = "INSERT INTO vistas SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateVista(obj,id) {
  try {
    var query = "UPDATE vistas SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteVista(id) {

    var query = "DELETE FROM vistas WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getVistas, getVista , addVista, updateVista, deleteVista};