import React, { useState } from "react";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerAPI } from "../services/allAPI";

const Register = () => {
  const navigate = useNavigate();

  // state to store the data from the register form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(formData);

// function to handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.warning("Please fill in all fields!");
    }
    else {
      const result = await registerAPI({ username, email, password })
      console.log(result);
      if(result.status == 200){
        toast.success("Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: ""
      })
      setTimeout(() => {
        navigate("/login",{ replace: true });
      }, 2500) // redirect to login
      }
    // the status code should match the code from backend

      else if(result.status == 401){
        toast.warning(result.response.data)
        setFormData({
        username: "",
        email: "",
        password: ""
      })
      }  
      
    }
  };

  return (
    <div
      id="registerPage"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <div className="grid lg:grid-cols-3 rounded  w-full max-w-4xl px-4">
        <div></div>
        <div></div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-extrabold my-5 text-2xl sm:text-3xl md:text-4xl text-[#FAFAFA] pageHead text-center">
            Learning Quest
          </h1>

          <div className="w-[90%] sm:w-[400px] md:w-[500px] bg-[#1b385d] p-6 rounded-xl shadow-2xl">
            <div className="flex justify-end items-end">
              <Link to={"/"}>
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-3xl text-white hover:text-violet-600"
                />
              </Link>
            </div>

            <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleRegister}
            >
              <div className="border-2 border-teal-900 flex justify-center items-center rounded-2xl w-[70px] h-[50px]">
                <FontAwesomeIcon icon={faUser} className="text-white text-4xl" />
              </div>

              <h1 className="text-white mt-6 text-2xl sm:text-3xl font-bold heading">
                User Registration
              </h1>

              <div className="mb-3 w-full mt-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Username"
                  className="p-2 rounded placeholder-gray-600 bg-white w-full"
                />
              </div>

              <div className="mb-3 w-full mt-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="p-2 rounded placeholder-gray-600 bg-white w-full"
                />
              </div>

              <div className="mb-3 w-full mt-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password"
                  className="p-2 rounded placeholder-gray-600 bg-white w-full"
                />
              </div>

              <div className="mb-2 w-full">
                <button
                  type="submit"
                  className="bg-[#630b66] text-white w-full p-3 rounded hover:bg-[#520a55]"
                >
                  Register
                </button>
              </div>

              <p className="text-white">
                Already a user?{" "}
                <Link to={"/login"} className="underline">
                  Login...
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>
  );
};

export default Register;
