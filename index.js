const express = require("express");
const app = express();
const studentRoutes = require("./routes/students");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Student Info API", version: "1.0.0" });
});

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
