-- departments

USE company_db;

insert into department (name)
values ("Sales");

insert into department (name)
values ("Marketing");

insert into department (name)
values ("IT");

insert into department (name)
values ("Engineering");

insert into department (name)
values ("HR");


-- roles
-- USE company_db;

insert into role (title, salary, department_id)
values ("Sales Executive", 24000, 1);
insert into role (title, salary, department_id)
values ("Sales Manager", 35000, 1);
insert into role (title, salary, department_id)
values ("Sales Director", 60000, 1);
insert into role (title, salary, department_id)
values ("Lead Engineer", 60000, 3);
insert into role (title, salary, department_id)
values ("Senior Software Engineer", 45000, 3);
insert into role (title, salary, department_id)
values ("Junior Software Engineer", 30000, 3);
insert into role (title, salary, department_id)
values ("Marketing Executive", 20000, 2);
insert into role (title, salary, department_id)
values ("Marketing Manager", 30000, 2);
insert into role (title, salary, department_id)
values ("Group Marketing Director", 70000, 2);
insert into role (title, salary, department_id)
values ("Application Support Analyst", 35000, 4);
insert into role (title, salary, department_id)
values ("IT Manager", 55000, 4);
insert into role (title, salary, department_id)
values ("IT Director", 75000, 4);
insert into role (title, salary, department_id)
values ("HR Executive", 25000, 5);
insert into role (title, salary, department_id)
values ("HR Manager", 35000, 5);
insert into role (title, salary, department_id)
values ("HR Direcor", 60000, 5);


-- employees
-- USE company_db;

insert into employee (first_name, last_name, role_id)
values ("Barry", "Thomson", 3);
insert into employee (first_name, last_name, role_id)
values ("Julie", "Christmas", 2);
insert into employee (first_name, last_name, role_id)
values ("Daveed", "Diggs", 1);
insert into employee (first_name, last_name, role_id)
values ("Chistopher", "Nolan", 4);
insert into employee (first_name, last_name, role_id)
values ("Kurt", "Hammet", 5);
insert into employee (first_name, last_name, role_id)
values ("James", "Hetfield", 6);
insert into employee (first_name, last_name, role_id)
values ("Tim ", "Kenny", 9);
insert into employee (first_name, last_name, role_id)
values ("Chris", "Corsano", 8);
insert into employee (first_name, last_name, role_id)
values ("Alexander", "Murray", 7);
insert into employee (first_name, last_name, role_id)
values ("David", "Rodigan", 12);
insert into employee (first_name, last_name, role_id)
values ("Alessandro", "Ansa", 11);
insert into employee (first_name, last_name, role_id)
values ("Devin", "Townsend", 10);
insert into employee (first_name, last_name, role_id)
values ("Nick", "Cave", 15);
insert into employee (first_name, last_name, role_id)
values ("Warren", "Ellis", 14);
insert into employee (first_name, last_name, role_id)
values ("Steve", "Albini", 13);


UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 1 WHERE id = 3;
UPDATE employee SET manager_id = 4 WHERE id = 5;
UPDATE employee SET manager_id = 4 WHERE id = 6;
UPDATE employee SET manager_id = 9 WHERE id = 8;
UPDATE employee SET manager_id = 9 WHERE id = 9;
UPDATE employee SET manager_id = 10 WHERE id = 11;
UPDATE employee SET manager_id = 10 WHERE id = 12;
UPDATE employee SET manager_id = 13 WHERE id = 14;
UPDATE employee SET manager_id = 13 WHERE id = 15;
