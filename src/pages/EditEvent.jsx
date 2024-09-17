import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { eventDetailsRoute, updateEventRoute } from '../utils/APIRoutes';
import Map from '../components/Map';
import { Helmet } from 'react-helmet-async';

const EditEvent = ({ eventid }) => {
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${eventDetailsRoute}/${eventid || id}`);
        setEvent(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDate(response.data.date.split('T')[0]);
        setTime(response.data.date.split('T')[1]);
        setLocation(response.data.location);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching event details:", err);
      }
    };
    fetchEventDetails();
  }, [eventid, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(`${updateEventRoute}/${eventid || id}`, {
        title,
        description,
        date: `${date}T${time}`,
        location,
      });
      console.log('Event updated:', response.data);
      navigate(`/events/${eventid || id}`);
    } catch (err) {
      setError(err.message);
      console.error('Error updating event:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Edit your event</title>
        <meta name='description' content='Edit your event.' />
        <link rel='canonical' href='/edit-event' />
      </Helmet>
      <Header />
      <div className="container mx-auto flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
        <p className="mb-4">
          Follow the instructions below to edit your event:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li>Modify the title of your event.</li>
          <li>Update the detailed description of the event.</li>
          <li>Change the date and time for the event.</li>
          <li>Update the location where the event will be held.</li>
          <li>Click the "Update" button to save changes.</li>
        </ol>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {event ? (
          <form onSubmit={handleSubmit} className="bg-[#1e1e36] p-6 rounded-md shadow-md">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <div className="flex mb-4 space-x-4">
              <div className="w-1/2">
                <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
            <Map location={location}/>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-md mt-3 transition duration-300"
            >
              Update
            </button>
          </form>
        ) : (
          <div className="text-center mt-4">Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditEvent;
