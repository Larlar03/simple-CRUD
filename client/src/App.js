import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState(0);
  const [newSalary, setNewSalary] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = (e) => {
    e.preventDefault();
    console.log(
      `${firstName} ${lastName} ${ageRange} ${city} ${role} ${salary}`
    );
    Axios.post("http://localhost:3001/create", {
      firstName: firstName,
      lastName: lastName,
      ageRange: ageRange,
      city: city,
      role: role,
      salary: salary,
    })
      .then(() => {
        console.log("Employee added to db");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const getEmployees = async (e) => {
    e.preventDefault();
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateSalary = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update", {
      id: e.currentTarget.id,
      newSalary: newSalary,
    })
      .then(() => {
        console.log("Salary updated");
        getEmployees(e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteEmployee = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    Axios.delete(`http://localhost:3001/delete/${id}`, {})
      .then(() => {
        console.log("Employee deleted");
        getEmployees(e);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="App">
      <section className="information">
        <form>
          <div className="form-group">
            <label htmlFor="firstNameInput">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstNameInput"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstNameInput">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastNameInput"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ageRangeSelect">Age</label>
            <select
              className="form-control"
              id="ageRangeSelect"
              onChange={(e) => {
                setAgeRange(e.target.value);
              }}
            >
              <option>Select</option>
              <option>18-24</option>
              <option>25-34</option>
              <option>35-44</option>
              <option>45-54</option>
              <option>55-64</option>
              <option>65+</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cityInput">City</label>
            <input
              type="text"
              className="form-control"
              id="cityInput"
              placeholder="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleInput">Role</label>
            <input
              type="text"
              className="form-control"
              id="roleInput"
              placeholder="Role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
          <div className="form-group" id="salary-form-group">
            <label htmlFor="salaryInput">Salary</label>

            <span className="salary-input-container">
              <div className="input-group-prepend">
                <span className="input-group-text" id="currency-prepend">
                  ??
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                id="salaryInput"
                placeholder="Salary"
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
            </span>
          </div>
          <button className="btn btn-dark" onClick={addEmployee}>
            Add Employee
          </button>
        </form>
      </section>
      <section className="show-employees">
        <button className="btn btn-dark" onClick={getEmployees}>
          Show Employees
        </button>
        <div className="employee-list">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">City</th>
                <th scope="col">Role</th>
                <th scope="col">Salary</th>
                <th scope="col">New salary</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.age_range}</td>
                    <td>{employee.city}</td>
                    <td>{employee.role}</td>
                    <td>{employee.salary}</td>
                    <td id="update-td">
                      <input
                        type="text"
                        placeholder="0"
                        id="update-salary-input"
                        className="form-control"
                        onChange={(e) => {
                          setNewSalary(e.target.value);
                        }}
                      />
                      <button
                        className="btn btn-dark update-button"
                        id={employee.id}
                        onClick={updateSalary}
                      >
                        <i className="bi bi-arrow-repeat"></i>
                      </button>
                      <button
                        className="btn btn-dark update-button"
                        id={employee.id}
                        onClick={deleteEmployee}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
