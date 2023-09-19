const express = require("express");
const router = express.Router();
const SerieController = require("../controllers/serieController");

router.put("/update-serie/:serieId", SerieController.updateSerie);

module.exports = router;
