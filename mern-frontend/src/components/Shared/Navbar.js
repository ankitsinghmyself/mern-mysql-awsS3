import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('_token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My Website</h1>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
