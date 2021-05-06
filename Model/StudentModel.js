const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  marks: {
    type: Number,
    require: true
  }
});
module.exports = mongoose.model("student", StudentSchema);
