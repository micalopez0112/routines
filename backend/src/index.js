const express = require("express");
const app = express();
const cors = require("cors");

require("./database");

app.use(cors());
app.use(express.json());

// Importa y usa las rutas individuales
const routineRoutes = require("./routes/routineRoutes");
const serieRoutes = require("./routes/seriesRoutes");

app.use("/api/routines", routineRoutes);
app.use("/api/series", serieRoutes);

app.listen(3000, () => {
  console.log("Server on port", 3000);
});
