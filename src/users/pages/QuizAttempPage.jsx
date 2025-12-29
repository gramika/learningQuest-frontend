import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsByTopicAPI, saveQuizAPI } from "../../services/allAPI";
import loading from "../../assets/load.gif";

const QuizAttemptPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const reqHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
  if (!topic) return;

  // ✅ normalize topic
  const normalizedTopic = topic.toLowerCase();

  getQuestionsByTopicAPI(normalizedTopic)
    .then((res) => {
      console.log("Quiz API response:", res.data);

      if (res.status === 200) {
        const shuffled = res.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setQuestions(shuffled);
      }
    })
    .catch((err) => {
      console.error("Quiz fetch error", err);
    })
    .finally(() => setLoadingData(false));
}, [topic]);


  const handleNext = async () => {
    const isCorrect =
      selectedOption === questions[currentIndex].correctAnswer;

    const finalScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(finalScore);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setIsCompleted(true);
      try {
        await saveQuizAPI(
          { topic, score: finalScore, total: questions.length },
          reqHeader
        );
      } catch (err) {
        console.error("Failed to save quiz history");
      }
    }
  };

  if (loadingData) {
    return (
      <div className="mt-20">
        <img src={loading} className="w-16 mx-auto" />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">No questions available for this topic.</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h1>
        <p className="text-xl mb-4">
          Score: {score} / {questions.length}
        </p>
        <button
          onClick={() => navigate("/user/quiz")}
          className="bg-teal-600 text-white px-6 py-2 rounded"
        >
          Back to Topics
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl">
        <h2 className="text-lg font-bold mb-2">
          Question {currentIndex + 1} / {questions.length}
        </h2>

        <p className="font-semibold mb-4">
          {currentQuestion.question}
        </p>

        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOption(opt)}
            className={`block w-full text-left p-2 mb-2 border rounded
              ${
                selectedOption === opt
                  ? "bg-teal-100 border-teal-500"
                  : ""
              }`}
          >
            {opt}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="mt-4 w-full bg-teal-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizAttemptPage;
