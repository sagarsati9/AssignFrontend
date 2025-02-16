"use client";
import AddUserForm from "@/components/AddUserForm";
import UserList from "@/components/UserList";
import { useState } from "react";
import '../styles/globals.css';

export default function Home() {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]); // Update the user list after adding a new user
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          User Management
        </h1>

        {/* Flex container for form & user list */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <AddUserForm onUserAdded={handleUserAdded} />
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}
