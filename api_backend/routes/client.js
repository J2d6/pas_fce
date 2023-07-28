const express = require('express');
const router = express.Router();
const  { CreateClientController, GetLatestsClientController , GetAllClientsController, Readclient, DeleteClient} = require("./controllers/ClientController");

router.post("/create", function (req, res) {
    CreateClientController(req, res);
})

router.get("/latest", function (req, res, next) {
    GetLatestsClientController(req, res, next);
})

router.get("/all", function (req, res, next) {
    GetAllClientsController(req, res, next)
})

router.get("/:id", function (req, res, next) {
    Readclient(req, res, next)
})

router.delete("/delete/:id", function (req, res, next) {
    DeleteClient(req, res, next)
})


router.

module.exports = router ;