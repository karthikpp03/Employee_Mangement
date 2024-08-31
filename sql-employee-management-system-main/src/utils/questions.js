// dependency import declarations
const gradient = require("gradient-string");

// Main looping question set
const mainQuestions = [
	{
		type: "list",
		message: "What action would you like to take?",
		name: "userInput",
		choices: [
			gradient.summer("View all departments"),
			gradient.summer("View all roles"),
			gradient.summer("View all employees"),
			gradient.summer("View Employee by Manager"),
			gradient.summer("Add a department"),
			gradient.summer("Add a role"),
			gradient.summer("Add an employee"),
			gradient.summer("Update Employee role"),
			gradient.summer("Update Employee Manager"),
			gradient.summer("Delete Record"),
			gradient.summer("Quit Session"),
		],
	},
];

// Loop stopper questions
const employeeInfo = [
	{
		type: "input",
		message: gradient.instagram("Enter First Name"),
		name: "firstName",
	},
	{
		type: "input",
		message: "Enter Last Name",
		name: "lastName",
	},
	{
		type: "input",
		message: "Enter Role Name",
		name: "employeeRole",
	},
	{
		type: "input",
		message: "Enter Manager Name",
		name: "employeeManager",
	},
];

const departmentInfo = [
	{
		type: "input",
		message: gradient.instagram("Enter Department Name"),
		name: "departmentName",
	},
];

const deleteRecord = [
	{
		type: "list",
		message: gradient.instagram("Which record type would you like to delete?"),
		name: "recordSelection",
		choices: [
			gradient.instagram("Delete Department"),
			gradient.instagram("Delete role"),
			gradient.instagram("Delete employee"),
		],
	},
];

module.exports = {
	mainQuestions,
	employeeInfo,
	departmentInfo,
	deleteRecord,
};
