import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-blue-50 flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Welcome to ChatBuddy! We’re here to help with any questions or issues you might have. Please reach out to us using the contact details below.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21h-2a4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4z" />
                <path d="M14 12v6m-4-6v6M8 12v6m-4-6v6M21 21h-2a4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4z" />
              </svg>
              <p className="text-lg text-gray-800">Phone: +1 (800) 123-4567</p>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6z" />
                <path d="M21 15l-7 7-7-7" />
              </svg>
              <p className="text-lg text-gray-800">Email: support@chatbuddy.com</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">About ChatBuddy</h2>
          <p className="text-lg text-gray-700 mb-4">
            ChatBuddy is a user-friendly chat application designed to keep you connected with friends and family. Our app offers a seamless messaging experience with a focus on security and ease of use.
          </p>
          <p className="text-lg text-gray-700">
            Our support team is always ready to assist you with any inquiries. Feel free to contact us via phone or email, and we will be happy to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
