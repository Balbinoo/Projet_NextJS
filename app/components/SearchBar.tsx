import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
      />
    </div>
  );
};

export default SearchBar;
