import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getForumThreadsRoute, eventDetailsRoute } from '../utils/APIRoutes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const ForumPage = () => {
  const [event, setEvent] = useState(null);
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventAndThreads = async () => {
      setIsLoading(true);
      try {
        // Fetch event details
        const eventResponse = await axios.get(`${eventDetailsRoute}/${eventId}`);
        setEvent(eventResponse.data);

        // Fetch forum threads for this event
        const threadsResponse = await axios.get(`${getForumThreadsRoute}/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setThreads(threadsResponse.data.thread || []);
      } catch (err) {
        console.error("Error fetching event and threads:", err);
        setError("Failed to load event forum. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventAndThreads();
  }, [eventId]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#131324] text-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#131324] text-white flex items-center justify-center">{error}</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-[#131324] text-white">
        <Helmet>
          <title>Forum - {event.title}</title>
          <meta name='description' content='Share and participate on the most active forums in the event industry.' />
          <link rel='canonical' href='/forums' />
        </Helmet>
        <Header/>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{event.title} Forum</h1>
          <div className="space-y-8">
            {threads.length > 0 ? (
              threads.map(thread => (
                <div key={thread._id} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{thread.title}</h3>
                  <p className="text-gray-400">Started by {thread.user.username}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 mr-2">
                      {thread.posts.length} replies
                    </span>
                    <Link to={`/forum/${thread._id}`} className="text-blue-500">
                      View Discussion
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No discussions yet for this event. Be the first to start a discussion!</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ForumPage;