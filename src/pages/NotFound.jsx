import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>NotFound</title>
        <meta name='description' content='Page not found' />
        <link rel='canonical' href='/*' />
      </Helmet>
      <Header />
      <div className="container mx-auto flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Page Not Found</p>
        <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;