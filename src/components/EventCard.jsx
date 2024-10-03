import React from 'react';
import { Link } from "react-router-dom";
import placeholderImage from '../assets/placeholder-image.jpg';

const EventCard = ({ event, isProfilePage, onEdit, onDelete }) => {
  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 md:p-2 lg:p-2 xl:p-2">
      <div className="bg-[#1e1e36] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link to={`/events/${event._id}`}>
          <img 
            src={`${event.image}`} 
            alt={event.title} 
            onError={handleImageError} 
            className="w-full h-48 object-cover" // Adjust the height of the image
          />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 truncate">{event.title}</h3>
            <p className="text-sm text-gray-400 mb-2 line-clamp-2">{event.description}</p>
            <div className="mb-2">
              <p className="text-indigo-200 p-2 rounded">
              <strong>Date & Time:</strong> {new Intl.DateTimeFormat('en-US', { 
                dateStyle: 'medium', 
                timeStyle: 'short', 
                timeZone: 'UTC' 
              }).format(new Date(event.date))}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-green-200 p-2 rounded">
                <strong>Venue:</strong> {event.location}
              </p>
            </div>
            <div className="mb-2">
              <p className={`${event.isPaid ? 'text-yellow-200' : 'text-blue-200'} p-2 rounded`}>
                <strong>Ticket Price:</strong> {event.isPaid ? `Ksh.${event.ticketPrice}` : 'Free'}
              </p>
            </div>
          </div>
        </Link>
        {isProfilePage && (
          <div className="p-4 flex justify-between border-t border-gray-700">
            <button
              onClick={() => onEdit(event._id)}
              className="hover:text-blue-600 text-blue-500 px-4 py-2 rounded-full transition-colors duration-300 border-2 border-blue-500 hover:border-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="hover:text-red-600 text-red-500 px-4 py-2 rounded-full transition-colors duration-300 border-2 border-red-500 hover:border-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;