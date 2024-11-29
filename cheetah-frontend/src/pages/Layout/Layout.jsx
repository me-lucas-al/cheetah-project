import React from 'react';
import logo from '/src/assets/images/logo.png';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <header className="mb-4">
        <img src={logo} alt="Logo" className="w-80 h-20 mt-5" />
      </header>
      {children}
    </div>
  );
};

export default Layout;
