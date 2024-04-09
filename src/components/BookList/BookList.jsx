import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CrudTable = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("lakku", searchTerm)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CrudTable;