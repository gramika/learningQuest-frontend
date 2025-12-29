import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import {
  getAdminCoursesAPI,
  deleteCourseAdminAPI,
} from "../../services/allAPI";

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null;

  useEffect(() => {
    if (!token) {
      toast.error("Admin not authenticated");
      return;
    }
    fetchCourses();
    // eslint-disable-next-line
  }, []);

  const fetchCourses = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getAdminCoursesAPI(reqHeader);

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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete course?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await deleteCourseAdminAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Course deleted");
        setCourses((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div className="min-h-screen bg-green-50 py-10 px-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-teal-700">
              Manage Courses
            </h1>

            <button
              onClick={() => navigate("/admin/addCourse")}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Course
            </button>
          </div>

          {courses.length === 0 ? (
            <p className="text-center text-gray-600 mt-10">
              No courses found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-center">
                <thead className="bg-teal-100">
                  <tr>
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Lessons</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2 font-medium">
                        {course.title}
                      </td>
                      <td className="border px-4 py-2">
                        {course.category || "—"}
                      </td>
                      <td className="border px-4 py-2">
                        ₹{course.price}
                      </td>
                      <td className="border px-4 py-2">
                        {course.lessons?.length || 0}
                      </td>
                      <td className="border px-4 py-2 flex justify-center gap-4">
                        <button
                          onClick={() =>
                            navigate(`/admin/editCourse/${course._id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default ManageCoursesPage;
