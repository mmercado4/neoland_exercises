const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const api = express();

const DB_POKEMON = "db/dbPokemon.json";

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true })); //Decodificamos la info del body.

//CORS Policy
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  api.options("*", (req, res) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

//DB Conection
mongoose.connect(
  "mongodb://localhost/pokemon",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, response) => {
    if (error) {
      console.error(error, "DB connection failed");
    } else {
      console.log("DB connected");
    }
  }
);

const Pokemon = require("./models/pokemon");

//GET
api.get("/api/pokemons", (request, response) => {
  Pokemon.find((error, data) => {
    if (error) {
      console.error(error);
    } else {
      response.send(data);
    }
  });
});

//POST por parámetros "api/pokemons?name=pikachu&type=electrico"
api.post("/api/pokemons", (request, response) => {
  if (!request.body.name || !request.body.type) {
    response.status(400).send({
      success: false,
      url: "/api/pokemons",
      method: "POST",
      message: "Name and Type are required",
    });
  } else {
    // En request.query tenemos todos los parámetros que se envíen al microservicio.
    const newPokemon = new Pokemon({
      name: request.body.name,
      type: request.body.type,
    });

    newPokemon.save((error) => {
      if (error) console.error(error);
      else {
        response.send({
          succcess: true,
          message: "Pokemon was added successfully",
          pokemon: newPokemon.name,
        });
      }
    });
  }
});

//DELETE
api.delete("/api/pokemons", (request, response) => {
  const id = request.body.id;
  if (!id) {
    response.status(400).send({
      success: false,
      url: "/api/pokemons",
      method: "DELETE",
      message: "Id is required",
    });
  } else {
    Pokemon.deleteOne({ _id: id }, (error) => {
      //Ojo en estos casos siempre borrar usando el ID, para estar seguros de lo que borramos.
      if (error) console.error(error);
      else {
        response.send({
          success: true,
          message: "Pokemon deleted successfully",
        });
      }
    });
  }
});

//GET Params
api.get("/api/pokemons/:name", (request, response) => {
  let name = request.params.name;
  Pokemon.findOne({ name: name }, (error, data) => {
    if (error) console.error(error);
    else {
      response.send(data);
    }
  });
});

//PUT
api.put("/api/pokemons/:id", (request, response) => {
  let id = request.params.id;
  Pokemon.findByIdAndUpdate(id, { $set: request.body }, (error, data) => {
    if (error) console.error(error);
    else {
      response.status(200).send({
        success: 200,
        message: `Pokémon ${request.body.name} was updated successfully`,
      });
    }
  });
});

//GET Pages
api.get("/api/pokemons/page/:page", (request, response) => {
  let page = Number.parseInt(request.params.page);
  //Sacamos el indice del array que queremos mostrar.
  const PAGE_SIZE = 5;
  let skipped = (page - 1) * PAGE_SIZE;
  Pokemon.find((error, data) => {
    if (error) console.error(error);
    else {
      response.status(200).send(data);
    }
  })
    .limit(PAGE_SIZE)
    .skip(skipped);
});

//GET Pages LIMIT-OFFSET
api.get("/api/pokemon/pageoffset", (request, response) => {
  fs.readFile(DB_POKEMON, (error, data) => {
    if (error) throw error;
    let pokeList = JSON.parse(data);
    let offset = Number.parseInt(request.query.offset);
    let limit = Number.parseInt(request.query.limit);
    let myList = pokeList.slice(offset, offset + limit);
    response.status(200).send({
      success: true,
      url: `/api/pokemon/pagesoffset`,
      method: "GET",
      pokemons: myList,
    });
  });
});

api.listen(1212, () => {
  console.log("API running in port 1212");
});
