import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import {
  getAllNotesAdminAPI,
  updateNoteStatusAPI,
  deleteNoteAdminAPI,
} from "../../services/allAPI";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import emptyGif from "../../assets/qnAddAnimate.gif";
import imageBg from "../../assets/bg_3.jpg";

const AdminNotesPage = () => {
  const [notes, setNotes] = useState([]);

  // safe token read
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null;

  useEffect(() => {
    if (!token) {
      toast.error("Admin not authenticated");
      return;
    }
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  // fetch all notes
  const fetchNotes = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getAllNotesAdminAPI(reqHeader);

      if (result.status === 200) {
        setNotes(result.data);
      } else {
        toast.error("Failed to fetch notes");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // approve / reject
  const handleStatusChange = async (id, status) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await updateNoteStatusAPI(id, status, reqHeader);

      if (result.status === 200) {
        toast.success(`Note ${status}`);
        setNotes((prev) =>
          prev.map((note) =>
            note._id === id ? { ...note, status } : note
          )
        );
      } else {
        toast.error("Action failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Status update failed");
    }
  };

  // delete note (with confirmation)
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete note?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await deleteNoteAdminAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Note deleted");
        setNotes((prev) =>
          prev.filter((note) => note._id !== id)
        );
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div
        className="min-h-screen py-10 px-4"
        style={{
          backgroundImage: `url(${imageBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-[#008080] heading">
          Uploaded Notes
        </h1>

        {notes.length === 0 ? (
          <div className="text-center text-gray-500">
            <img
              src={emptyGif}
              alt="No notes"
              className="mx-auto w-48 mb-4"
            />
            <p className="text-3xl text-green-700">
              No notes found
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-blue-50 p-5 rounded-xl shadow hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {note.title}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                  <b>Topic:</b> {note.topic}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <b>Uploaded by:</b> {note.createdBy}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      note.status === "approved"
                        ? "text-green-600"
                        : note.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {note.status}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {note.status !== "approved" && (
                    <button
                      onClick={() =>
                        handleStatusChange(note._id, "approved")
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}

                  {note.status !== "rejected" && (
                    <button
                      onClick={() =>
                        handleStatusChange(note._id, "rejected")
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default AdminNotesPage;
