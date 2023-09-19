// const mongoose = require("mongoose");
// require("dotenv").config();
// // mongoose
// //   .connect("mongodb://127.0.0.1/my-routines", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then((db) => console.log("Database is Connected"))
// //   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 3000;

// mongoose.set("strictQuery", false);
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };
