// src/components/UserForm.js
import React, { useState, useEffect } from "react";

function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-purple-600 p-10 rounded"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border px-4 py-2 w-full rounded"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border px-4 py-2 w-full rounded"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border px-4 py-2 w-full rounded"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="border px-4 py-2 w-full rounded"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
