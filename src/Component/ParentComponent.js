// Misalnya ini adalah komponen induk
import React, { useState, useEffect } from 'react';
import Books from './Books';

const ParentComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);  // set isLoggedIn based on token presence
  }, []);

  return <Books isLoggedIn={isLoggedIn} />;
};

export default ParentComponent;