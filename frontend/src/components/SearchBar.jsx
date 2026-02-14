import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    if (onClear) onClear();
  };

  return (
    <div className="w-full px-4 sm:px-6 my-8">
      <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight drop-shadow-md text-center">
          Find Items to <span className="text-yellow-300">Lend or Borrow</span>
        </h1>

        <form onSubmit={handleSearch} className="flex items-center w-full bg-white rounded-full px-3 py-2 shadow">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 mr-2">
            <FaSearch />
          </div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search by name, category, or city..."
            className="flex-grow text-gray-800 bg-transparent outline-none border-none py-1"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          )}

          <button type="submit" className="ml-2 bg-yellow-300 px-4 py-1 rounded-full text-gray-900 font-bold hover:bg-yellow-400 transition">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
