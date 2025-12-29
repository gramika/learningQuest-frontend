import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import { getAllUsersAPI, deleteUserAPI } from "../../services/allAPI";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import userBg from "../../assets/usersBg.jpg";
import "react-toastify/dist/ReactToastify.css";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Safely get token
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null;

  useEffect(() => {
    if (!token) {
      toast.error("Admin not authenticated");
      return;
    }
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getAllUsersAPI(reqHeader);

      if (result.status === 200) {
        setUsers(result.data);
      } else {
        toast.error("Failed to load users");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await deleteUserAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Safe search
  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeaderAdmin />

      <div
        className="min-h-screen py-10 px-4"
        style={{
          backgroundImage: `url(${userBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
          Manage Users (Admin)
        </h1>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Users Table */}
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            No users found
          </p>
        ) : (
          <div className="overflow-x-auto max-w-5xl mx-auto bg-white shadow-lg rounded">
            <table className="min-w-full border">
              <thead className="bg-teal-100">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Username</th>
                  <th className="p-3 border">Email</th>
                  {/* <th className="p-3 border">Joined</th> */}
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{user.username}</td>
                    <td className="p-3 border">{user.email}</td>
                    {/* <td className="p-3 border">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td> */}
                    <td className="p-3 border text-center">
                      {/* Prevent admin self-delete */}
                      {user.email !== "admin@gmail.com" && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default AdminUsersPage;
