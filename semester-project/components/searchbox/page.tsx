import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-100px' }}>
      <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px', color: 'darkgreen'}} />
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={handleInputChange}
        style={{
          width: '300px',
          height: '40px',  // Set the desired height
          borderRadius: '20px',  // Set the border-radius for round corners
          background: 'darkgreen',
          padding: '5px 10px',  // Adjust padding as needed
          color: 'white',
          border: 'none',  // Remove border
          outline: 'none',  // Set border width and style  // Set the border color to white
        }}
      />
    </div>
  );
};

export default SearchBox;
