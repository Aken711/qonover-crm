const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

mongoose.set('strictQuery', false);

mongoose
  .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.p3znl.mongodb.net/crm-freelance")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));