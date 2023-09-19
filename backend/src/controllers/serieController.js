const Serie = require("../models/Serie");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.updateSerie = async (req, res) => {
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
};
