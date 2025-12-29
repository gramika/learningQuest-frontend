import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import {
  addCourseAdminAPI,
  getSingleCourseAdminAPI,
  updateCourseAdminAPI,
} from "../../services/allAPI";
import "react-toastify/dist/ReactToastify.css";

const AddCoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // detect edit mode

  const [isEditMode, setIsEditMode] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    quizTopic: "",
    lessons: [{ title: "", type: "video", content: "" }],
  });

  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null;

  // 🔹 LOAD COURSE IF EDIT MODE
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchCourse();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchCourse = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getSingleCourseAdminAPI(id, reqHeader);

      if (result.status === 200) {
        setCourseData({
          title: result.data.title,
          description: result.data.description,
          category: result.data.category,
          price: result.data.price,
          quizTopic: result.data.quizTopic,
          lessons: result.data.lessons?.length
            ? result.data.lessons
            : [{ title: "", type: "video", content: "" }],
        });
      } else {
        toast.error("Failed to load course");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...courseData.lessons];
    updatedLessons[index][field] = value;
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const addLesson = () => {
    setCourseData({
      ...courseData,
      lessons: [
        ...courseData.lessons,
        { title: "", type: "video", content: "" },
      ],
    });
  };

  const removeLesson = (index) => {
    const updatedLessons = courseData.lessons.filter(
      (_, i) => i !== index
    );
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Admin not authenticated");
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let result;

      if (isEditMode) {
        result = await updateCourseAdminAPI(id, courseData, reqHeader);
      } else {
        result = await addCourseAdminAPI(courseData, reqHeader);
      }

      if (result.status === 200) {
        toast.success(
          isEditMode ? "Course updated successfully" : "Course added successfully"
        );
        setTimeout(() => {
          navigate("/admin/manageCourses");
        }, 1200);
      } else {
        toast.error("Action failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div className="min-h-screen bg-green-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-teal-700 mb-6">
            {isEditMode ? "Edit Course" : "Add New Course"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={courseData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Course Description"
              value={courseData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={courseData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={courseData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="quizTopic"
              placeholder="Quiz Topic"
              value={courseData.quizTopic}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <h2 className="text-xl font-semibold text-teal-700">
              Lessons
            </h2>

            {courseData.lessons.map((lesson, index) => (
              <div key={index} className="border p-3 rounded space-y-2">
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(index, "title", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />

                <select
                  value={lesson.type}
                  onChange={(e) =>
                    handleLessonChange(index, "type", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="pdf">PDF</option>
                </select>

                <input
                  type="text"
                  placeholder="Content (URL or file name)"
                  value={lesson.content}
                  onChange={(e) =>
                    handleLessonChange(index, "content", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />

                {courseData.lessons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLesson(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove Lesson
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addLesson}
              className="text-teal-700 text-sm"
            >
              + Add another lesson
            </button>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
              >
                {isEditMode ? "Update Course" : "Save Course"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default AddCoursePage;
