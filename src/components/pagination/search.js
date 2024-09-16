// Search.js
import React, { useState } from 'react';
import SearchInput from 'react-search-input';

const Search = ({ data, keysToFilter, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle the search term change
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredData = data.filter(item => 
      keysToFilter.some(key => 
        item[key].toLowerCase().includes(term.toLowerCase())
      )
    );
    onSearch(filteredData);
  };

  return (
    <div>
      <SearchInput
        className="search-input"
        onChange={handleSearch}
        value={searchTerm}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
