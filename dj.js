const mongoose = require("mongoose");

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://khanhxx151_db_user:lLJjInMjOGnpg62Y@tutorial6.487ljcm.mongodb.net/");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;