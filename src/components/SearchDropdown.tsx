// src/components/SearchDropdown.tsx
import React from 'react';

interface SearchDropdownProps {
  isVisible: boolean;
  results: string[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ isVisible, results }) => {
  if (!isVisible) return null;

  return (
    <div className="tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-lg tw-max-h-60 tw-overflow-auto tw-mt-1">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="tw-p-2 hover:tw-bg-gray-100">
            {result}
          </div>
        ))
      ) : (
        <div className="tw-p-2">No results found</div>
      )}
    </div>
  );
};

export default SearchDropdown;
