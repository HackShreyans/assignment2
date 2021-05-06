const express = require("express");
const student = require("../Controller/StudentController");
const router = express.Router();

router.post("/api/student/add", student.AddStudent);
router.get("/api/get/student", student.GetStudent);
router.get("/api/get/studentTotalMarks", student.GetTotalMarksStudent);

module.exports = router;
