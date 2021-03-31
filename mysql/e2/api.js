const { apiInit } = require("./config/apiConfig");
const { dbInit } = require("./config/bdConfig");

const api = apiInit();
const db = dbInit();

api.get("/api/pokemons", (request, response) => {
  const sql =
    "SELECT pokemons.id, pokemons.name, type FROM pokemons INNER JOIN types ON pokemons.typeId = types.id OR pokemons.typeId2 = types.id";

  db.query(sql, (error, results) => {
    if (error) throw error;
    response.status(200).send({
      success: true,
      result: results,
    });
  });
});

api.post("/api/pokemons", (request, response) => {
  const { name, type1 } = request.body;
  let typeId2;
  let typeId1;

  const sqlType1 = `SELECT COUNT(type) as count FROM types WHERE type = '${type1}'`;
  db.query(sqlType1, (error, results) => {
    if (error) throw error;
    if (results[0].count == 0) {
      const sqlInsertType = `INSERT INTO types (type) VALUES ('${type1}')`;
      db.query(sqlInsertType, (error, results) => {
        if (error) console.error(error, "Can not inserted type");
      });
    }
    db.query(
      `SELECT id FROM types WHERE type = '${type1}'`,
      (error, result) => {
        if (error) throw error;
        console.log(result);
        typeId1 = result[0].id;
        console.log("typo" + typeId1);
      }
    );
    if (request.body.type2) {
      const type2 = request.body.type2;
      const sqlType2 = `SELECT COUNT(type) as count FROM types WHERE type = '${type2}'`;
      db.query(sqlType2, (error, results) => {
        if (error) throw error;
        if (results[0].count == 0) {
          const sqlInsertType2 = `INSERT INTO types (type) VALUES ('${type2}')`;
          db.query(sqlInsertType2, (error, results) => {
            if (error) console.error(error, "Can not inserted type");
          });
        }
      });
      db.query(
        `SELECT id FROM types WHERE type = '${type2}'`,
        (error, result) => {
          if (error) throw error;
          typeId2 = result[0].id;
        }
      );
    }
    const sqlInsertPokemon = `INSERT INTO pokemons (name, typeId, typeId2) VALUES ('${name}', ${typeId1}, ${
      typeId2 ? typeId2 : "NULL"
    })`;
    db.query(sqlInsertPokemon, (error, results) => {
      if (error) throw error;
      console.log("Pokemon inserted");
    });
  });
});

api.listen(2211, () => {
  console.log("Api running at port 2211");
});
