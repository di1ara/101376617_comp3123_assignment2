import React, { useState } from 'react';

function Signup({ onSignup }) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
