import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("token", data.token);
        if (data.user.avatarImage){
          localStorage.setItem('isAvatarImageSet', true)
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
        } else {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
        }
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
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
        <title>Login</title>
        <meta name="description" content="Login to your account to get tickets and view your history." />
        <link rel='canonical' href='https://www.eventkick.ke/login' />
      </Helmet>
      <Header />
      <main className="flex items-center justify-center flex-1 px-4 py-8">
        <div className="w-full max-w-md px-4 py-8 mx-4 bg-[#1a1a2e] rounded-lg shadow-xl">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="logo" className="h-12 mr-2" />
            <h1 className="text-2xl font-bold text-white">Login</h1>
          </div>
          <form className="mt-6 px-6" action="" onSubmit={(event) => handleSubmit(event)}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
              className="w-full p-3 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="w-full p-3 mt-4 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center justify-center mx-auto mt-4 text-center">
              <button
                type="submit"
                className="w-auto px-6 py-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out bg-transparent border-2 border-indigo-600 rounded-full hover:bg-opacity-10 hover:bg-gray-300 "
              >
                Login
              </button>
            </div>
            <span className="block mt-6 text-sm text-center text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-500 hover:text-indigo-600"
              >
                Register
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

export default Login;
