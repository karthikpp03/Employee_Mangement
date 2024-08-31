// dependency import declarations
const mysql = require("mysql2");
const { dbOptions } = require("../utils/dbConfig.js");
const db = mysql.createConnection(dbOptions);

// Search database and retrieve role name and id
const generateRoleChoices = (rolesFromDB) => {
	return rolesFromDB.map((role) => {
		return {
			name: role.title,
			value: role.id,
		};
	});
};

// Search database and retrieve an employee first and last name
const generateEmployeeChoices = (employeeFromDB) => {
	return employeeFromDB.map((employee) => {
		return {
			name: `${employee.first_name} ${employee.last_name}`,
			value: employee.id,
		};
	});
};

// Search database and retrieve department name and id
const generateDepartmentChoices = (departmentFromDB) => {
	return departmentFromDB.map((department) => {
		return {
			name: department.name,
			value: department.id,
		};
	});
};

module.exports = {
	generateRoleChoices,
	generateEmployeeChoices,
	generateDepartmentChoices,
};
