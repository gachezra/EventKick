import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getForumThreadsRoute, addForumThreadRoute } from '../utils/APIRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForumPreview = ({ eventId, registeredUsers, eventDate }) => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to view the forum threads.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${getForumThreadsRoute}/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setThreads(response.data.thread || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching forum threads:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [eventId]);

  const handleAddThread = async () => {
    if (newThreadTitle) {
      const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const userId = user._id;

      // Check if the user has registered for the event or if the event has started
      const isRegistered = registeredUsers.includes(userId);
      // const hasEventStarted = new Date() >= new Date(eventDate);

      if (!isRegistered) {
        if (!isRegistered) {
          toast.error("You can only post in the forum if you've registered for the event");
        }
        // if (!hasEventStarted) {
        //   toast.error("You can only post in the forum if the event has started.");
        // }
        return; // Add this line to prevent thread creation if conditions are not met
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return; //
        }
        const { data } = await axios.post(addForumThreadRoute, { title: newThreadTitle, eventId, userId }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (data.status) {
          setNewThreadTitle("");
          setThreads([...threads, data.thread]);
          navigate(`/forums/${eventId}`);
        }
      } catch (err) {
        console.error("Error adding forum thread:", err);
      }
    }
  };

  if (error) {
    console.error(error);
    return (
      <div className="bg-[#1e1e36] p-6 mt-3 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Jana Kuliendaje</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading forum threads...</p>;
  }

  return (
  <div className="bg-[#1e1e36] p-6 mt-3 mx-auto rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Jana Kuliendaje</h2>
      {threads.length > 0 ? (
        threads.slice(0, 3).map((thread) => (
          <div key={thread._id} className="mb-4">
            <Link 
              to={`/forum/${thread._id}`}
              className="text-indigo-600 hover:underline"
              >
              {thread.title}
            </Link>
            <p className="text-gray-400">Started by {thread.user.username}</p>
            <p className="text-gray-400">{thread.posts.length} replies</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No discussions yet. Be the first to start a discussion!</p>
      )}
      <div>
        <input
          className="w-full p-2 mt-2 mb-3 bg-transparent border-b border-gray-300 text-white focus:outline-none"
          type="text"
          placeholder="Aje..."
          value={newThreadTitle}
          onChange={(e) => setNewThreadTitle(e.target.value)}
        />
        <button
          onClick={handleAddThread}
          className="rounded-full border-2 border-indigo-600 px-6 pb-[6px] pt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        >
          Start Discussion
        </button>
        {error && toast.error(error)}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForumPreview;