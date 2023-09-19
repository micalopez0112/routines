const { Router } = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const router = Router();

const Routine = require("../models/Routine");
const Serie = require("../models/Serie");
const Exercise = require("../models/Exercise");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Hello world"));

router.post("/add-routine", async (req, res) => {
  try {
    const { name, dateCreated, dateUpdated, series } = req.body;
    let seriesIds = [];
    for (const serie of series) {
      let exercisesIds = [];
      for (const exerciseData of serie.exercises) {
        const newExercise = new Exercise(exerciseData);
        newExercise._id = new ObjectId();
        exercisesIds.push(newExercise._id);
        await newExercise.save();
      }
      const newSerie = new Serie({
        _id: new ObjectId(),
        repetitions: serie.repetitions,
        completed: serie.completed,
        exercises: exercisesIds,
      });
      seriesIds.push(newSerie._id);
      await newSerie.save();
    }
    const newRoutine = new Routine({
      name,
      dateCreated,
      dateUpdated,
      series: seriesIds,
    });
    await newRoutine.save();
    res.status(200).json({ message: "Routine added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/get-routines", async (req, res) => {
  try {
    const routines = await Routine.find()
      .populate("series")
      .populate({
        path: "series",
        populate: {
          path: "exercises",
          model: "Exercise",
        },
      });
    res.json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las rutinas" });
  }
});

router.delete("/delete-routine/:routineId", async (req, res) => {
  try {
    console.log("aaaaa");
    const routineId = req.params.routineId;
    const deletedRoutine = await Routine.findByIdAndRemove(routineId);
    if (!deletedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update-serie/:serieId", async (req, res) => {
  const { serieId } = req.params;
  const { completed } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(serieId)) {
      return res.status(400).json({ error: "ID de serie no válido" });
    }
    const updatedSerie = await Serie.findByIdAndUpdate(
      serieId,
      { $set: { completed } },
      { new: true }
    ).exec();

    if (!updatedSerie) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }
    return res.json(updatedSerie);
  } catch (error) {
    console.error("Error al actualizar la serie:", error);
    return res.status(500).json({ error: "Error al actualizar la serie" });
  }
});

router.post("/restart-routine", async (req, res) => {
  try {
    const { routineId } = req.body;
    console.log(routineId);
    let routine = await Routine.findById(routineId);

    console.log(routine);

    routine.series.forEach(async (serieId) => {
      const serie = await Serie.findByIdAndUpdate(serieId, {
        completed: false,
      }).exec();
      console.log(serie);
    });
    routine = await Routine.findById(routineId);
    res.json(routine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
