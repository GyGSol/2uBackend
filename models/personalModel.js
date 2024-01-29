const pool = require("./bd");

async function getPersonal() {
  try {
    var query = "SELECT * FROM personal;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getPersona(id) {
  try {
    var query = "SELECT * FROM personal where id = ?";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addPersona(obj) {
  try {
    var query = "INSERT INTO personal SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updatePersona(obj,id) {
  try {
    var query = "UPDATE personal SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deletePersona(id) {

    var query = "DELETE FROM personal WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}

module.exports = { getPersonal, getPersona , addPersona, updatePersona, deletePersona};