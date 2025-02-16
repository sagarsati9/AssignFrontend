"use client";
import { useEffect, useState } from "react";
import '../styles/globals.css';


export default function UserList({ users }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUserList(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        Users List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Enabled</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="text-center hover:bg-gray-100 transition">
                <td className="border p-3">{user.id}</td>
                <td className="border p-3">{user.userName}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.enabled ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
