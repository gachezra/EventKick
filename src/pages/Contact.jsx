import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Contact Us</title>
        <meta name='description' content="We'd love to hear from you! Whether you have questions about our events, how to post your event, feedback, or just want to say hello, feel free to reach out to us."/>
        <link rel='canonical' href='https://www.eventkick.ke/contact' />
      </Helmet>
      <Header />
      <div className="container mx-auto flex-grow p-4">
        <section className="my-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg mb-6">We'd love to hear from you! Whether you have questions about our events, how to post your event, feedback, or just want to say hello, feel free to reach out to us.</p>
        </section>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <form onSubmit={handleSubmit} className="bg-[#1e1e36] p-6 rounded-md shadow-md md:w-1/2">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <div className="justify-center text-center items-center mx-auto">
              <button
                type="submit"
                className="rounded-full border-2 justify-center border-indigo-600 px-6 pb-[6px] pt-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex flex-col md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-2xl text-blue-600">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-2xl text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-2xl text-pink-600">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-2xl text-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
