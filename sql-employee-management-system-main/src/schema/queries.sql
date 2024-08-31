
USE company_db;

-- view all departments
SELECT * FROM department;

-- view all roles
SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id ORDER BY department.name;

-- view all employees
SELECT employee_role.first_name, employee_role.last_name, title, salary, name
FROM employee employee_role 
LEFT JOIN role 
ON employee_role.role_id=role.id 
LEFT JOIN department
ON role.department_id=department.id;

SELECT CONCAT(E.FIRST_NAME,' ',
       E.LAST_NAME) AS 'USER',
       R.SALARY, R.TITLE,
       D.DEPT_NAME,
      CONCAT( M.FIRST_NAME,' ',
       M.LAST_NAME) AS MANAGER
FROM EMPLOYEE AS E
  JOIN EMPLOYEE AS M 
  ON E.MANAGER_ID = M.ID INNER JOIN ROLE R ON E.ROLE_ID = R.ID LEFT JOIN DEPARTMENT D ON R.DEPARTMENT_ID = D.ID ;

SELECT CONCAT(E.FIRST_NAME,' ',
       E.LAST_NAME) AS 'USER',
      CONCAT( M.FIRST_NAME,' ',
       M.LAST_NAME) AS MANAGER
FROM EMPLOYEE AS E
  JOIN EMPLOYEE AS M 
  ON E.MANAGER_ID = M.ID ;