import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import { getApprovedEventsRoute } from '../utils/APIRoutes';
import { Helmet } from 'react-helmet-async';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(getApprovedEventsRoute);
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Events</title>
        <meta name='description' content='Get to view all the available events on your prefered location.' />
        <link rel='canonical' href='/events' />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 flex-grow font-s">
        <SearchBar onSearch={setSearchTerm} placeHolder={'Search events...'} />
        {error ? (
          <div className="text-red-500 text-center my-4">{error}</div>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;
