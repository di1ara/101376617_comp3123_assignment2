import React from 'react';

function EmployeeDetails({ employee }) {
  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {employee.name}</p>
      <p>Department: {employee.department}</p>
      <p>Position: {employee.position}</p>
    </div>
  );
}

export default EmployeeDetails;
