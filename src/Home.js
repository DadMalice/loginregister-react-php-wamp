import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  // Access the location state to get the username
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h1 className='text-4xl text-center pb-5'>
          Hello {username || 'Guest'}, welcome to my Test Page
        </h1>
        {/* Add the rest of your Home page content here */}
      </div>
    </div>
  );
}

export default Home;