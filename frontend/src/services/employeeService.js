// frontend/src/services/employeeService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addEmployee = async (employee) => {
  await axios.post(API_URL, employee);
};

const updateEmployee = async (id, employee) => {
  await axios.put(`${API_URL}/${id}`, employee);
};

const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

const employeeService = { getEmployees, addEmployee, updateEmployee, deleteEmployee };
export default employeeService;
