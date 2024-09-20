import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholderImage from '../assets/placeholder-image.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { allEventsRoute, approveEventRoute, disapproveEventRoute, deleteEventRoute, getUserDetailsRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (!currentUser) {
          navigate('/');
        } else {
          const userId = currentUser._id;
          const userResponse = await axios.get(`${getUserDetailsRoute}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const user = userResponse.data.user;

          if (user.role !== 'admin') {
            navigate('/');
          } else {
            // Only fetch events if the user is an admin
            fetchEvents();
          }
        }
      } catch (error) {
        console.error(error);
        setError("Error checking user status");
      }
    };

    checkStatus();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const allEventsResponse = await axios.get(allEventsRoute);
      const allEvents = allEventsResponse.data;

      setAllEvents(allEvents);
      setApprovedEvents(allEvents.filter(event => event.status === 'approved'));
      setPendingEvents(allEvents.filter(event => event.status === 'pending'));
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      await axios.put(`${approveEventRoute}/${eventId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEvents();
    } catch (err) {
      setError("Failed to approve event");
    }
  };

  const handleDisapprove = async (eventId) => {
    try {
      await axios.put(`${disapproveEventRoute}/${eventId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEvents();
    } catch (err) {
      setError("Failed to disapprove event");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`${deleteEventRoute}/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEvents();
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  const renderEventList = (events, showActions = false) => (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event._id} className="p-4 bg-[#2a2a4e] rounded-md">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto md:w-auto md:h-[600px] mb-6 rounded-md p-2 md:mx-6 shadow-lg"
              onError={(e) => e.target.src = placeholderImage}
            />
          )}
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <p>Status: {event.status}</p>
          {showActions && (
            <div className="mt-2 space-x-2">
              {event.status !== 'approved' && (
                <button 
                  onClick={() => handleApprove(event._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
              )}
              {event.status !== 'pending' && (
                <button 
                  onClick={() => handleDisapprove(event._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Disapprove
                </button>
              )}
              <button 
                onClick={() => handleDelete(event._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Header />
      <div className="container mx-auto flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-8">
            <section className="bg-[#1e1e36] p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4">Pending Events ({pendingEvents.length})</h2>
              {renderEventList(pendingEvents, true)}
            </section>
            <section className="bg-[#1e1e36] p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4">Approved Events ({approvedEvents.length})</h2>
              {renderEventList(approvedEvents, true)}
            </section>
            <section className="bg-[#1e1e36] p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4">All Events ({allEvents.length})</h2>
              {renderEventList(allEvents, true)}
            </section>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
