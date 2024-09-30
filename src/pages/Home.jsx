import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import { getApprovedEventsRoute, popularEventsRoute, upcomingEventsRoute } from '../utils/APIRoutes';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [allEventsResponse, popularEventsResponse, upcomingEventsResponse] = await Promise.all([
          axios.get(getApprovedEventsRoute),
          axios.get(popularEventsRoute),
          axios.get(upcomingEventsRoute),
        ]);
    
        const currentDate = new Date();
    
        const filteredEvents = allEventsResponse.data
          .filter(event => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
    
        setEvents(filteredEvents.slice(0, 10));
        setPopularEvents(popularEventsResponse.data);
        setUpcomingEvents(upcomingEventsResponse.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const SkeletonEventCard = ({ event }) => (
    <div className="w--full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 md:p-2 lg:p-2 xl:p-2">
      <div className="bg-[#1e1e36] rounded-lg overflow-hidden shadow-lg">
        <div className="w-full h-48 bg-gray-700 animate-pulse" />
        <div className="p-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-700 rounded animate-pulse" />
        </div>
        {/* Hidden SEO content */}
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

  const SkeletonEventList = ({ events, limit = events.length }) => (
    <div className="flex flex-wrap justify-center mx-4">
      {events.slice(0, limit).map((event, index) => (
        <SkeletonEventCard key={index} event={event} />
      ))}
    </div>
  );

  // Generate placeholder events for today
  const generatePlaceholderEvents = (count = 5) => {
    const today = new Date();
    return Array(count).fill().map((_, i) => ({
      _id: `placeholder-${i}`,
      title: `Event ${i + 1} for ${today.toDateString()}`,
      description: `This is a placeholder description for Event ${i + 1} happening today.`,
      date: today.toISOString(),
      location: 'Various locations in Kenya',
      isPaid: Math.random() > 0.5,
      ticketPrice: Math.floor(Math.random() * 1000) + 100
    }));
  };

  const placeholderEvents = generatePlaceholderEvents(10);

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>EventKick - Top Events in Mombasa Today</title>
        <meta name='description' content={`Discover the hottest events in Kenya today, ${new Date().toDateString()}. From concerts to festivals, find your perfect event on EventKick!`} />
        <link rel='canonical' href='https://www.eventkick.ke/' />
        <meta name="keywords" content={`events today, ${new Date().toDateString()} events, Nairobi events, Mombasa events, Kenya concerts, festivals today`} />
        <meta property="og:title" content={`Top Events in Mombasa Today - ${new Date().toDateString()}`} />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 flex-grow">
        {error ? (
          <div className="text-red-500 text-center my-4">{error}</div>
        ) : (
          <>
            <section className="my-12 text-center">
              <h1 className="text-xl font-extrabold">Welcome to EventKick!</h1>
              <hr className="w-[20%] mx-auto mb-4"/>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                Your one-stop platform for discovering the best events around you. Want somewhere to go, we got you!
              </p>
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold text-center">What's Trending Now</h2>
              <hr className="w-[15%] mx-auto mb-4"/>
              <p className="text-lg text-center mb-6">Dive into the hottest events everyone is buzzing about. Don't miss out on the action!</p>
              {loading ? <SkeletonEventList events={placeholderEvents} limit={3} /> : <EventList events={popularEvents} />}
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold text-center">Upcoming Experiences</h2>
              <hr className="w-[16%] mx-auto mb-4"/>
              <p className="text-lg text-center mb-6">Get ready for exciting events coming your way. Mark your calendar and be part of something amazing.</p>
              {loading ? <SkeletonEventList events={placeholderEvents} limit={3} /> : <EventList events={upcomingEvents}/>}
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold mb-4 text-center">Create Your Own Event</h2>
              <p className="text-lg text-center mb-6">
                Have an event to share? Let the world know! Simply sign up, provide the details, and once approved, your event will be featured on our platform.
                We post for free!
              </p>
              <div className="text-center mt-6">
                <Link to="/plan" className="text-indigo-400 hover:underline text-lg">
                  Post Your Event Now
                </Link>
              </div>
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold text-center">Explore All Events</h2>
              <hr className="w-[13%] mx-auto mb-4"/>
              <p className="text-lg text-center mb-6">From music festivals to tech meetups, there's something for everyone. Find your perfect event below.</p>
              {loading ? <SkeletonEventList events={placeholderEvents} /> : <EventList events={events} />}
              <div className="text-center mt-6">
                <Link to="/events" className="text-indigo-400 hover:underline text-lg">
                  View All Events
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;