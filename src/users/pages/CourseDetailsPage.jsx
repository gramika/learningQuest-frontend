import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import {getSingleCourseAPI,issueCertificateAPI,} from "../../services/allAPI";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    const token = sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getSingleCourseAPI(id, reqHeader);

      if (result.status === 200) {
        setCourse(result.data);
        setCurrentLesson(result.data.lessons[0]);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Please purchase this course to access it");
        navigate("/user/courses");
      } else {
        toast.error("Failed to load course");
      }
    }
  };

  //  ISSUE CERTIFICATE
  const getCertificate = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  try {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await issueCertificateAPI(
      { courseId: course._id },
      reqHeader
    );

    if (result.status === 200) {
      // save certificates to local storage. for accessing in profile page
      const existingCertificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      const newCertificate = {
        username: currentUser.username,
        courseTitle: course.title,
        date: new Date().toLocaleDateString(),
      };

      localStorage.setItem(
        "certificates",
        JSON.stringify([...existingCertificates, newCertificate])
      );

      toast.success("Certificate generated successfully");
      navigate("/profile");
    }
  } catch (err) {
    toast.error("Failed to generate certificate");
  }
};


  if (!course) {
    return <p className="text-center py-10">Loading course...</p>;
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 py-10 px-6">
        <h1 className="text-3xl font-bold text-center text-teal-800 mb-6">
          {course.title}
        </h1>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-xl font-semibold text-teal-700 mb-3">
              Lessons
            </h2>

            <ul className="space-y-3">
              {course.lessons.map((lesson, index) => (
                <li
                  key={index}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`p-2 rounded-md cursor-pointer ${
                    currentLesson?.title === lesson.title
                      ? "bg-green-200 text-teal-800 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faCircleDot} /> {lesson.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-teal-800 mb-4">
              {currentLesson?.title}
            </h2>

            {currentLesson?.type === "video" && (
              <iframe
                src={currentLesson.content}
                title={currentLesson.title}
                className="w-full h-64 rounded-lg mb-4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            {currentLesson?.type === "article" && (
              <div className="mt-4">
                <p className="text-gray-700 mb-2">
                  This lesson is an article:
                </p>
                <a
                  href={currentLesson.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Read Article
                </a>
              </div>
            )}

            {/* 🎓 CERTIFICATE BUTTON */}
            <div className="mt-6">
              <button
                onClick={getCertificate}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Get Certificate
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetailsPage;
