import React from 'react';
import QRCode from 'qrcode.react';
import { Link } from "react-router-dom";

const Ticket = ({ event }) => {
  const user = localStorage.getItem(`${process.env.REACT_APP_LOCALHOST_KEY}`);
  const userId = JSON.parse(user)._id;
  return (
    <>
    <div className="bg-white text-black p-6 rounded-lg shadow-md mb-4">
      <Link to={`/events/${event._id}`}>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      </Link>
      <p className="mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-2">Time: {new Date(event.date).toLocaleTimeString()}</p>
      <p className="mb-2">Location: {event.location}</p>
      <div className="mt-4">
        <QRCode value={`${event._id}_${userId}`} size={128} />
      </div>
      <Link to={`/events/${event._id}`}>
        <h2 className="text-xl font-bold mt-3">Event Page...</h2>
      </Link>
    </div>
    </>
  );
};

export default Ticket;