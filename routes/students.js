const express = require("express");
const router = express.Router();

// In-memory store
let students = [
  { id: 1, name: "Amardeep Bharti", rollNo: "2023LM70008", branch: "CS", year: 3 },
  { id: 2, name: "Sukant Sinha", rollNo: "2023LM70009", branch: "ECE", year: 2 },
];
let nextId = 3;

// GET all students
router.get("/", (req, res) => {
  res.json(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// CREATE a student
router.post("/", (req, res) => {
  const { name, rollNo, branch, year } = req.body;
  if (!name || !rollNo || !branch || !year) {
    return res.status(400).json({ error: "All fields required: name, rollNo, branch, year" });
  }
  const student = { id: nextId++, name, rollNo, branch, year };
  students.push(student);
  res.status(201).json(student);
});

// UPDATE a student
router.put("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, rollNo, branch, year } = req.body;
  if (name) student.name = name;
  if (rollNo) student.rollNo = rollNo;
  if (branch) student.branch = branch;
  if (year) student.year = year;

  res.json(student);
});

// DELETE a student
router.delete("/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const deleted = students.splice(index, 1);
  res.json({ message: "Student deleted", student: deleted[0] });
});

module.exports = router;
