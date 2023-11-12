import React from 'react';
import './NotFound.css'

const Header = () => {
  return (
    <div className='NotFound'>
        <h1 align="center">404 Not Found</h1>
        <h3 align="center"><a align="center" href="javascript:history.back()">Go back</a></h3>
    </div>
  );
};

export default Header;