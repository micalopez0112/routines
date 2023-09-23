const Routine = require("../models/Routine");
const Serie = require("../models/Serie");
const Exercise = require("../models/Exercise");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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
    const routine = await Routine.findById(routineId)
      .populate("series")
      .populate({
        path: "series",
        populate: {
          path: "exercises",
          model: "Exercise",
        },
      });
    console.log(routine);

    routine.series.forEach(async (serie) => {
      serie.exercises.forEach(async (exercise) => {
        await Exercise.findByIdAndRemove(exercise._id);
      });
      await Serie.findByIdAndRemove(serie._id);
    });

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

exports.updateRoutine = async (req, res) => {
  const { routineId } = req.params;
  const updatedRoutineData = req.body;
  updatedRoutineData.dateUpdated = new Date();
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      routineId,
      updatedRoutineData,
      { new: true }
    );

    for (const serieIdObject of updatedRoutine.series) {
      let serieId = serieIdObject.toString();
      let findeSerie = findSeriesById(updatedRoutineData, serieId);
      let updatedSerie = await Serie.findByIdAndUpdate(serieId, findeSerie, {
        new: true,
      });

      for (const exerciseIdObject of updatedSerie.exercises) {
        let exerciseId = exerciseIdObject.toString();
        // console.log(exerciseId);
        let updatedExercise = findExerciseById(findeSerie, exerciseId);
        // console.log(updatedExercise);

        let ex = await Exercise.findByIdAndUpdate(exerciseId, updatedExercise, {
          new: true,
        });
        console.log(ex);
      }
    }

    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar la rutina y sus relaciones." });
  }
};

function findSeriesById(routine, seriesId) {
  // console.log(routine);
  for (const serie of routine.series) {
    // console.log(serie);
    if (serie._id === seriesId) {
      return serie;
    }
  }
  return null;
}

function findExerciseById(serie, exerciseId) {
  // console.log(serie);
  for (const exercise of serie.exercises) {
    // console.log(serie);
    if (exercise._id === exerciseId) {
      return exercise;
    }
  }
  return null;
}
