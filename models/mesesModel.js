const pool = require("./bd");

async function getMeses() {
  try {
    var query = "SELECT * FROM meses;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getMes(id) {
  try {
    var query = "SELECT * FROM meses where id = ?";
    var rows = await pool.query(query, id);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addMeses(obj) {
  try {
    var query = "INSERT INTO meses SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateMes(obj,id) {
  try {
    var query = "UPDATE meses SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteMes(id) {

    var query = "DELETE FROM meses WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
 

async function getMesesMostrar(idCasa) {
  try {
    var query = "SELECT m.mes, p.precio, p.idCasa  FROM casas c "
               +"LEFT JOIN precios p ON p.idCasa  = c.id "
               +"LEFT JOIN meses m ON m.id =p.idMes;";
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getMeses, getMes , addMeses, updateMes, deleteMes, getMesesMostrar};