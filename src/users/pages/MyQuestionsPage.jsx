import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import {getMyQuestionsAPI,deleteQuestionAPI,} from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

const MyQuestionsPage = () => {
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getMyQuestionsAPI(reqHeader).then((res) => {
      if (res.status === 200) {
        setQuestions(res.data);
      }
    });
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteQuestionAPI(id, reqHeader);
    if (result.status === 200) {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">
            My Questions
          </h1>

          {questions.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">
                You haven’t added any questions yet.
              </p>
              <button
                onClick={() => navigate("/user/addQuestion")}
                className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                Add Your First Question
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {questions.map((q, index) => (
                <div
                  key={q._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    {/* Question content */}
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        Question #{index + 1}
                      </p>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {q.question}
                      </h2>

                      <span className="inline-block bg-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full capitalize">
                        {q.topic}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/user/edit-question/${q._id}`)
                        }
                        className="px-4 py-1 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(q._id)}
                        className="px-4 py-1 border border-red-500 text-red-600 rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyQuestionsPage;
