import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { getMyCoursesAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  fetchMyCourses();
}, []);

const fetchMyCourses = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  const result = await getMyCoursesAPI(reqHeader);

  if (result.status === 200) {
    setCourses(result.data);
  }
};

  return (
    <>
      <Header />

      <div className="min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          My Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven't purchased any courses yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-5 rounded shadow"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {course.title}
                </h2>
                <p className="mb-2">{course.description}</p>
                <button
                  onClick={() =>
                    navigate(`/user/course/${course._id}`)
                  }
                  className="bg-teal-600 text-white px-4 py-2 rounded"
                >
                  View Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyCoursesPage;
