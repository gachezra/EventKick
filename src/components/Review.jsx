import React, { useState, useEffect } from 'react';
import StarRating from './StarRating'; // You'll need to create this component

const Review = ({ review, currentUser, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    if (review) {
      setEditText(review.content || '');
      setEditRating(review.rating || 0);
    }
  }, [review]);

  if (!review) return null;

  const handleEdit = () => {
    if (isEditing) {
      onEdit(review._id, editText, editRating);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(review._id);
  };

  return (
    <div className="bg-[#1e1e36] p-4 rounded-md shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">{review.user?.username}</div>
        {review.user?._id === currentUser?._id && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-indigo-600 hover:text-indigo-500 transition duration-300"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-500 transition duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <>
          <textarea
            className="w-full p-2 mt-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <StarRating rating={editRating} onRatingChange={setEditRating} />
        </>
      ) : (
        <>
          <p className="mt-2">{review.content}</p>
          <StarRating rating={review.rating} readonly />
        </>
      )}
    </div>
  );
};

export default Review;