const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 3001;

const db = mysql.createConnection({
  host: "localhost",
  database: "company",
  user: "root",
  password: "root",
});

app.get("/", (req, res) => {
  res.send("Employee Database");
});

// Create new employee in db
app.post("/create", (req, res) => {
  console.log(req.body);
  // set up values you want to be inserted
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const ageRange = req.body.ageRange;
  const city = req.body.city;
  const role = req.body.role;
  const salary = req.body.salary;

  db.query(
    "INSERT INTO employees (first_name, last_name, age_range, city, role, salary) \
     VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, ageRange, city, role, salary],
    (err, results) => {
      if (err) {
        console.log(err.response.data);
      } else {
        res.send(results);
      }
    }
  );
});

// Get employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.log(err.response.data);
    } else {
      res.send(results);
    }
  });
});

app.listen(PORT, () => {
  console.log("Listening on port 3001");
});
