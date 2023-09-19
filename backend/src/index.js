const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Importa y usa las rutas individuales
const routineRoutes = require("./routes/routineRoutes");
const serieRoutes = require("./routes/seriesRoutes");

app.use("/api/routines", routineRoutes);
app.use("/api/series", serieRoutes);

// Conecta la base de datos aquí antes de iniciar el servidor
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
