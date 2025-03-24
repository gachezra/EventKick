import React, { useState, useEffect } from 'react';
import { Clock, MapPin, DollarSign, Image as ImageIcon, Edit, Trash2, Plus } from 'lucide-react';
import { 
  getUserDetailsRoute, 
  allEventsRoute, 
  deleteEventRoute, 
  approveEventRoute, 
  disapproveEventRoute, 
  updateEventRoute 
} from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (!currentUser) {
          navigate('/');
        } else {
          const userId = currentUser._id;
          const userResponse = await axios.get(`${getUserDetailsRoute}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = userResponse.data.user;
          if (user.role !== 'admin') {
            navigate('/');
          }
        }
      } catch (error) {
        console.error(error);
        setError("Error checking user status");
      }
    };
    checkStatus();
  }, [currentUser, navigate, token]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(allEventsRoute);
      const res = response.data;
      // Sort events by date (descending)
      const sortedEvents = res.sort((b, a) => new Date(a.date) - new Date(b.date));
      // Filter events (if needed, e.g., specific user)
      const filteredEvents = sortedEvents.filter(event => event.user === '000000000000000000000001');
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ----------------------------
  // EventEditor Component
  // ----------------------------
  const EventEditor = ({ event, onSave, onCancel }) => {
    console.log('Event being edited:', event);
    const [editorTitle, setEditorTitle] = useState(event.title);
    const [editorDescription, setEditorDescription] = useState(event.description);
    const [editorDate, setEditorDate] = useState(event.date.split('T')[0]);
    const [editorTime, setEditorTime] = useState(event.date.split('T')[1] || '');
    const [editorLocation, setEditorLocation] = useState(event.location);
    const [imagePreview, setImagePreview] = useState(event.image || null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Include status so that the event is approved after editing
      const updatedEventData = {
        title: editorTitle,
        description: editorDescription,
        date: `${editorDate}T${editorTime}`,
        location: editorLocation,
        status: 'approved'
        // Optionally include image data here if needed
      };
      console.log('Event data to update:', updatedEventData);
      onSave(updatedEventData);
    };

    return (
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6 bg-[#1e1e36] p-6 rounded-xl">
        {/* Image Upload Section */}
        <div className="relative group">
          <div className={`w-full h-100 md:h-150 rounded-xl overflow-hidden bg-[#131324] flex items-center justify-center border-2 border-dashed border-gray-600 ${imagePreview ? 'border-none' : ''}`}>
            {imagePreview ? (
              <img src={imagePreview} alt="Event preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-400">Click or drag to upload event image</p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editorTitle}
            onChange={(e) => setEditorTitle(e.target.value)}
            placeholder="Event Title"
            className="w-full px-4 py-3 bg-[#131324] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            name="description"
            value={editorDescription}
            onChange={(e) => setEditorDescription(e.target.value)}
            placeholder="Event Description"
            rows="4"
            className="w-full px-4 py-3 bg-[#131324] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 bg-[#131324] rounded-lg px-4 py-3">
            <Clock className="text-gray-400 w-5 h-5" />
            <input
              type="date"
              name="date"
              value={editorDate}
              onChange={(e) => setEditorDate(e.target.value)}
              className="bg-transparent focus:outline-none flex-1"
            />
          </div>
          <div className="flex items-center space-x-2 bg-[#131324] rounded-lg px-4 py-3">
            <Clock className="text-gray-400 w-5 h-5" />
            <input
              type="time"
              name="time"
              value={editorTime}
              onChange={(e) => setEditorTime(e.target.value)}
              className="bg-transparent focus:outline-none flex-1"
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 bg-[#131324] rounded-lg px-4 py-3">
          <MapPin className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="location"
            value={editorLocation}
            onChange={(e) => setEditorLocation(e.target.value)}
            placeholder="Location"
            className="bg-transparent focus:outline-none flex-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Save Event
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  // ----------------------------
  // EventCard Component
  // ----------------------------
  const EventCard = ({ event, onEdit, onDelete }) => {
    const datetime = new Date(event.date);

    const handleApprove = async (eventId) => {
      try {
        await axios.put(`${approveEventRoute}/${eventId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEvents();
      } catch (err) {
        setError("Failed to approve event");
        toast(err.message || "Error approving event");
      }
    };

    const handleDisapprove = async (eventId) => {
      try {
        await axios.put(`${disapproveEventRoute}/${eventId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEvents();
      } catch (err) {
        setError("Failed to disapprove event");
        toast(err.message || "Error disapproving event");
      }
    };

    return (
      <div className="bg-[#1e1e36] rounded-xl overflow-hidden shadow-lg">
        {event.image && (
          <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{datetime.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            {event.isPaid && (
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>${event.ticketPrice}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onEdit(event)}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            {event.status === 'approved' ? (
              <button
                onClick={() => handleDisapprove(event._id)}
                className="flex items-center space-x-1 px-3 py-2 bg-purple-600 hover:bg-red-700 rounded-lg transition duration-200"
              >
                <span>Disapprove</span>
              </button>
            ) : (
              <button
                onClick={() => handleApprove(event._id)}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
              >
                <span>Approve</span>
              </button>
            )}
            <button
              onClick={() => onDelete(event._id)}
              className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------
  // Handlers for Save and Delete
  // ----------------------------
  const handleSave = async (updatedEventData) => {
    try {
      console.log('Event data: ', updatedEventData);
      if (!selectedEvent || !selectedEvent._id) {
        throw new Error("No event selected for update");
      }
      await axios.put(`${updateEventRoute}/${selectedEvent._id}`, updatedEventData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setEvents(prevEvents => prevEvents.map(event => 
        event._id === selectedEvent._id ? { ...event, ...updatedEventData } : event
      ));
      
      setIsEditing(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      toast(error.message || "Error saving event");
    }
  };
  
  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${deleteEventRoute}/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
        toast(error.message || "Error deleting event");
      }
    }
  };

  // Separate events by status
  const pendingEvents = events.filter(event => event.status !== 'approved');
  const approvedEvents = events.filter(event => event.status === 'approved');

  return (
    <div className="min-h-screen bg-[#131324] text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Scraped Events</h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : isEditing && selectedEvent ? (
          <EventEditor
            event={selectedEvent}
            onSave={handleSave}
            onCancel={() => {
              setIsEditing(false);
              setSelectedEvent(null);
            }}
          />
        ) : (
          <>
            {pendingEvents.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Pending Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingEvents.map(event => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onEdit={(event) => {
                        setSelectedEvent(event);
                        setIsEditing(true);
                      }}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
            {approvedEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Approved Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvedEvents.map(event => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onEdit={(event) => {
                        setSelectedEvent(event);
                        setIsEditing(true);
                      }}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventsDashboard;
