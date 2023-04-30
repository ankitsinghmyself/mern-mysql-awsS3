import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData.user);
  }, []);

  const getGreetingMessage = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {user && (
          <div className="bg-gray-200 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              {`${getGreetingMessage()}, ${user.firstName} ${user.lastName}`}
            </h2>
            <div className="flex items-center">
              <img
                src={user.profile_pic_url}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-gray-600">Mobile Number: {user.mobile}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
