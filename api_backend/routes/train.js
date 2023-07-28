const express = require('express');
const router = express.Router();

const { CreateTrainController } = require("./controllers/TrainController")


router.post("/create", (req, res, next) => {
    CreateTrainController(req, res, next);
})

module.exports = router;