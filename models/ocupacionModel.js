const pool = require("./bd");

async function getOcupaciones() {
  try {
    var query = "SELECT o.id, DATE_FORMAT(o.fechaDesde,'%d/%m/%Y') fechaDesde, DATE_FORMAT(o.fechaHasta,'%d/%m/%Y') fechaHasta, c.nombre casa FROM ocupaciones o "
               +"LEFT JOIN casas c ON c.id =o.casa ;";
    var rows = await pool.query(query);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getOcupacionesCasas() {
  try {
    var query = "SELECT DATE_FORMAT(o.fechaDesde,'%Y-%m-%d') fechaDesde, DATE_FORMAT(o.fechaHasta,'%Y-%m-%d') fechaHasta, o.casa FROM ocupaciones o ;";
    var rows = await pool.query(query);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getOcupacion(id) {
  try {
    var query = "SELECT o.id, DATE_FORMAT(o.fechaDesde,'%Y-%m-%d') fechaDesde, DATE_FORMAT(o.fechaHasta,'%Y-%m-%d') fechaHasta, c.nombre casa, o.casa idCasa FROM ocupaciones o "
               +"LEFT JOIN casas c ON c.id =o.casa where o.id = ?";
    var rows = await pool.query(query, id);
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addOcupacion(obj) {
  try {
    var query = "INSERT INTO ocupaciones SET ?;";
    var rows = await pool.query(query,[obj]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateOcupacion(obj,id) {
  try {
    var query = "UPDATE ocupaciones SET ? WHERE id = ?;";
    var rows = await pool.query(query,[obj,id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteOcupacion(id) {

    var query = "DELETE FROM ocupaciones WHERE id = ?;";
    var rows = await pool.query(query,[id]);
    return rows;

}
module.exports = { getOcupaciones, getOcupacion , addOcupacion, updateOcupacion, deleteOcupacion, getOcupacionesCasas};