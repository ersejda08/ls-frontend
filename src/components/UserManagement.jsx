import React, { useState, useEffect } from "react";
import { userAPI } from "../services/api";
import { Plus, Trash2, Edit2, Users } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await userAPI.update(editingId, formData);
        setEditingId(null);
      } else {
        await userAPI.create(formData);
      }
      setFormData({ name: "", email: "", role: "student" });
      setShowForm(false);
      await fetchUsers();
    } catch (err) {
      setError("Failed to save user");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await userAPI.delete(id);
        await fetchUsers();
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-gray-900">
                User Management
              </h1>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({ name: "", email: "", role: "student" });
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-300 to-pink-300 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white border border-purple-100 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-300 to-pink-300 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors font-medium"
                >
                  {editingId ? "Update" : "Create"} User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 border border-purple-200 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-300"></div>
          </div>
        ) : (
          <div className="bg-white border border-purple-100 rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-purple-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-rose-100 text-rose-700"
                            : user.role === "instructor"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-rose-600 hover:text-rose-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No users found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
