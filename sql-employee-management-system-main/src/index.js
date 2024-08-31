// Declari

const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const figlet = require("figlet");
const gradient = require("gradient-string");
const table = require("table");
const Db = require("./db");
const { dbOptions } = require("./utils/dbConfig.js");

const config = {
	// table package style settings
	border: table.getBorderCharacters("honeywell"),
};

const {
	mainQuestions,
	employeeInfo,
	departmentInfo,
	deleteRecord,
} = require("./utils/questions");

const {
	employeeQuery,
	roleQuery,
	departmentQuery,
	employeeByManager,
} = require("./utils/queries");

const {
	generateRoleChoices,
	generateEmployeeChoices,
	generateDepartmentChoices,
} = require("./utils/utils.js");

const init = async () => {
	// Welcome message function that uses both figlet and gradient
	function welcomeMessage() {
		const welcomeMsg = `SQL  Employee  Management  System`;

		figlet(welcomeMsg, (err, data) => {
			console.log(gradient.pastel.multiline(data));
		});
	}

	welcomeMessage();

	try {
		// Establishing a connection to the database
		const db = new Db({
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "password",
			database: process.env.DB_NAME || "company_db",
		});

		await db.start();

		// While inProgress is true, ask the user questions. If user selects quit - progress changes to false

		let inProgress = true;

		while (inProgress) {
			// first action question - what action would the user like to take?
			// this question will be the main question loop - the users choice you will trigger one of the if statement blocks of code below
			let { userInput } = await inquirer.prompt(mainQuestions);

			// if user selects view all departments, then retrieve from database and display table
			if (userInput === gradient.summer("View all departments")) {
				const departments = await db.query(departmentQuery);
				console.table(departments);
			}

			// if user selects view all roles, then retrieve from database and display table
			if (userInput === gradient.summer("View all roles")) {
				const roles = await db.query(roleQuery);
				console.table(roles);
			}

			// if user selects view all employees, then retrieve from database and display table
			if (userInput === gradient.summer("View all employees")) {
				const employees = await db.query(employeeQuery);
				console.table(employees);
			}

			// if user selects add a department, then give the user the choice to add a department name
			if (userInput === gradient.summer("Add a department")) {
				const { departmentName } = await inquirer.prompt(departmentInfo);

				await db.query(
					`INSERT INTO department (name) VALUES ('${departmentName}');`
				);
			}

			// if user selects add a role, then give the user the choice to add a role name
			if (userInput === gradient.summer("Add a role")) {
				const departments = await db.query(departmentQuery);

				const roleQuestions = [
					{
						type: "list",
						message: "Please select a department:",
						name: "departmentId",
						choices: generateDepartmentChoices(departments),
					},
					{
						type: "input",
						message: "Please enter role title:",
						name: "title",
					},
					{
						type: "input",
						message: "Please enter role salary:",
						name: "salary",
					},
				];

				const { departmentId, title, salary } = await inquirer.prompt(
					roleQuestions
				);

				await db.query(
					`INSERT INTO role(title, salary, department_id) VALUES('${title}', '${salary}', '${departmentId}')`
				);
			}

			// if user selects add an employee, then give the user the choice to add an employee
			if (userInput === gradient.summer("Add an employee")) {
				const roles = await db.query("SELECT * FROM role");
				const employees = await db.query("SELECT * FROM  employee");

				const employeeInfo = [
					{
						type: "input",
						message: gradient.instagram("Enter First Name"),
						name: "firstName",
					},
					{
						type: "input",
						message: gradient.instagram("Enter Last Name"),
						name: "lastName",
					},
					{
						type: "list",
						message: gradient.instagram("Please select a role"),
						name: "employeeRole",
						choices: generateRoleChoices(roles),
					},
					{
						type: "confirm",
						name: "managerQuery",
						message: gradient.instagram("Does the employee have a manager?"),
						default: null,
					},
					{
						type: "list",
						name: "employeeManager",
						message: gradient.instagram("Enter Manager Name:"),
						choices: generateEmployeeChoices(employees),
						default: null,
						when: (employeeInfo) => employeeInfo.managerQuery === true,
					},
				];

				// prompt questions to user
				const {
					firstName,
					lastName,
					employeeRole,
					employeeManager = null,
				} = await inquirer.prompt(employeeInfo);

				try {
					console.log(employeeManager);
					if (!employeeManager) {
						await db.query(
							`INSERT INTO employee(first_name, last_name, role_id) VALUE('${firstName}', '${lastName}', '${employeeRole}')`
						);
					} else {
						await db.query(
							`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE('${firstName}', '${lastName}', '${employeeRole}', '${employeeManager}')`
						);
					}
				} catch (error) {
					console.log(error);
				}
			}

			if (userInput === gradient.summer("Update Employee Manager")) {
				const employees = await db.query("SELECT * FROM  employee");
				const updateManager = [
					{
						type: "list",
						message: gradient.instagram("Select Employee"),
						name: "employeeChoice",
						choices: generateEmployeeChoices(employees),
					},
					{
						type: "list",
						message: gradient.instagram("Select New Manager"),
						name: "newManager",
						choices: generateEmployeeChoices(employees),
					},
				];

				const { employeeChoice, newManager } = await inquirer.prompt(
					updateManager
				);

				await db.query(
					`UPDATE company_db.employee SET manager_id = '${newManager}' WHERE (id = '${employeeChoice}');`
				);
			}

			// if user selects update employee role, then give the user the choice to update the role of an employee
			if (userInput === gradient.summer("Update Employee role")) {
				const roles = await db.query("SELECT * FROM role");
				const employees = await db.query("SELECT * FROM  employee");
				const updateEmployeeInfo = [
					{
						type: "list",
						message: gradient.instagram(
							"Select an employee to update their role"
						),
						name: "employeeToUpdate",
						choices: generateEmployeeChoices(employees),
					},
					{
						type: "list",
						message: gradient.instagram("Please select a role"),
						name: "employeeRole",
						choices: generateRoleChoices(roles),
					},
				];

				const { employeeToUpdate, employeeRole } = await inquirer.prompt(
					updateEmployeeInfo
				);

				await db.query(
					`UPDATE company_db.employee SET role_id = '${employeeRole}' WHERE (id = '${employeeToUpdate}');`
				);
			}

			// if View Employee by Manager, then give the user the choice to View Employee by Manager
			if (userInput === gradient.summer("View Employee by Manager")) {
				//prompt questions to user
				const viewEmployeeByManager = await db.query(employeeByManager);
				console.table(viewEmployeeByManager);
			}

			// if Delete Record, then give the user the choice to Delete Record
			if (userInput === gradient.summer("Delete Record")) {
				const roles = await db.query("SELECT * FROM role");
				const employees = await db.query("SELECT * FROM  employee");
				const department = await db.query("SELECT * FROM department");

				//prompt questions to user
				const { recordSelection } = await inquirer.prompt(deleteRecord);

				if (recordSelection === gradient.instagram("Delete employee")) {
					const employeeList = [
						{
							type: "list",
							message: gradient.instagram("Select an employee to delete:"),
							name: "employeeToDelete",
							choices: generateEmployeeChoices(employees),
						},
					];
					const { employeeToDelete } = await inquirer.prompt(employeeList);

					await db.query(
						`DELETE FROM company_db.employee WHERE (id = '${employeeToDelete}');`
					);
					console.log(gradient.instagram(`Employee successfully deleted`));
				}

				if (recordSelection === gradient.instagram("Delete role")) {
					const roleList = [
						{
							type: "list",
							message: gradient.instagram("Select a role to delete:"),
							name: "roleToDelete",
							choices: generateRoleChoices(roles),
						},
					];
					const { roleToDelete } = await inquirer.prompt(roleList);

					await db.query(
						`DELETE FROM company_db.role WHERE (id = '${roleToDelete}');`
					);
					console.log(gradient.instagram(`Role successfully deleted`));
				}

				if (recordSelection === gradient.instagram("Delete Department")) {
					const departmentList = [
						{
							type: "list",
							message: gradient.instagram("Select a role to delete:"),
							name: "departmentToDelete",
							choices: generateDepartmentChoices(department),
						},
					];
					const { departmentToDelete } = await inquirer.prompt(departmentList);
					await db.query(
						`DELETE FROM company_db.department WHERE (id = '${departmentToDelete}');`
					);
					console.log(gradient.instagram(`Department successfully deleted`));
				}
			}

			// confirm if user would still like to interact with the database
			if (userInput === gradient.summer("Quit Session")) {
				inProgress = false;
				db.stop();
				console.log(gradient.instagram("Session closed."));
			}
		}
	} catch (error) {
		console.log(`[ERROR]: Internal error | ${error.message}`);
	}
};

init();
