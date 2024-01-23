const pool = require("./bd");

async function getNosotros() {
    try {
      var query = "SELECT * FROM nosotros;";
      var rows = await pool.query(query);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async function getNosotrosApi() {
    try {
      var query = "SELECT * FROM nosotros;";
      var rows = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async function getNos(id) {
    try {
      var query = "SELECT * FROM nosotros where id = ?";
      var rows = await pool.query(query, id);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  
  async function addNosotros(obj) {
    try {
      var query = "INSERT INTO nosotros SET ?;";
      var rows = await pool.query(query,[obj]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function updateNosotros(obj,id) {
    try {
      var query = "UPDATE nosotros SET ? WHERE id = ?;";
      var rows = await pool.query(query,[obj,id]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function deleteNosotros(id) {
  
      var query = "DELETE FROM nosotros WHERE id = ?;";
      var rows = await pool.query(query,[id]);
      return rows;
  
  }
  module.exports = { getNosotros, getNos, deleteNosotros,updateNosotros,addNosotros,getNosotrosApi };