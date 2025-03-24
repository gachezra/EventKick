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
          return;
        }
        
        const userResponse = await axios.get(`${getUserDetailsRoute}/${currentUser._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (userResponse.data.user.role !== 'admin') {
          navigate('/');
        } else {
          fetchEvents();
        }
      } catch (err) {
        setError("Error checking user status");
      }
    };

    checkStatus();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(allEventsRoute);
      setAllEvents(data);
      setApprovedEvents(data.filter(event => event.status === 'approved'));
      setPendingEvents(data.filter(event => event.status === 'pending'));
    } catch {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const updateEventStatus = (eventId, newStatus) => {
    setAllEvents(prevEvents => prevEvents.map(event => event._id === eventId ? { ...event, status: newStatus } : event));
    setApprovedEvents(prev => newStatus === 'approved' ? [...prev, allEvents.find(e => e._id === eventId)] : prev.filter(e => e._id !== eventId));
    setPendingEvents(prev => newStatus === 'pending' ? [...prev, allEvents.find(e => e._id === eventId)] : prev.filter(e => e._id !== eventId));
  };

  const handleApprove = async (eventId) => {
    try {
      await axios.put(`${approveEventRoute}/${eventId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      updateEventStatus(eventId, 'approved');
    } catch {
      setError("Failed to approve event");
    }
  };

  const handleDisapprove = async (eventId) => {
    try {
      await axios.put(`${disapproveEventRoute}/${eventId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      updateEventStatus(eventId, 'pending');
    } catch {
      setError("Failed to disapprove event");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`${deleteEventRoute}/${eventId}`, { headers: { Authorization: `Bearer ${token}` } });
      setAllEvents(prev => prev.filter(event => event._id !== eventId));
      setApprovedEvents(prev => prev.filter(event => event._id !== eventId));
      setPendingEvents(prev => prev.filter(event => event._id !== eventId));
    } catch {
      setError("Failed to delete event");
    }
  };

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
            {[['Pending Events', pendingEvents], ['Approved Events', approvedEvents], ['All Events', allEvents]].map(([title, events]) => (
              <section key={title} className="bg-[#1e1e36] p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">{title} ({events.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map(event => (
                    <div key={event._id} className="p-4 bg-[#2a2a4e] rounded-md">
                      <img
                        src={event.image || placeholderImage}
                        alt={event.title}
                        className="w-full h-auto md:w-auto md:h-[600px] mb-6 rounded-md p-2 shadow-lg"
                        onError={(e) => (e.target.src = placeholderImage)}
                      />
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p>{event.description}</p>
                      <p>Date: {new Date(event.date).toLocaleString()}</p>
                      <p>Location: {event.location}</p>
                      <p>Status: {event.status}</p>
                      <div className="mt-2 space-x-2">
                        {event.status !== 'approved' && (
                          <button onClick={() => handleApprove(event._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Approve</button>
                        )}
                        {event.status !== 'pending' && (
                          <button onClick={() => handleDisapprove(event._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Disapprove</button>
                        )}
                        <button onClick={() => handleDelete(event._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
