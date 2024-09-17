import React, { useState, useEffect } from 'react';

const Comment = ({ comment, currentUser, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (comment) {
      setEditText(comment.content || '');
    }
  }, [comment]);

  if (!comment) return null;

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment._id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(comment._id);
  };

  return (
    <div className="bg-[#1e1e36] p-4 rounded-md shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">{comment.user?.username}</div>
        {comment.user?._id === currentUser?._id && comment.user?._id === currentUser?._id && (
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
        <textarea
          className="w-full p-2 mt-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p className="mt-2">{comment.content}</p>
      )}
    </div>
  );
};

export default Comment;