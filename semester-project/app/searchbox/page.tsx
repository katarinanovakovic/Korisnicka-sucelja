'use client'
import React, { useState, ChangeEvent } from 'react';

interface SearchBoxProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
