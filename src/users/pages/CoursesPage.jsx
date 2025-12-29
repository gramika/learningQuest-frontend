import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import {
  getUserCoursesAPI,
  createCheckoutSessionAPI,
  getMyCoursesAPI,
} from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchMyCourses();
  }, []);

  //  Fetch all courses
  const fetchCourses = async () => {
    try {
      const result = await getUserCoursesAPI();
      if (result.status === 200) {
        setCourses(result.data);
      } else {
        toast.error("Failed to load courses");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  //  Fetch purchased courses
 const fetchMyCourses = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  if (!token) return;

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const result = await getMyCoursesAPI(reqHeader);
    if (result.status === 200) {
      setMyCourses(result.data.map(c => c._id));
    }
  } catch (err) {
    console.error(err);
  }
};



  //  Stripe checkout
 const buyCourse = async (courseId) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  if (!token) {
    toast.error("Please login first");
    return;
  }

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  const result = await createCheckoutSessionAPI(
    { courseId },
    reqHeader
  );

  if (result.status === 200) {
    window.location.href = result.data.url;
  }
};


  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
          Available Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">
            No courses available
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isPurchased = myCourses.includes(course._id);

              return (
                <div
                  key={course._id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {course.title}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    {course.description}
                  </p>

                  <p className="font-semibold text-teal-700 mb-4">
                    ₹ {course.price}
                  </p>

                  {isPurchased ? (
                    <button
                      onClick={() =>
                        navigate(`/user/course/${course._id}`)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View Course
                    </button>
                  ) : (
                    <button
                      onClick={() => buyCourse(course._id)}
                      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                      Buy Course
                    </button>
                  )}
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

export default CoursesPage;
