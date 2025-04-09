User Registration API using Node.js, Express & MySQL

Hi there! 

This is a simple backend project I built from scratch using Node.js, Express.js, and MySQL — without any fancy frameworks or ORMs. The idea was to create a  registration system where users can sign up with a username, email, and password.

I’ve kept the code clean and simple, with step-by-step logic.

---

##  What this project does

This project provides one main feature:

**User Registration**

- Accepts a `username`, `email`, and `password`
- Validates the input (like checking if fields are empty, if email is valid, etc.)
- Checks if the email already exists in the database
- Hashes the password for security using `bcrypt`
- Saves the user to a MySQL database
- Sends back a success message with the user ID

---


---

## 🛠 Tools & Technologies

- Node.js (backend runtime)
- Express.js (web server framework)
- MySQL (relational database)
- bcrypt (for password hashing)
- Postman (for testing API requests)

---

## How to Run This Project

1. Clone the repository


git clone https://github.com/YOUR_USERNAME/signup-.git
cd signup

Install the following dependencies with the command 
npm install

##  Setup the mysql database
CREATE DATABASE signup;

USE signup;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

## update with your credentials

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', here, update with your password
  database: 'signup'
});

## Now start the server

node server.js

## In postman hit this api endpoint
method : POST 
url: http://localhost:3000/api/register

body :
{
  "username": "jane_doe",
  "email": "jane@example.com",
  "password": "mypassword"
}


