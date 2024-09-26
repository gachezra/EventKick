import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg';
import axios from 'axios';
import { forgotPasswordRoute } from '../utils/APIRoutes';
import { Helmet } from 'react-helmet-async';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(forgotPasswordRoute,{
      email
    });
    if (!response.data.status) {
      toast.error('Failed to send password reset link. Please try again.');
      return;
    } else {
      // Notify success or error
      toast.success('Password reset link sent to your email!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Reset your password</title>
        <meta name='description' content='Reset your password.' />
        <link rel='canonical' href='https://www.eventkick.ke/forgot-password' />
      </Helmet>
      <Header />
      <main className="flex items-center justify-center flex-1 px-4 py-8">
        <div className="w-full max-w-md px-4 py-8 mx-4 bg-[#1a1a2e] rounded-lg shadow-xl">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="logo" className="h-12 mr-2" />
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          </div>
          <form className="mt-6 p-6" action="" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <div className="flex items-center justify-center mx-auto mt-4 text-center">
              <button
                type="submit"
                className="w-auto px-6 py-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out bg-transparent border-2 border-indigo-600 rounded-full hover:bg-opacity-10 hover:bg-gray-300"
              >
                Send Reset Link
              </button>
            </div>
            <span className="block mt-6 text-sm text-center text-gray-300">
              Remembered your password?{" "}
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

export default ResetPassword;
