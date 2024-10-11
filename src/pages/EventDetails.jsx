import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Map from '../components/Map';
import placeholderImage from '../assets/placeholder-image.jpg';
import Comment from '../components/Comment';
import Review from '../components/Review';
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForumPreview from "../components/ForumPreview";
import {
  eventDetailsRoute,
  getCommentsRoute,
  addCommentRoute,
  deleteCommentRoute,
  registerEventRoute,
  getReviewsRoute,
  deleteReviewRoute,
  addReviewRoute,
  editReviewRoute,
  incrementOpenedCountRoute
} from '../utils/APIRoutes';
import EventsYouMightLike from '../components/EventsYouMightLike';
import StarRating from '../components/StarRating';
import PaymentPage from '../components/PaymentPage';
import { Helmet } from 'react-helmet-async';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(1);
  const [error, setError] = useState(null);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [selectedEventPrice, setSelectedEventPrice] = useState(0);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [numOfTickets, setNumOfTickets] = useState(1);
  const [eventLocation, setEventLocation] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) || null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${eventDetailsRoute}/${id}`);
        setEvent(response.data);
        const commentsResponse = await axios.get(`${getCommentsRoute}/${id}`);
        if (Array.isArray(commentsResponse.data.comments)) {
          setComments(commentsResponse.data.comments);
        } else {
          setComments([]);
        }
        console.log(response.data)

        axios.post(`${incrementOpenedCountRoute}/${id}`)
      
        setEventLocation(response.data.location);

        const reviewsResponse = await axios.get(`${getReviewsRoute}/${id}`);
        if (Array.isArray(reviewsResponse.data.reviews)) {
          setReviews(reviewsResponse.data.reviews);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching event details:", err);
      }
    };
    fetchEventDetails();
  }, [id]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.date,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mombasa",
        "addressRegion": "Coast",
        "addressCountry": "Kenya"
      }
    },
    "image": event.image,
    "offers": {
      "@type": "Offer",
      "price": event.ticketPrice,
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "url": `https://www.eventkick.ke/events/${event._id}`
    },
    "organizer": {
      "@type": "Organization",
      "name": "EventKick",
      "url": "https://www.eventkick.ke"
    }
  };

  const handleRegister = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const currentDate = new Date();
    const eventDate = new Date(event.date);

    if (eventDate < currentDate) {
      toast.error("This event has already taken place.");
      return;
    }

    if (event.isPaid) {
      const confirmed = window.confirm(`This is a paid event. The ticket price is Ksh.${event.ticketPrice}. Do you wish to proceed to pay for ${numOfTickets} tickets?`);
      if (!confirmed) {
        return;
      }
      setSelectedEventPrice(event.ticketPrice);
      setShowPaymentOverlay(true);
      return;
    }

    try {
      const response = await axios.post(
        `${registerEventRoute}/${id}`,
        { userId: currentUser._id,
          tickets: numOfTickets
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(response.data.message);

      // Update the UI to show the user is registered
      setEvent(prevEvent => ({
        ...prevEvent,
        registeredUsers: [...prevEvent.registeredUsers, currentUser._id]
      }));
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handlePaymentSuccess = async () => {
    setIsPaymentProcessing(true);

    try {
      const response = await axios.post(
        `${registerEventRoute}/${id}`,
        { userId: currentUser._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(response.data.message);

      // Update the UI to show the user is registered
      setEvent(prevEvent => ({
        ...prevEvent,
        registeredUsers: [...prevEvent.registeredUsers, currentUser._id]
      }));

      setShowPaymentOverlay(false);
      toast.success("Payment successful. You have been registered for the event.");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handleAddComment = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`${addCommentRoute}`, {
        content: newComment,
        eventId: id,
        userId: currentUser._id,
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status && response.data.comment) {
        setComments([...comments, response.data.comment]);
        setNewComment('');
      }
    } catch (err) {
      toast.error("Comment field empty");
      console.error("Error adding comment:", err);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      await axios.put(`${addCommentRoute}/${commentId}`, {
        text: newText
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(comments.map((comment) =>
        comment.id === commentId ? { ...comment, text: newText } : comment
      ));
    } catch (err) {
      setError(err.message);
      console.error("Error editing comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete your comment?")) {
      try {
        await axios.delete(`${deleteCommentRoute}/${commentId}/${currentUser._id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(comments.filter((comment) => comment.id !== commentId));
        const commentsResponse = await axios.get(`${getCommentsRoute}/${id}`);
        if (Array.isArray(commentsResponse.data.comments)) {
          setComments(commentsResponse.data.comments);
        } else {
          setComments([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error deleting comment:", err);
      }
    }
  };

  const handleAddReview = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!event.registeredUsers.includes(currentUser._id)) {
      toast.error("You must be registered for this event to add a review.");
      return;
    }

    try {
      const response = await axios.post(`${addReviewRoute}`, {
        content: newReview,
        rating: newReviewRating,
        eventId: id,
        userId: currentUser._id,
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status && response.data.review) {
        setReviews([...reviews, response.data.review]);
        setNewReview('');
        setNewReviewRating(1);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error adding review:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`${deleteReviewRoute}/${reviewId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }, {
        userId: currentUser.id,
      });
      toast(response.data.msg)
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleEditReview = async (reviewId, newText, newRating) => {
    try {
      const response = await axios.put(`${editReviewRoute}/${reviewId}`, {
        content: newText,
        rating: newRating,
        userId: currentUser._id,
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(reviews.map((review) =>
        review._id === reviewId ? response.data.review : review
      ));
    } catch (err) {
      console.error("Error editing review:", err);
    }
  };

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(eventLocation)}`;

  if (error) {
    toast.error('Page load error:', error);
  }

  if (!event) {
    return (
    <>
      <div className='bg-[#131324] h-screen w-full'>
        <img src={loader} alt="loader" className="mx-auto my-auto text-center items-center" />
      </div>
    </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#131324] text-white">
      <Helmet>
        <title>{event.title}</title>
        <meta name='description' content={event.description}/>
        <link rel='canonical' href={`https://www.eventkick.ke/events/${id}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <Header />
      <div className="container mx-auto p-4 flex-grow md:mx-auto font-xs">
      <div
        style={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', 
          overflow: 'hidden', // Ensure content doesn't overflow the container
        }}
        className='z-10 w-full'
        >
          {/* Blurred background */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(${event.image})`,
              filter: 'blur(10px)', // Adjust the blur level as needed
              transform: 'scale(1.1)', // Slightly scale the image to avoid visible edges after blurring
            }}
          ></div>

          {/* Content that remains unblurred */}
          <div className="relative flex flex-col md:flex-row mx-auto p-6 justify-center items-center z-10">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto md:w-auto md:h-[600px] mb-6 rounded-md md:mx-6 shadow-lg"
                onError={(e) => (e.target.src = placeholderImage)}
              />
            )}
            <div className="bg-[#1e1e36] p-6 rounded-md shadow-md mb-6 md:w-1/3">
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <p className="mb-4">{event.description}</p>
              <div className="mb-4">
                <strong>Date & Time: </strong>
                <span>{new Intl.DateTimeFormat('en-US', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short', 
                    timeZone: 'UTC' 
                  }).format(new Date(event.date))}
                </span>
              </div>

              <div className="mb-2">
                <strong>Venue: </strong>
                <span>{event.location}</span>
              </div>

              <div className="mb-4">
                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="mt-2 text-indigo-600 hover:text-indigo-800">
                  View Location on Google Maps
                </a>
              </div>

              <div className="mb-4">
                <strong>Ticket Price: </strong>
                <span>{event.isPaid ? `Ksh.${event.ticketPrice}` : 'Free'}</span>
              </div>
              {event.isPaid && (
                <>
                <input
                  type="number"
                  className="w-full p-3 mb-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                  value={numOfTickets}
                  onChange={(e) => setNumOfTickets(e.target.value)}
                  min="1"
                />
                <button
                  onClick={handleRegister}
                  disabled={event.registeredUsers.includes(currentUser?._id)}
                  className="rounded-full border-2 border-indigo-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                >
                  {event.registeredUsers.includes(currentUser?._id)
                    ? 'Already Registered'
                    : 'Get Ticket'}
                </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          {showPaymentOverlay && (
            <div className="fixed inset-0 bg-black bg-opacity-10 p-6 flex justify-center items-center z-50">
              <div className="p-6 bg-[#131324] rounded-lg shadow-md">
                <PaymentPage
                  eventId={event._id}
                  name={event.title}
                  amount={selectedEventPrice * numOfTickets}
                  onPaymentSuccess={handlePaymentSuccess}
                />
                <button
                  className='my-3 px-4 py-1 bg-transparent border-2 border-indigo-600 rounded-full text-indigo-600 hover:bg-opacity-10 hover:bg-gray-300'
                  onClick={() => setShowPaymentOverlay(false)}
                  disabled={isPaymentProcessing}
                >
                  {isPaymentProcessing ? 'Processing...' : 'Close'}
                </button>
              </div>
            </div>
          )}
          <div className="mt-4">
            {/* <Map location={event.location} /> */}
          </div>
        </div>

        {new Date() >= new Date(event.date) && (
          <div className='flex flex-col md:flex-row'>
            <div className="md:w-1/2 mx-auto md:mr-4">
              <ForumPreview 
                eventId={id} 
                registeredUsers={event.registeredUsers} 
                eventDate={event.date}
              />

              {currentUser && event.registeredUsers.includes(currentUser._id) && (
                <Link to={`/forums/${id}`} className="block mt-4 text-indigo-600 hover:text-indigo-800">
                  View Available Forums
                </Link>
              )}
            </div>

            <div className='md:w-1/2 w-full mx-auto'>
              <div className="bg-[#1e1e36] p-6 mt-3 mx-auto rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {Array.isArray(reviews) && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Review
                      key={review._id}
                      review={review}
                      currentUser={currentUser}
                      onDelete={handleDeleteReview}
                      onEdit={handleEditReview}
                    />
                  ))
                ) : (
                  <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                )}
                
                {currentUser && (
                  <div className="mt-4">
                    <StarRating
                      rating={newReviewRating}
                      onRatingChange={setNewReviewRating}
                    />
                    <textarea
                      className="w-full p-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
                      placeholder="Add a review..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                    />
                    <div className="flex items-center mt-2">
                      <button
                        onClick={handleAddReview}
                        className="rounded-full border-2 border-indigo-600 px-6 pb-[6px] pt-2 ml-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                )}

                <ToastContainer/>
              </div>
            </div>
          </div>
        )}


        <div className="bg-[#1e1e36] p-6 mt-3 mx-auto rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                currentUser={currentUser}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment}
              />
            ))
          ) : (
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          )}
          {currentUser ? (
            <div className="mt-4">
              <textarea
                className="w-full p-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="rounded-full border-2 mt-2 border-indigo-600 px-6 pb-[6px] pt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              >
                Add Comment
              </button>
            </div>
          ) : (
            <p className="mt-4 text-gray-400">You must be logged in to post a comment.</p>
          )}
        </div>
        <EventsYouMightLike currentEventId={event._id} currentEventLocation={event.location} />
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
