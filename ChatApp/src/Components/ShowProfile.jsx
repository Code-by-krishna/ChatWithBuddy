// AdminProfilePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../Modules/images/krishna.jpeg';

const ShowProfile = () => {
  const navigate = useNavigate();

  const adminProfile = JSON.parse(localStorage.getItem("user:detail"));
  console.log(adminProfile);

  if (!adminProfile) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const userAvatar = adminProfile?.avatar;
  const avatarUrl = userAvatar ? `https://chatwithbuddy-chatappserver.onrender.com/uploads/${userAvatar}` : defaultAvatar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl border border-gray-300 p-8 transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Admin Profile</h1>
        <div className="flex items-center mb-8">
          <div className="relative w-32 h-32">
            <img
              src={avatarUrl}
              alt="Admin Avatar"
              className="w-full h-full object-cover rounded-full border-4 border-gradient-to-r from-teal-400 to-blue-500 shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-50"></div>
            </div>
          </div>
          <div className="ml-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">{adminProfile?.fullName}</h2>
            <p className="text-xl text-gray-700 mb-1">{adminProfile?.email}</p>
            <p className="text-md text-gray-500">{adminProfile?.pnumber}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Bio</h3>
          <p className="text-gray-700">{adminProfile?.bio}</p>
        </div>
        <div className="mt-8 text-center">
          <a
            onClick={() => navigate('/edit-profile')}
            className="cursor-pointer px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
