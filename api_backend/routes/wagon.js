const express = require("express");
const { createNewWagonController, DeleteWagonController, GetWagonByIdController, GetAllWagonsController } = require("./controllers/WagonController");
const router = express.Router();


router.post("/create", (req, res, next) => {
    createNewWagonController(req, res, next);
})
router.delete("/delete/:id", (req, res, next) => {
    DeleteWagonController(req, res, next);
})

router.get("/:id", (req, res, next) => {
    GetWagonByIdController(req, res, next);
})

router.get("/", (req, res, next) => {
    GetAllWagonsController(req, res, next);
})

module.exports = router ;