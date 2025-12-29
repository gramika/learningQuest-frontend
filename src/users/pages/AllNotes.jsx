import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import bgImage from "../../assets/notesBg_3.jpg";
import { getAllNotesAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";
import { reportNoteAPI } from "../../services/allAPI";
import { toast, ToastContainer } from "react-toastify";

const AllNotes = () => {
  // for managing the search item
  const [selectedTopic, setSelectedTopic] = useState("");
  // for managing reportmodal display
  const [reportModal, setReportModal] = useState(null);
  const [reportReason, setReportReason] = useState("");
  // handling the notes
  const [notes, setNotes] = useState([]);

  // const notes = [
  //   {
  //     name: "React_Tutorial.pdf",
  //     username: "amal",
  //     topic: "React",
  //     date: "Nov 1, 2025, 11:00 AM",
  //   },
  //   {
  //     name: "Node_Notes.pdf",
  //     username: "malavika",
  //     topic: "Node.js",
  //     date: "Oct 28, 2025, 8:30 PM",
  //   },
  // ];

  useEffect(() => {
    fetchNotes();
  }, []);

  // to get notes from backend
  const fetchNotes = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`
    };

    const result = await getAllNotesAPI(reqHeader);

    if (result.status === 200) {
      const approvedNotes = result.data.filter(
        note => note.status === "approved"
      );
      setNotes(approvedNotes);
    } else {
      setNotes([]);
    }
  }
};

  // filtering notes based on topic
  const filteredNotes = selectedTopic
    ? notes.filter(note => note.topic.toLowerCase() === selectedTopic.toLowerCase())
    : notes;

    // submits user reports
  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      toast.warning("Please enter a reason");
      return;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login again");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`
    };

    const reqBody = {
      noteId: reportModal._id,
      noteTitle: reportModal.title,
      reason: reportReason
    };

    const result = await reportNoteAPI(reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Report submitted");
      setReportModal(null);
      setReportReason("");
    }
  };




  return (
    <>
      <Header />
      <div
        className="min-h-screen py-10 px-4"
        style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: "center", backgroundSize: "cover", }}>

        <h1 className="text-3xl font-bold text-[#008080] text-center mb-8 underline">
          Study Notes
        </h1>

        {/* Filter Section */}
        <div className="max-w-4xl mx-auto shadow-md rounded-lg p-5 mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col w-full text-center">
            <label className="text-2xl font-semibold mb-3 text-gray-700">
              Filter by Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">All Topics</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="express">Express</option>
              <option value="mongodb">MongoDB</option>
            </select>
          </div>
        </div>

        {/* Notes Display */}
        {filteredNotes.length === 0 ? (
          <div className="text-center text-blue-800 mt-8">
            <p className="font-extrabold text-2xl">
              No notes found for the selected topic.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between border-2 border-[#008080] transform transition-transform duration-300 hover:scale-105"
              >
                <div>
                  <p className="font-semibold text-lg text-[#008080] truncate">
                    {note.title}
                  </p>

                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    Uploaded by:{" "}
                    <span className="font-semibold">{note.createdBy}</span>
                  </p>

                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    Topic:{" "}
                    <span className="capitalize font-semibold">{note.topic}</span>
                  </p>

                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(note.addedOn).toLocaleDateString()}
                  </p>

                </div>

                <div className="flex justify-between items-center mt-2">
                  <a
                    href={`${serverURL}/uploads/${note.noteURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View / Download
                  </a>

                  <button onClick={() => setReportModal(note)}
                    className="text-red-600 font-medium hover:underline">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Report Modal */}
        {reportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Report Note
              </h2>

              <p className="text-sm mb-2">
                <span className="font-bold">File:</span> {reportModal.title}
              </p>

              <p className="text-sm mb-2">
                <span className="font-bold">Uploader:</span> {reportModal.createdBy}
              </p>

              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full border rounded-md p-2 mb-4"
                rows={3}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setReportModal(null);
                    setReportReason("");
                  }}
                  className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                onClick={handleReportSubmit}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <ToastContainer position="top-center" autoClose={2000} />

      <Footer />
    </>
  );
};

export default AllNotes;
