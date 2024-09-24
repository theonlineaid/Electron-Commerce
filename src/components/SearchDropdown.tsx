// src/components/SearchDropdown.tsx
import React, { useState } from 'react';

interface SearchDropdownProps {
  isVisible: boolean;
  results: string[];
}

const SearchDropdown: React.FC= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Sample search results (you can replace this with real data)
  const results = searchTerm
    ? ['Result 1', 'Result 2', 'Result 3'].filter(result =>
      result.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const handleFocus = () => {
    if (searchTerm) {
      setDropdownVisible(true); // Show dropdown only if there's a search term
    }
  };

  const handleBlur = () => {
    setDropdownVisible(false); // Hide dropdown when input loses focus
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownVisible(e.target.value.length > 0); // Show dropdown if there's input
  };

  return (
    <>
      {/* Search Bar Section */}
      <div className="tw-relative tw-flex tw-grow tw-justify-center">
        <div className="tw-flex tw-w-1/2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-border tw-text-black tw-border-gray-300 tw-rounded-l-md tw-p-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-flex-grow"
          />
          <button className="tw-bg-blue-500 tw-text-white tw-rounded-r-md tw-p-2">Search</button>
        </div>

        {/* Search Dropdown */}
        {dropdownVisible && (
          <div className="tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-lg tw-max-h-60 tw-overflow-auto tw-absolute left-0 tw-top-full tw-w-1/2">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} className="tw-p-2 hover:tw-bg-gray-100 tw-text-black">
                  {result}
                </div>
              ))
            ) : (
              <div className="tw-p-2 tw-text-black">No results found</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchDropdown;
