import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editQuestionAPI, getQuestionByIdAPI } from "../../services/allAPI";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const reqHeader = { Authorization: `Bearer ${token}` };

  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    topic: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionByIdAPI(id, reqHeader)
      .then((res) => {
        if (res.status === 200) {
          const q = res.data;
          setForm({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            topic: q.topic,
          });
        }
      })
      .catch(() => {
        toast.error("Failed to load question");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await editQuestionAPI(id, form, reqHeader);

    if (result.status === 200) {
      toast.success("Question updated (pending approval)");
      navigate("/user/myQuestions",{ replace: true });
    } else {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading question...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-10"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-700">
          Edit Question
        </h2>

        <textarea
          className="w-full border p-2 mb-3 rounded"
          value={form.question}
          onChange={(e) =>
            setForm({ ...form, question: e.target.value })
          }
          required
        />

        {form.options.map((opt, i) => (
          <input
            key={i}
            className="w-full border p-2 mb-2 rounded"
            value={opt}
            onChange={(e) => {
              const updated = [...form.options];
              updated[i] = e.target.value;
              setForm({ ...form, options: updated });
            }}
            required
          />
        ))}

        <select
          className="w-full border p-2 mb-3 rounded"
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
          className="w-full border p-2 mb-4 rounded"
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

        <button className="bg-teal-600 hover:bg-teal-700 text-white w-full py-2 rounded-lg">
          Update Question
        </button>
      </form>
      <Footer />
    </>
  );
};

export default EditQuestionPage;
