const express = require('express');
const router = express.Router();
const  { CreateClientController, GetLatestsClientController , GetAllClientsController, Readclient, DeleteClient, authClientController} = require("./controllers/ClientController");

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
router.post("/auth", function(req, res, next){
    authClientController(req, res, next);
})

module.exports = router ;