import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Placeholder from "../assets/placeholder-image.jpg";
import { getUserEventsRoute, deleteEventRoute, getUserRegisteredEventsRoute, getUserDetailsRoute, updateUserRoute } from "../utils/APIRoutes";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { TbReceipt2 } from "react-icons/tb";
import EventList from '../components/EventList';
import Ticket from "../components/Ticket";
import EditProfileForm from '../components/EditProfileForm';
import SearchBar from '../components/SearchBar';
import TransactionDetailsOverlay from '../components/TransactionDetailsOverlay';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [ editUser, setEditUser] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);

  const handleShowTransactionDetails = () => {
    setShowTransactionDetails(true);
  };

  const handleCloseTransactionDetails = () => {
    setShowTransactionDetails(false);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (currentUser) {
      if (!currentUser.isAvatarImageSet) {
        navigate("/setAvatar");
      } else {
        fetchUserDetails(currentUser._id);
        fetchUserEvents(currentUser._id);
        fetchUserRegisteredEvents(currentUser._id);
      }
    } else {
      setError("User not found. Please log in.");
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = async (username, email) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      await axios.put(
        `${updateUserRoute}/${user._id}`,
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setEditUser(true)
      fetchUserDetails(currentUser._id);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  const fetchUserDetails = async (userId) => {
    const user = await axios.get(`${getUserDetailsRoute}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setUser(user.data.user);
  }

  const fetchUserEvents = async (userId) => {
    try {
      const response = await axios.get(`${getUserEventsRoute}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching user events:", err);
      setError("Failed to fetch user events. Please try again later.");
    }
  };

  const fetchUserRegisteredEvents = async (userId) => {
    try {
      const response = await axios.get(`${getUserRegisteredEventsRoute}/${userId}/registered`);
      setRegisteredEvents(response.data);
    } catch (err) {
      console.error("Error fetching registered events:", err);
      setError("Failed to fetch registered events. Please try again later.");
    }
  };

  const filteredEvents = registeredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditEvent = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${deleteEventRoute}/${eventId}`);
        setEvents(events.filter(event => event._id !== eventId));
      } catch (err) {
        console.error("Error deleting event:", err);
        setError("Failed to delete event. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>Profile - {user.username}</title>
        <meta name='description' content='View your profile along with your tickets, transaction and posted events for event planners.' />
        <link rel='canonical' href='/profile' />
      </Helmet>
      <Header />
      <div className="container mx-auto flex-grow px-4 py-8">
        {error ? (
          <div className="text-red-500 text-center my-4 p-4 bg-red-100 rounded-lg">{error}</div>
        ) : user && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8 flex flex-col items-center relative">
              { editUser ? (
                <HiOutlinePencilAlt
                  className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
                  onClick={() => setEditUser(false)}
                  title='Edit Profile'
                />
              ) : (
                <IoMdCloseCircle
                  className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
                  onClick={() => setEditUser(true)}
                  title='Close'
                />
              )}
              <TbReceipt2
                className="absolute top-4 left-4 text-white w-6 h-6 cursor-pointer"
                onClick={handleShowTransactionDetails}
                title='Transaction History'
              />
              <img
                src={`data:image/svg+xml;base64,${user.avatarImage}` || Placeholder}
                alt="Avatar"
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 shadow-lg"
              />
              {showTransactionDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-10 p-6 flex justify-center items-center z-50">
                  <div className="p-6 bg-[#131324] rounded-lg shadow-md">
                    <TransactionDetailsOverlay userId={user._id} onClose={handleCloseTransactionDetails} />
                  </div>
                </div>
              )}
              { !editUser ? (
                  <Link to='/setAvatar'>
                    <span className="strong">Edit Avatar</span>
                  </Link>
              ) : null }
              <h1 className="text-xl font-bold mb-2">{user.username}</h1>
              <p className="text-l text-gray-300 mb-4">{user.email}</p>
            </div>

            {editUser ? ('') : (
              <EditProfileForm user={user} onSave={handleSave}/>
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
              <SearchBar onSearch={setSearchTerm} placeHolder={'Search tickets...'} />
              {registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredEvents.map(events => (
                    <Ticket key={events._id} event={events} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-8">No registered events yet.</p>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6">My Events</h2>
              {events.length > 0 ? (
                <EventList
                  key={events._id}
                  events={events}
                  isProfilePage={true}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              ) : (
                <p className="text-center text-gray-400 py-8">No events posted yet. Create your first event!</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;