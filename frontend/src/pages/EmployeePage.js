import React, { useEffect, useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import employeeService from '../services/employeeService';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployees() {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  const handleAddOrUpdate = async (employee) => {
    if (editingEmployee) {
      await employeeService.updateEmployee(editingEmployee.id, employee);
    } else {
      await employeeService.addEmployee(employee);
    }
    const updatedEmployees = await employeeService.getEmployees();
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
  };

  const handleDelete = async (id) => {
    await employeeService.deleteEmployee(id);
    const updatedEmployees = await employeeService.getEmployees();
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <EmployeeForm onSubmit={handleAddOrUpdate} initialData={editingEmployee} />
      <EmployeeList employees={employees} onDelete={handleDelete} />
    </div>
  );
}

export default EmployeePage;
