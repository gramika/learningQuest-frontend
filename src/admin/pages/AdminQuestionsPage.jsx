import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import {
  getAllQuestionsAdminAPI,
  updateQuestionStatusAPI,
} from "../../services/allAPI";

const AdminQuestionsPage = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const reqHeader = { Authorization: `Bearer ${token}` };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAllQuestionsAdminAPI(reqHeader).then((res) => {
      if (res.status === 200) setQuestions(res.data);
    });
  }, []);

  const updateStatus = async (id, status) => {
    await updateQuestionStatusAPI(id, status, reqHeader);
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, status } : q
      )
    );
  };

  const getStatusBadge = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <>
      <HeaderAdmin />

      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Manage Questions
        </h1>

        {questions.length === 0 ? (
          <p className="text-center text-gray-500">
            No questions available
          </p>
        ) : (
          <div className="grid gap-6 max-w-5xl mx-auto">
            {questions.map((q, index) => (
              <div
                key={q._id}
                className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-semibold text-gray-500">
                    Q{index + 1}
                  </span>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadge(
                      q.status
                    )}`}
                  >
                    {q.status}
                  </span>
                </div>

                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {q.question}
                </p>

                <p className="text-sm text-gray-500 capitalize mb-4">
                  Topic: <span className="font-medium">{q.topic}</span>
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => updateStatus(q._id, "approved")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(q._id, "rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
                  >
                    Reject
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

export default AdminQuestionsPage;
