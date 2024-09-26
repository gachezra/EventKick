import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        navigate("/login");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 6) {
      toast.error(
        "Password should be equal or greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register for an EventKick account." />
        <link rel='canonical' href='https://www.eventkick.ke/register' />
      </Helmet>
      <Header />
      <main className="flex items-center justify-center flex-1 px-4 py-8">
        <div className="w-full max-w-md px-4 py-8 mx-4 bg-[#1a1a2e] rounded-lg shadow-xl">
          <div className="flex justify-center">
            <img src={Logo} alt="logo" className="h-12" />
            <h1 className="text-3xl font-bold text-white">Register</h1>
          </div>
          <form className="mt-6 px-6" onSubmit={(event) => handleSubmit(event)}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
              className="w-full p-3 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              className="w-full p-3 mt-4 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="w-full p-3 mt-4 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
              className="w-full p-3 mt-4 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
            />
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="justify-center text-center items-center mx-auto">
              <button
                type="submit"
                className="rounded-full border-2 justify-center border-indigo-600 px-6 pb-[6px] pt-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              >
                Register
              </button>
            </div>
            <span className="block mt-6 text-sm text-center text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-500 hover:text-indigo-600"
              >
                Login
              </Link>
            </span>
          </form>
        </div>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Register;