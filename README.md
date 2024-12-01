# Employee Management System

A simple Employee Management System with **Node.js**, **MongoDB**, and **React.js**. It allows creating, reading, updating, and deleting employee records. This project uses **Docker** for containerization and **Material UI** for the frontend design.

## Features

- Add, update, and delete employees
- View all employees with a sleek, responsive design powered by **Material UI**
- Built with **Node.js**, **MongoDB**, **React.js**, and **Material UI**

## Technologies

- **Frontend**: React.js, Material UI
- **Backend**: Node.js/Express.js
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/di1ara/101376617_comp3123_assignment2.git
   cd 101376617_comp3123_assignment2
   ```

2. **Create `.env` file in the `backend` directory:**

   Inside the `backend` directory, create a `.env` file with the following content:

   ```env
   DB_URI=mongodb://mongo:27017/comp3123_assignment2
   PORT=5000
   ```

3. **Build and run with Docker Compose:**

   From the root of the project, build and start the Docker containers using the following command:

   ```bash
   docker-compose up --build
   ```

4. **Access the application:**

   Once the containers are up and running, you can access the following:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000/api/employees](http://localhost:5000/api/employees)
   - **MongoDB**: Accessible on port `27018`

## API Endpoints

- **POST /api/employees**: Add a new employee
- **GET /api/employees**: Get all employees
- **GET /api/employees/:id**: Get employee by ID
- **PUT /api/employees/:id**: Update an employee
- **DELETE /api/employees/:id**: Delete an employee