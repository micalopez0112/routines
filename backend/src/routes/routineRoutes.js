const express = require("express");
const router = express.Router();
const RoutineController = require("../controllers/routineController");

router.get("/", RoutineController.getRoutines);
router.post("/add-routine", RoutineController.addRoutine);
router.delete("/delete-routine/:routineId", RoutineController.deleteRoutine);
router.post("/restart-routine", RoutineController.restartRoutine);
router.get("/get-routines", RoutineController.getRoutines);

module.exports = router;
