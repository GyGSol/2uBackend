const pool = require("./bd");
const md5 = require("md5");

async function getRoles() {
  try {
    var query = "SELECT * FROM roles;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(user, pass) {
  try {
    var query ="SELECT u.id, u.usuario, u.pass, r.rol FROM usuarios u "
              +"INNER JOIN roles r ON r.id = u.rol "
              +"WHERE usuario = ? AND pass = ? limit 1;";
    var rows = await pool.query(query, [user, md5(pass)]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getUserId(id) {
  try {
    var query ="SELECT u.id, u.usuario, u.pass, r.rol, r.id idRol FROM usuarios u "
              +"LEFT JOIN roles r ON r.id = u.rol "
              +"WHERE u.id = ? limit 1;";
    var rows = await pool.query(query,id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getUsers() {
  try {
    var query = "SELECT u.id, u.usuario, u.pass, r.rol FROM usuarios u "
               +"LEFT JOIN roles r ON r.id = u.rol ;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function addUser(obj) {
  try {
    var query = "INSERT INTO usuarios SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(obj,id) {
  try {
    var query = "UPDATE usuarios SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {

    var query = "DELETE FROM usuarios WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getUser, addUser, updateUser, deleteUser, getUsers, getRoles, getUserId };
