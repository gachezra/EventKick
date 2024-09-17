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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [allEventsResponse, popularEventsResponse, upcomingEventsResponse] = await Promise.all([
          axios.get(getApprovedEventsRoute),
          axios.get(popularEventsRoute),
          axios.get(upcomingEventsRoute)
        ]);
        setEvents(allEventsResponse.data.slice(0, 10));
        setPopularEvents(popularEventsResponse.data);
        setUpcomingEvents(upcomingEventsResponse.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>EventKick</title>
        <meta name='description' content="EventKick is Kenya's leading event management platform. Discover, plan, and attend exciting events across Kenya. Join us for unforgettable experiences!" />
        <link rel='canonical' href='/' />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 flex-grow">
        {error ? (
          <div className="text-red-500 text-center my-4">{error}</div>
        ) : (
          <>
            {/* <div className="bg-yellow-500 text-black py-2 px-4 text-center font-bold mb-8 rounded">
              <p>Great news! You can now pay for your tickets using <span className="underline">Mpesa</span>. Get your tickets quickly and easily!</p>
            </div> */}
            <section className="my-12 text-center">
              <h1 className="text-2xl font-extrabold">Welcome to EventKick!</h1>
              <hr className="w-[20%] mx-auto mb-4"/>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                Your one-stop platform for discovering the best events around you. From electrifying concerts to insightful conferences, and everything in between—explore, enjoy, and make memories that last!
              </p>
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold text-center">What's Trending Now</h2>
              <hr className="w-[15%] mx-auto mb-4"/>
              <p className="text-lg text-center mb-6">Dive into the hottest events everyone is buzzing about. Don't miss out on the action!</p>
              <EventList events={popularEvents} />
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold text-center">Upcoming Experiences</h2>
              <hr className="w-[16%] mx-auto mb-4"/>
              <p className="text-lg text-center mb-6">Get ready for exciting events coming your way. Mark your calendar and be part of something amazing.</p>
              <EventList events={upcomingEvents}/>
            </section>
            <section className="my-12">
              <h2 className="text-xl font-bold mb-4 text-center">Create Your Own Event</h2>
              <p className="text-lg text-center mb-6">
                Have an event to share? Let the world know! Simply sign up, provide the details, and once approved, your event will be featured on our platform.
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
              <EventList events={events} />
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