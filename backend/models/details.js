const mongoose = require("mongoose");

const details =new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    trim: true, // Trims whitespace from the string
    unique: true
  },
  Password: {
    type: String,
    required: true,
  },
});

const detailsmodel = mongoose.model("data", details);
module.exports = detailsmodel;
