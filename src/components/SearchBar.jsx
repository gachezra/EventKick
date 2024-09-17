import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, placeHolder }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8 relative z-10">
      <div className="relative">
        <input
          type="text"
          placeholder={placeHolder}
          onChange={handleSearch}
          className="w-full p-3 pl-12 text-base bg-gray-800 text-white placeholder-gray-400 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-l" />
      </div>
    </div>
  );
};

export default SearchBar;
