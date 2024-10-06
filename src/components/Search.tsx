import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(searchTerm); 
  };

  return (
    <TextField
      label="Search notes"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
  );
}

export default SearchBar;