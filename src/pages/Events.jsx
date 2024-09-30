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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(getApprovedEventsRoute);
        const events = response.data;
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const filteredEvents = events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today;
        });
    
        setEvents(filteredEvents);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SkeletonEventCard = ({ event }) => (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 md:p-2 lg:p-2 xl:p-2">
      <div className="bg-[#1e1e36] rounded-lg overflow-hidden shadow-lg">
        <div className="w-full h-48 bg-gray-700 animate-pulse" />
        <div className="p-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="sr-only">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
          <p>Venue: {event.location}</p>
          <p>Price: {event.isPaid ? `Ksh.${event.ticketPrice}` : 'Free'}</p>
        </div>
      </div>
    </div>
  );

  const SkeletonEventList = ({ count = 10 }) => (
    <div className="flex flex-wrap -mx-4">
      {Array(count).fill().map((_, index) => (
        <SkeletonEventCard key={index} event={{
          title: `Loading Event ${index + 1}`,
          description: 'Event details are loading...',
          date: new Date().toISOString(),
          location: 'Loading location...',
          isPaid: false,
          ticketPrice: 0
        }} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Events - Explore Upcoming Events in Kenya</title>
        <meta name='description' content='Discover and explore a wide range of upcoming events in Kenya. From concerts to festivals, find your perfect event on EventKick!' />
        <link rel='canonical' href='https://www.eventkick.ke/events' />
        <meta name="keywords" content="Kenya events, upcoming events, concerts, festivals, Nairobi events, Mombasa events" />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 flex-grow font-s">
        <SearchBar onSearch={setSearchTerm} placeHolder={'Search events...'} />
        {error ? (
          <div className="text-red-500 text-center my-4">{error}</div>
        ) : loading ? (
          <SkeletonEventList count={12} />
        ) : (
          <EventList events={filteredEvents} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;