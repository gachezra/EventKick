import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { getApprovedEventsRoute } from '../utils/APIRoutes';

const EventsYouMightLike = ({ currentEventId, currentEventLocation }) => {
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedEvents = async () => {
      try {
        const response = await axios.get(getApprovedEventsRoute);
        const currentDate = new Date();
        const filteredEvents = response.data
          .filter(event => event._id !== currentEventId && event.location === currentEventLocation && new Date(event.startDate) > currentDate)
          .slice(0, 3); // Get up to 3 related events
        setRelatedEvents(filteredEvents);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching related events:", err);
      }
    };
    fetchRelatedEvents();
  }, [currentEventId, currentEventLocation]);

  if (error) {
    return (
      <div className="bg-[#1e1e36] p-6 mt-3 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Events You Might Also Like</h2>
        <div className="text-indigo-400">Error loading related events: {error}</div>
      </div>
    );
  }

  if (relatedEvents.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#1e1e36] p-6 mt-3 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Events You Might Also Like</h2>
      <div className="grid grid-cols-1">
        {relatedEvents.map(event => (
          <EventCard event={event} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link 
          to="/events" 
          className="text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          See More Events
        </Link>
      </div>
    </div>
  );
};

export default EventsYouMightLike;