const pool = require("./bd");

async function getClientes() {
  try {
    var query = "SELECT * FROM clientes;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getCliente(id) {
  try {
    var query = "SELECT * FROM clientes where id = ?";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addClientes(obj) {
  try {
    var query = "INSERT INTO clientes SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateCliente(obj,id) {
  try {
    var query = "UPDATE clientes SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteClientes(id) {

    var query = "DELETE FROM clientes WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getClientes, getCliente , addClientes, updateCliente, deleteClientes};