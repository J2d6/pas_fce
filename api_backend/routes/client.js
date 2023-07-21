const express = require('express');
const router = express.Router();
const  { CreateClientController } = require("./controllers/ClientController");

router.post("/create", function (req, res) {
    CreateClientController(req, res);
})

module.exports = router ;