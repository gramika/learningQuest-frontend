import React, { useEffect, useState } from "react";
import logo from "../../assets/logoNew.png";
import { Link } from "react-router-dom";
import { getAdminDashboardStatsAPI } from "../../services/allAPI";
import { toast } from "react-toastify";

const HeaderAdmin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalNotes: 0,
    pendingReports: 0,
  });

  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getAdminDashboardStatsAPI(reqHeader);

    if (result.status === 200) {
      setStats(result.data);
    } else {
      toast.error("Failed to load dashboard stats");
    }
  };

  return (
    <header className="flex justify-between items-center bg-[#008080] px-4 py-2">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-20 rounded-full" />
        <h1 className="text-2xl text-amber-300 font-bold hidden md:block">
          ADMIN DASHBOARD
        </h1>
      </div>

      {/* Stats */}
      <nav className="hidden lg:flex items-center gap-5">
        <div className="grid grid-cols-3 gap-6">
          <div className="border border-white rounded-xl px-6 py-3 text-center">
            <p className="text-white">
              Registered Users:{" "}
              <span className="text-blue-300 text-xl font-bold">
                {stats.totalUsers}
              </span>
            </p>
          </div>

          <div className="border border-white rounded-xl px-6 py-3 text-center">
            <p className="text-white">
              Uploaded Notes:{" "}
              <span className="text-green-400 text-xl font-bold">
                {stats.totalNotes}
              </span>
            </p>
          </div>

          <div className="border border-white rounded-xl px-6 py-3 text-center">
            <p className="text-white">
              Pending Reports:{" "}
              <span className="text-red-400 text-xl font-bold">
                {stats.pendingReports}
              </span>
            </p>
          </div>
        </div>
      </nav>

      {/* Logout */}
      <Link to="/login">
        <button
          onClick={() => sessionStorage.clear()}
          className="bg-white text-[#008080] px-4 py-2 rounded-xl font-semibold hover:bg-gray-100"
        >
          Logout
        </button>
      </Link>
    </header>
  );
};

export default HeaderAdmin;
