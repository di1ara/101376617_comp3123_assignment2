import React, { useState } from 'react';

function EmployeeForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || { name: '', department: '', position: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Employee' : 'Add Employee'}</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <label>Department:</label>
      <input
        type="text"
        name="department"
        value={form.department}
        onChange={handleChange}
        required
      />
      <label>Position:</label>
      <input
        type="text"
        name="position"
        value={form.position}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default EmployeeForm;
