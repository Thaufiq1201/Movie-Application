import React, { useState } from 'react';

const MovieFilters = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilter();
    }
  };

  const handleFilter = () => {
    onFilter(searchTerm);
  };

  return (
    <div className="movie-filters">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleFilter}>Search</button>
    </div>
  );
};

export default MovieFilters;
