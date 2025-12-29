import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import { getAdminMessagesAPI, deleteMessageAPI } from "../../services/allAPI";
import Swal from "sweetalert2";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getAdminMessagesAPI(reqHeader);
    if (result?.status === 200) {
      setMessages(result.data);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this message?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    const token = JSON.parse(sessionStorage.getItem("token"));
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    await deleteMessageAPI(id, reqHeader);
    setMessages(messages.filter((m) => m._id !== id));
  };

  return (
    <>
      <HeaderAdmin />

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-10">
          Contact Messages
        </h1>

        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No messages received yet
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {msg.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {msg.email}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {msg.message}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AdminMessagesPage;
