import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm'; // Import your EmployeeForm component

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // For editing a specific employee

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id)); // Remove deleted employee from state
    } catch (err) {
      console.error('Error deleting employee', err);
    }
  };

  // Handle edit employee
  const handleEdit = (employee) => {
    setEmployeeToEdit(employee); // Set the employee to edit
  };

  // Handle the submission of the form (Update)
  const handleUpdateEmployee = async (employee) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${employee._id}`, {
        name: employee.name,
        position: employee.position,
      });

      // Update employee in the state after editing
      const updatedEmployee = response.data;
      setEmployees(employees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
      setEmployeeToEdit(null); // Clear the edit form after successful update
    } catch (err) {
      console.error('Error updating employee', err);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {employeeToEdit && (
        <EmployeeForm
          initialData={employeeToEdit} // Pass the selected employee to the form
          onSubmit={handleUpdateEmployee} // Pass the handleUpdateEmployee function to the form
        />
      )}
    </div>
  );
};

export default EmployeeList;
