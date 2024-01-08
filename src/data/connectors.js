
const mongoose = require("mongoose");


const DATABASE_URI = process.env.MONGODB_URI;
console.log(DATABASE_URI);
const DATABASE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(DATABASE_URI, DATABASE_OPTIONS)
  .then(() => { 
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose.connection;