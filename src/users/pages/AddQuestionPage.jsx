import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { addQuestionAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

const AddQuestionPage = () => {
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const reqHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    topic: "",
  });

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addQuestionAPI(form, reqHeader);

    if (result.status === 200) {
      toast.success("Question added successfully!");
      setTimeout(() => navigate("/user/myQuestions",{ replace: true }), 1500);
    } else {
      toast.error(result.response?.data || "Failed to add question");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-100 p-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Question
          </h2>

          <textarea
            className="w-full border p-2 mb-3"
            placeholder="Enter question"
            value={form.question}
            onChange={(e) =>
              setForm({ ...form, question: e.target.value })
            }
            required
          />

          {form.options.map((opt, i) => (
            <input
              key={i}
              className="w-full border p-2 mb-2"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              required
            />
          ))}

          <select
            className="w-full border p-2 mb-3"
            value={form.correctAnswer}
            onChange={(e) =>
              setForm({ ...form, correctAnswer: e.target.value })
            }
            required
          >
            <option value="">Select Correct Answer</option>
            {form.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-2 mb-4"
            value={form.topic}
            onChange={(e) =>
              setForm({ ...form, topic: e.target.value })
            }
            required
          >
            <option value="">Select Topic</option>
            <option value="react">React</option>
            <option value="node">Node</option>
            <option value="express">Express</option>
            <option value="mongodb">MongoDB</option>
          </select>

          <button className="w-full bg-teal-600 text-white py-2 rounded">
            Add Question
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default AddQuestionPage;
