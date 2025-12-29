import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { googleLoginAPI, loginAPI } from "../services/allAPI";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import Profile from "../users/pages/Profile";

const Auth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }

    try {
      const result = await loginAPI({ email, password });
      console.log(result);
      console.log("LOGIN USER:", result.data.existingUser);


      if (result.status === 200) {
        toast.success("Login successful!");
        // store the existing user to session storage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        // store the token to session storage
        sessionStorage.setItem("token", JSON.stringify(result.data.token))


        setFormData({
          email: "",
          password: "",
        });

        // navigate after a short delay to let toast show (optional)
        setTimeout(() => {
          if (result.data.existingUser.email === "admin@gmail.com") {
            navigate("/admin",{ replace: true });
          } else {
            navigate("/user",{ replace: true });
          }
        }, 1000);

      } else if (result.status === 401) {
        // backend should send a message in response.data
        toast.warning(result.response?.data || "Unauthorized");
        setFormData({
          email: "",
          password: "",
        });
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  // handle google login
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);
    const result = await googleLoginAPI({ username: details.name, email: details.email, password: "googlepswd", profile: details.picture })
    console.log(result);
    if (result.status == 200) {
      toast.success("login successfull")
      // store the existing user to session storage
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      // store the token to session storage
      sessionStorage.setItem("token", JSON.stringify(result.data.token))


      setFormData({
        email: "",
        password: "",
      });

      // navigate after a short delay to let toast show (optional)
      setTimeout(() => {
        // change destination as needed
        if (result.data.existingUser.email == "admin@gmail.com") {
          navigate("/admin",{ replace: true });
        }
        else {
          navigate("/user",{ replace: true });
        }

      }, 1500);
    }
    else {
      toast.error("something went wrong !!!")
    }

  }


  return (
    <div
      id="authPage"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      {/* single centered column to avoid accidental overlaps */}
      <div className="w-full max-w-4xl px-4 flex justify-center">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="font-extrabold my-5 text-2xl sm:text-3xl md:text-4xl text-[#FAFAFA] heading text-center">
            Learning Quest
          </h1>

          {/* Ensure this container is stacked above anything else */}
          <div
            className="w-[90%] sm:w-[400px] md:w-[500px] bg-[#1b385d] p-6 rounded-xl shadow-2xl"
            style={{ position: "relative", zIndex: 10 }}
          >
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
              onSubmit={handleLogin}
            >
              <div className="border-2 border-teal-900 flex justify-center items-center rounded-2xl w-[70px] h-[50px]">
                <FontAwesomeIcon icon={faUser} className="text-white text-4xl" />
              </div>

              <h1 className="text-white mt-6 text-2xl sm:text-3xl font-bold heading">
                User Login
              </h1>

              <div className="mb-3 w-full mt-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  className="p-2 rounded placeholder-gray-600 bg-white w-full"
                  autoComplete="email"
                />
              </div>

              <div className="mb-3 w-full mt-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                  className="p-2 rounded placeholder-gray-600 bg-white w-full text-black"
                  autoComplete="current-password"
                />
              </div>

              <div className="mb-5 w-full flex justify-end">
                <p className="text-white underline text-xs cursor-pointer">
                  Forgot password?
                </p>
              </div>

              <div className="mb-2 w-full">
                <button
                  type="submit"
                  className="bg-[#108ff7] text-white w-full p-3 rounded hover:bg-[#0c7ed1]"
                >
                  Login
                </button>
              </div>

              <p className="text-white my-2">------------or-----------</p>

              <div className="mb-5 mt-3 w-full flex items-center justify-center">
                {/* <button
                  type="button"
                  className="bg-white text-black w-full p-3 rounded"
                >
                  Sign in with Google
                </button> */}
                <GoogleLogin width={"250px"}
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    // for logging in
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              </div>

              <p className="text-white">
                Are you a new user?{" "}
                <Link to={"/register"} className="underline">
                  Register...
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

export default Auth;
