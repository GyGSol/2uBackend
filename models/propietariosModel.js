/**
 * id, nombre, apellido, tax
 */
const pool = require("./bd");

async function getPropietarios() {
  try {
    var query = "SELECT * FROM propietarios;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getPropietario(id) {
  try {
    console.log("getPropietario",id);
    var query = "SELECT * FROM propietarios where id = ? ;";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addPropietario(obj) {
  try {
    var query = "INSERT INTO propietarios SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updatePropietario(obj,id) {
  try {
    var query = "UPDATE propietarios SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deletePropietario(id) {

    var query = "DELETE FROM propietarios WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getPropietarios, getPropietario , addPropietario, updatePropietario, deletePropietario};