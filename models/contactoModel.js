const pool = require("./bd");

async function getContactos() {
    try {
      var query = "SELECT * FROM contactos;";
      var rows = await pool.query(query);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async function getContactoApi() {
    try {
      var query = "SELECT * FROM contactos;";
      var rows = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async function getContacto(id) {
    try {
      var query = "SELECT * FROM contactos where id = ?;";
      var rows = await pool.query(query, id);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  
  async function addContacto(obj) {
    try {
      var query = "INSERT INTO contactos SET ?;";
      var rows = await pool.query(query,[obj]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function updateContacto(obj,id) {
    try {
      var query = "UPDATE contactos SET ? WHERE id = ?;";
      var rows = await pool.query(query,[obj,id]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function deleteContacto(id) {
  
      var query = "DELETE FROM contactos WHERE id = ?;";
      var rows = await pool.query(query,[id]);
      return rows;
  
  }
  
  module.exports = { getContactos, getContacto, deleteContacto,updateContacto,addContacto,getContactoApi };