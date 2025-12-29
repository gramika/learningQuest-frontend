import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faLock,
  faTrash,
  faRightFromBracket,
  faTrophy,
  faBookOpen,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import studentImg from "../../assets/student.jpg";
import CertificateCard from "../../components/CertificateCard";
import ChangePassword from "../components/ChangePassword";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 🔥 FIXED: Proper stats calculation
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const quizAttempts =
      JSON.parse(localStorage.getItem("quizAttempts")) || [];
    const certificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const totalQuizzes = quizAttempts.filter(
      (a) => a.email === currentUser.email
    ).length;

    const completedCourses = certificates.filter(
      (c) => c.username === currentUser.username
    ).length;

    setUser({
      username: currentUser.username,
      email: currentUser.email,
      role: currentUser.role || "User",
      joinedDate: "Oct 2025",
      bio:
        currentUser.bio ||
        "Aspiring MEARN Developer | Learning one step at a time",
      stats: {
        quizzes: totalQuizzes,
        courses: completedCourses,
        certificates: completedCourses,
      },
    });
  }, [navigate]);

  const handleSave = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setShowEditModal(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cover Banner */}
      <div className="relative w-full h-48 bg-linear-to-r from-teal-500 via-blue-500 to-teal-600 rounded-xl shadow-lg mb-16">
        <div className="absolute -bottom-16 left-10 flex items-center space-x-5">
          <img
            src={studentImg}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {user.username}
            </h1>
            <p className="text-gray-700 font-medium pt-2">{user.email}</p>
            <p className="text-sm text-gray-600 font-semibold">
              Joined {user.joinedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 space-y-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <FontAwesomeIcon
              icon={faBookOpen}
              className="text-teal-600 text-3xl mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-600">
              {user.stats.courses}
            </h2>
            <p className="text-gray-600">Courses Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-yellow-500 text-3xl mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-600">
              {user.stats.quizzes}
            </h2>
            <p className="text-gray-600">Quizzes Attempted</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <FontAwesomeIcon
              icon={faCertificate}
              className="text-green-500 text-3xl mb-2"
            />
            <h2 className="text-3xl font-bold text-blue-600">
              {user.stats.certificates}
            </h2>
            <p className="text-gray-600">Certificates Earned</p>
          </div>
        </div>

        {/* About */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-teal-900">
            About
          </h2>
          <p className="text-gray-700">{user.bio}</p>
        </div>

        {/* Certificates */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-teal-900">
            My Certificates
          </h2>

          {(
            JSON.parse(localStorage.getItem("certificates")) || []
          ).filter((cert) => cert.username === user.username).length ? (
            <div className="grid md:grid-cols-2 gap-6">
              {JSON.parse(localStorage.getItem("certificates"))
                .filter((cert) => cert.username === user.username)
                .map((cert, index) => (
                  <CertificateCard
                    key={index}
                    username={cert.username}
                    courseTitle={cert.courseTitle}
                    date={cert.date}
                    compact={true}
                  />
                ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">
              No certificates earned yet.
            </p>
          )}
        </div>

        {/* Account Controls */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-wrap justify-around gap-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 text-blue-600"
          >
            <FontAwesomeIcon icon={faPen} /> Edit Profile
          </button>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 text-teal-600"
          >
            <FontAwesomeIcon icon={faLock} /> Change Password
          </button>

          <button
            onClick={async () => {
              const result = await Swal.fire({
                title: "Are you sure?",
                text: "Your account will be permanently deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
              });

              if (result.isConfirmed) {
                localStorage.clear();
                navigate("/register");
              }
            }}
            className="flex items-center gap-2 text-red-600"
          >
            <FontAwesomeIcon icon={faTrash} /> Delete Account
          </button>

          <Link to="/login">
            <button className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditProfile
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}

      {showPasswordModal && (
        <ChangePassword
          user={user}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
};

export default Profile;
