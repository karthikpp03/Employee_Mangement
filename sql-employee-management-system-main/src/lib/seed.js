// dependency import declarations
const mysql = require("mysql2");
const department = require("./department.js");
const employee = require("./employee.js");
const role = require("./role");
const { dbOptions } = require("../utils/dbConfig.js");
const gradient = require("gradient-string");

// connecting to database
const db = mysql.createConnection(dbOptions);

// creating values for department
const departmentValues = department
	.map((department) => `("${department.name}")`)
	.join(",");

// template string query for department table
const departmentQuery = `INSERT INTO department(name) VALUE${departmentValues}`;

db.query(departmentQuery, (err, result) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log(
		gradient.instagram(
			"Successfully entered DEPARTMENTS into department table."
		)
	);
});

// creating values for role
const roleValues = role
	.map((role) => `('${role.title}', '${role.salary}', '${role.department_id}')`)
	.join(",");

// template string query for role table
const roleQuery = `INSERT INTO role(title, salary, department_id) VALUE${roleValues}`;

db.query(roleQuery, (err, result) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log(
		gradient.instagram("Successfully entered ROLES into role table.")
	);
});

// creating employee values
const employeeValues = employee
	.map(
		(employee) =>
			`('${employee.first_name}', '${employee.last_name}', '${employee.role_id}', ${employee.manager_id})`
	)
	.join(",");

// template string query for employee table
const employeeQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE${employeeValues}`;

db.query(employeeQuery, (err, result) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log(
		gradient.instagram("Successfully entered EMPLOYEES into employee table.")
	);
});
db.end();
