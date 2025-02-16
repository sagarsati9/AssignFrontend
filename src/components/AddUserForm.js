"use client";
import { useState } from "react";
import '../styles/globals.css';


export default function AddUserForm({ onUserAdded }) {
  const [user, setUser] = useState({ userName: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const generatePermalink = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      permalink: generatePermalink(user.userName),
      userName: user.userName,
      email: user.email,
      password: user.password,
      enabled: true,
      deleted: false,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.statusText}`);
      }

      const result = await response.json();
      alert("User added successfully!");
      setUser({ userName: "", email: "", password: "" });

      if (onUserAdded) {
        onUserAdded(result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding user. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        Add New User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            placeholder="Enter user name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
