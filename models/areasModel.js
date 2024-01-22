const pool = require("./bd");

async function getAreas() {
  try {
    var query = "SELECT * FROM areas;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getArea(id) {
  try {
    var query = "SELECT * FROM areas where id = ?";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addArea(obj) {
  try {
    var query = "INSERT INTO areas SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateArea(obj,id) {
  try {
    var query = "UPDATE areas SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteArea(id) {

    var query = "DELETE FROM areas WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getAreas, getArea , addArea, updateArea, deleteArea};