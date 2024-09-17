import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg'; // Assume Logo is a valid import
import { verifyEmailRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const EmailVerified = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Replace with your actual API call
        const response = await axios.get(`${verifyEmailRoute}/${token}`);
        if (response.status) {
          toast.success('Email verified successfully!');
        } else {
          toast.error('Email verification failed.');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Verify Email</title>
        <meta name='decsription' content='Verify your email.' />
        <link rel='canonical' href='/verify-email' />
      </Helmet>
      <Header />
      <main className="flex items-center justify-center flex-1 px-4 py-8">
        <div className="w-full max-w-md px-4 py-8 mx-4 bg-[#1a1a2e] rounded-lg shadow-xl text-center">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="logo" className="h-12 mr-2" />
            <h1 className="text-2xl font-bold text-white">
              {loading ? 'Verifying Email...' : 'Email Verified'}
            </h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center mt-6">
              <svg
                className="w-8 h-8 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <p className="mt-6 text-lg text-gray-300">
                Your email has been successfully verified!
              </p>
              <div className="flex items-center justify-center mx-auto mt-6 text-center">
                <Link
                  to="/login"
                  className="w-auto px-6 py-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out bg-transparent border-2 border-indigo-600 rounded-full hover:bg-opacity-10 hover:bg-gray-300"
                >
                  Go to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default EmailVerified;
