import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, isProfilePage, onEdit, onDelete }) => {
  return (
    <div className={`flex flex-wrap justify-center ${isProfilePage ? '' : ''}`}>
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          isProfilePage={isProfilePage}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EventList;