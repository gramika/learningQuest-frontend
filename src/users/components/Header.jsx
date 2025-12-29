import { faAddressCard, faBars, faPowerOff, faUser, faBookOpen, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logoNew.png";
import userIcon from "../../assets/userIcon.webp";

const Header = () => {
    const navigate = useNavigate();

    // mobile menu
    const [status, setStatus] = useState(false);

    // dropdown
    const [dropDownStatus, setDropDownStatus] = useState(false);

    // auth
    const [token, setToken] = useState("");

    //  FIXED: run once
    useEffect(() => {
        const fetchToken = sessionStorage.getItem("token");
        setToken(fetchToken);
    }, []);

    //  LOGOUT HANDLER
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("currentUser");
        setToken("");
        setDropDownStatus(false);
        navigate("/login", { replace: true });
    };

    return (
        <header className="flex justify-between items-center bg-[#008080] px-4 py-2 relative">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="Learning Quest logo" className="w-20 rounded-full" />
                <h1 className="text-2xl text-[#333333] font-bold hidden md:block">
                    LEARNING QUEST
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-5">
                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-7">
                    <li>
                        <Link to="/" className="text-xl font-extrabold hover:text-white">
                            HOME
                        </Link>
                    </li>
                    {token && (
                        <li>
                            <Link
                                to="/user/courses"
                                className="text-xl font-extrabold hover:text-white"
                            >
                                COURSES
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link to="/contact" className="text-xl font-extrabold hover:text-white">
                            CONTACT
                        </Link>
                    </li>
                </ul>

                {/* Auth Section */}
                {!token ? (
                    <Link to="/login">
                        <button className="px-4 py-2 bg-white font-bold rounded-2xl hover:bg-gray-200">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Login
                        </button>
                    </Link>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setDropDownStatus(!dropDownStatus)}
                            className="flex items-center"
                        >
                            <img src={userIcon} alt="user" className="w-10 h-10 rounded-full" />
                        </button>

                        {dropDownStatus && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
                                <Link
                                    to="/profile"
                                    onClick={() => setDropDownStatus(false)}
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                                    Profile
                                </Link>

                                <Link
                                    to="/user/my-courses"
                                    onClick={() => setDropDownStatus(false)}
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                                    My Courses
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                >
                                    <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                                    Logout
                                </button>

                            </div>
                        )}
                    </div>
                )}

                {/* responsive Icon */}
                <button
                    className="text-2xl md:hidden ml-3"
                    onClick={() => setStatus(!status)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </nav>

            {/* responsive Menu */}
            {status && (
                <ul className="absolute top-full right-4 bg-[#008080] flex flex-col gap-4 p-4 rounded-lg shadow-md md:hidden">
                    <li>
                        <Link to="/" onClick={() => setStatus(false)}>
                            HOME
                        </Link>
                    </li>
                    {token && (
                        <li>
                            <Link
                                to="/user/courses"
                                className="text-xl font-extrabold hover:text-white"
                            >
                                COURSES
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link to="/contact" onClick={() => setStatus(false)}>
                            CONTACT
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default Header;
