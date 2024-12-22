'use client';

import React, { useState } from 'react'

function SearchBar() {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }
  return (
    <div>
        <input value={searchText} onChange={handleSearchTextChange} type="text" placeholder="Search..." />
    </div>
  )
}

export default SearchBar