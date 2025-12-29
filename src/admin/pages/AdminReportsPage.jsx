import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import {
  getAllReportsAPI,
  resolveReportAPI,
  deleteReportAPI,
} from "../../services/allAPI";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const AdminReportsPage = () => {
  const [reports, setReports] = useState([]);

  // safely read token
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null;

  useEffect(() => {
    if (!token) {
      toast.error("Admin not authenticated");
      return;
    }
    fetchReports();
    // eslint-disable-next-line
  }, []);

  const fetchReports = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getAllReportsAPI(reqHeader);

      if (result.status === 200) {
        setReports(result.data);
      } else {
        toast.error("Failed to load reports");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while loading reports");
    }
  };

  const handleResolve = async (id) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await resolveReportAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Report resolved");
        fetchReports();
      } else {
        toast.error("Failed to resolve report");
      }
    } catch (err) {
      console.error(err);
      toast.error("Resolve failed");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete report?",
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

      const result = await deleteReportAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Report deleted");
        fetchReports();
      } else {
        toast.error("Failed to delete report");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#008080]">
          User Reports
        </h1>

        {reports.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            No reports found
          </p>
        ) : (
          <div className="max-w-6xl mx-auto overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <table className="w-full border border-gray-300 text-left text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Note</th>
                  <th className="p-3 border">Reported By</th>
                  <th className="p-3 border">Reason</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r, index) => (
                  <tr
                    key={r._id}
                    className={`border-t hover:bg-gray-50 transition ${
                      r.status === "resolved" ? "bg-green-50" : ""
                    }`}
                  >
                    <td className="p-3 border">{index + 1}</td>

                    <td className="p-3 border font-semibold">
                      {r.noteTitle || "—"}
                    </td>

                    <td className="p-3 border">
                      {r.reportedBy || "—"}
                    </td>

                    <td className="p-3 border">
                      {r.reason || "—"}
                    </td>

                    <td
                      className={`p-3 border font-semibold ${
                        r.status === "resolved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {r.status}
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleResolve(r._id)}
                        disabled={r.status === "resolved"}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 disabled:opacity-50"
                      >
                        Resolve
                      </button>

                      <button
                        onClick={() => handleDelete(r._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
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

export default AdminReportsPage;
