import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import bgImage from '../../assets/adminBg.jpg'

const AdminDashboard = () => {

  const admin = [
    { title: "Manage Users", desc: "View and manage all registered users", path: "/admin/manageUsers", text: "text-blue-700", border: "border-blue-500", color: "bg-linear-to-r from-indigo-200 via-blue-100 to-blue-500" },
    { title: "Manage Notes", desc: "See all uploaded notes and take actions", path: "/admin/manageNotes", text: "text-green-700", border: "border-green-500", color: "bg-linear-to-r from-teal-200 via-green-100 to-green-500" },
    { title: "Manage Reports", desc: "Review and resolve reported notes", path: "/admin/manageReports", text: "text-red-700", border: "border-red-500", color: "bg-linear-to-r from-red-200 via-red-100 to-red-500" },
    { title: "Manage Courses", desc: "add and manage courses", path: "/admin/manageCourses", text: "text-yellow-700", border: "border-yellow-500", color: "bg-linear-to-r from-yellow-200 via-yellow-100 to-yellow-500" },
    { title: "Manage Questions", desc: "add and manage questions", path: "/admin/manageQuestions", text: "text-pink-700", border: "border-pink-500", color: "bg-linear-to-r from-pink-200 via-pink-100 to-pink-500" },
    { title: "Manage Messages", desc: "review contact messages", path: "/admin/messages", text: "text-orange-700", border: "border-orange-500", color: "bg-linear-to-r from-orange-200 via-orange-100 to-orange-500" }
  ]

  return (
    <>
      <HeaderAdmin />
      <div className="min-h-screen  py-10 px-4" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: "center", backgroundSize: "cover" }}>
        <h1 className="text-3xl font-bold text-left mb-8 ms-9 text-orange-500 lg:pt-10">
          Welcome Admin
        </h1>

        {/* Navigation Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  lg:pt-10 ">

          {admin.map((data, index) => (
            <Link
              key={index}
              to={data.path}>
              <div className={`bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 text-center border-t-4 ${data.border} ${data.color}`}>
                <h3 className={`text-xl font-semibold mb-2 ${data.text}`}>{data.title}</h3>
                <p className="text-gray-600">{data.desc}</p>
              </div>
            </Link>
          ))
          }
        </div>
      </div>
      <Footer />

    </>
  )
}

export default AdminDashboard