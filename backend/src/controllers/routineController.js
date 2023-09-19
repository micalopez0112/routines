const Routine = require("../models/Routine");
const Serie = require("../models/Serie");
const Exercise = require("../models/Exercise");

exports.getRoutines = async (req, res) => {
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
};

exports.addRoutine = async (req, res) => {
  try {
    console.log("aaaa");
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
};

exports.deleteRoutine = async (req, res) => {
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
};

exports.restartRoutine = async (req, res) => {
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
};
