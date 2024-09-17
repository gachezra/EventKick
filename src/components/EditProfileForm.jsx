import React, { useState } from 'react';

const EditProfileForm = ({ user, onSave}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      onSave(username, email);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      {error && (
        <div className="text-red-500 text-center my-4 p-4 bg-red-100 rounded-lg">{error}</div>
      )}
      <div className="flex flex-col gap-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="justify-center text-center items-center mx-auto">
          <button
            className="rounded-full border-2 justify-center border-indigo-600 px-6 pb-[6px] pt-2 mt-2 font-medium leading-normal text-indigo-600 transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-100 hover:bg-opacity-10 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-0 active:border-indigo-700 active:text-indigo-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;