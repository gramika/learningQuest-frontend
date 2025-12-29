import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import notesBg from "../../assets/notesBg_2.jpg";
import { ToastContainer, toast } from "react-toastify";
import {addNotesAPI,getMyNotesAPI,deleteNoteUserAPI} from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

const NotesUploadPage = () => {

  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
    topic: "",
    uploadNotes: null
  });

  const [myNotes, setMyNotes] = useState([]);

  /* ---------------- FETCH MY NOTES ---------------- */
  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`
    };

    const result = await getMyNotesAPI(reqHeader);
    if (result.status === 200) {
      setMyNotes(result.data);
    }
  };

  /* ---------------- FILE CHANGE ---------------- */
  const handleFileChange = (e) => {
    setNoteDetails({
      ...noteDetails,
      uploadNotes: e.target.files[0]
    });
  };

  /* ---------------- UPLOAD NOTE ---------------- */
  const handleUpload = async () => {
    const { title, description, topic, uploadNotes } = noteDetails;

    if (!title || !description || !topic || !uploadNotes) {
      toast.warning("Please fill all fields and select a file");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("description", description);
    reqBody.append("topic", topic);
    reqBody.append("uploadNotes", uploadNotes);

    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`,
      "Content-Type": "multipart/form-data"
    };

    try {
      const result = await addNotesAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Note uploaded successfully");

        setNoteDetails({
          title: "",
          description: "",
          topic: "",
          uploadNotes: null
        });

        fetchMyNotes(); // refresh list
      }
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  /* ---------------- DELETE NOTE ---------------- */
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`
    };

    const result = await deleteNoteUserAPI(id, reqHeader);
    if (result.status === 200) {
      toast.success("Note deleted");
      fetchMyNotes();
    }
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen py-10 px-4"
        style={{
          backgroundImage: `url(${notesBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-8 text-teal-800">
          Upload Notes
        </h1>

        {/* ---------------- UPLOAD FORM ---------------- */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <input
            type="text"
            value={noteDetails.title}
            onChange={(e) =>
              setNoteDetails({ ...noteDetails, title: e.target.value })
            }
            className="w-full border rounded-md p-2"
            placeholder="Title"
          />

          <textarea
            value={noteDetails.description}
            onChange={(e) =>
              setNoteDetails({ ...noteDetails, description: e.target.value })
            }
            className="w-full border rounded-md p-2 h-[100px]"
            placeholder="Description"
          />

          <select
            className="w-full border rounded-md p-2"
            value={noteDetails.topic}
            onChange={(e) =>
              setNoteDetails({ ...noteDetails, topic: e.target.value })
            }
          >
            <option value="">Select Topic</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
            <option value="express">Express</option>
            <option value="mongodb">MongoDB</option>
            <option value="angular">Angular</option>
          </select>

          <input
            type="file"
            accept=".pdf,.doc,.ppt,.pptx"
            className="w-full border rounded-md p-2"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleUpload}
            className="w-full bg-teal-800 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Upload
          </button>
        </form>

        {/* ---------------- MY NOTES LIST ---------------- */}
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-xl font-bold text-center mb-6 text-[#008080]">
            My Uploaded Notes
          </h2>

          {myNotes.length === 0 ? (
            <p className="text-center text-gray-600">
              You haven’t uploaded any notes yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myNotes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white shadow-md rounded-lg p-5 border-2 border-[#008080]"
                >
                  <h3 className="font-semibold text-lg text-[#008080] truncate">
                    {note.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Topic: <b>{note.topic}</b>
                  </p>

                  <p className="text-sm">
                    Status:{" "}
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

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(note.addedOn).toLocaleDateString()}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={`${serverURL}/uploads/${note.noteURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </a>

                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default NotesUploadPage;
