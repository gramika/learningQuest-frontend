import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../components/Header";
import emptyGif from "../../assets/noData.png";
import { getQuizHistoryAPI } from "../../services/allAPI";

const QuizHistoryPage = () => {

  // ✅ state for quiz attempts
  const [attempts, setAttempts] = useState([]);

  // ✅ get token
  const token = JSON.parse(sessionStorage.getItem("token"));

  // ✅ request header
  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  // ✅ fetch quiz history
  useEffect(() => {
    getQuizHistoryAPI(reqHeader).then((res) => {
      if (res.status === 200) {
        setAttempts(res.data);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 heading text-[#008080]">
          Quizzes Attempted So Far...
        </h1>

        {attempts.length === 0 ? (
          <div className="text-center text-gray-500">
            <img
              src={emptyGif}
              alt="No attempts"
              className="mx-auto w-[30%] mb-4"
            />
            <p className="text-[#044a21] font-bold">
              You haven’t attempted any quizzes yet!
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col">
            {attempts.map((attempt, index) => {
              const percentage = Math.round(
                (attempt.score / attempt.total) * 100
              );

              return (
                <div
                  key={index}
                  className="bg-green-50 shadow-md rounded-xl p-6 border hover:shadow-lg transition-all hover:scale-105 mt-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-2 capitalize text-green-600">
                      {attempt.topic}
                    </h2>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Score:</span>{" "}
                      {attempt.score} / {attempt.total}
                    </p>
                  </div>

                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Date:</span> {attempt.date}
                  </p>

                  {/* ✅ progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-bold text-green-700 mt-1 text-right">
                      {percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default QuizHistoryPage;
