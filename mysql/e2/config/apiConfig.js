const express = require("express");

const apiInit = () => {
  const api = express();

  //Bodyparser
  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));

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

  return api;
};

module.exports = {
  apiInit: apiInit,
};
