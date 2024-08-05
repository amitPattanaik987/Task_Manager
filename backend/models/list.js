const mongoose = require('mongoose');

// Define the schema for a list
const listSchema = new mongoose.Schema({
  List: {
    type: String,
    required: [true, 'List name is required'], // Custom error message for required validation
    trim: true, // Trims whitespace from the string
    unique:true
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the field to the current date and time
  },
  tasks: {
    type: [String], // Array of task objects
    default: [],
  },
});

// Create a model from the schema
const ListModel = mongoose.model('List', listSchema);

module.exports = ListModel;
