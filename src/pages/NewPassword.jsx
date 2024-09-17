import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg'; // Assume Logo is a valid import
import axios from 'axios';
import { resetPasswordRoute } from '../utils/APIRoutes';
import { Helmet } from 'react-helmet-async';

const NewPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
        }
        if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
        }
        const response = await axios.post(`${resetPasswordRoute}/${token}`,{
            password
        });
        if (!response.data.status) {
            toast.error('Failed to send password reset link. Please try again.');
            return;
        } else {
            toast.success('Password has been reset successfully!');
        }
        };

    return (
        <div className="flex flex-col min-h-screen bg-[#131324] text-white">
            <Helmet>
                <title>New Password</title>
                <meta name='description' content='Set your new password.' />
                <link rel='canonical' href='/reset-password' />
            </Helmet>
            <Header />
            <main className="flex items-center justify-center flex-1 px-4 py-8">
                <div className="w-full max-w-md px-4 py-8 mx-4 bg-[#1a1a2e] rounded-lg shadow-xl">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="logo" className="h-12 mr-2" />
                    <h1 className="text-2xl font-bold text-white">Set New Password</h1>
                </div>
                <form className="mt-6 px-6" action="" onSubmit={handleSubmit}>
                    <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                    <input
                    type="password"
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 mt-4 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex items-center justify-center mx-auto mt-4 text-center">
                    <button
                        type="submit"
                        className="w-auto px-6 py-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out bg-transparent border-2 border-indigo-600 rounded-full hover:bg-opacity-10 hover:bg-gray-300"
                    >
                        Reset Password
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

export default NewPassword;
