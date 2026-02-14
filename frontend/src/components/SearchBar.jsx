import React, { useState } from 'react';
import { FaSearch, FaLink, FaTag } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [inputType, setInputType] = useState('neutral');

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.includes('http') || val.includes('www.') || val.includes('.com') || val.includes('/')) {
      setInputType('link');
    } else if (val.length > 0) {
      setInputType('text');
    } else {
      setInputType('neutral');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log(`Searching for [${inputType}]:`, query);
  };

  return (
    <div className="w-full px-4 sm:px-6 my-8">
      <div className="w-full max-w-lg sm:max-w-2xl mx-auto p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">

        <div className="relative z-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight drop-shadow-md">
            Track Prices & <span className="text-yellow-300">Save Money</span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100 mb-4 max-w-xl mx-auto font-medium">
            Paste a product link or search by name to find the best deals instantly.
          </p>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch} 
            className="flex flex-col items-center space-y-2"
          >
            <div className="flex items-center w-full bg-white rounded-full px-3 py-2 sm:py-3 shadow">
              {/* Icon */}
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 text-indigo-600 mr-2">
                {inputType === 'link' && <FaLink className="text-base sm:text-lg" />}
                {inputType === 'text' && <FaTag className="text-base sm:text-lg" />}
                {inputType === 'neutral' && <FaSearch className="text-base sm:text-lg" />}
              </div>

              {/* Input */}
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Paste link (Amazon, Flipkart) or type product name..."
                className="flex-grow text-sm sm:text-base text-gray-800 bg-transparent border-none outline-none placeholder-gray-400 py-1 sm:py-2"
              />
            </div>

            {/* Search Button Below Input */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
            >
              <span className="mr-2">Search</span>
              <FaSearch />
            </button>
          </form>

          {/* Quick Hints */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-blue-100 opacity-90 font-semibold">
            <span className="flex items-center bg-white/10 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
              <FaLink className="mr-1 sm:mr-2 text-yellow-300"/> Amazon & Flipkart
            </span>
            <span className="flex items-center bg-white/10 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
              <FaTag className="mr-1 sm:mr-2 text-yellow-300"/> Real-time Alerts
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchBar;
