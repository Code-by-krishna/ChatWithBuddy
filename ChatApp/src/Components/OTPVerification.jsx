import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Clear error message once user starts typing
        setError("");

        // Focus on the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');

        if (enteredOtp.length === 6) {
            console.log("Entered OTP is:", enteredOtp);
            const response = await fetch('http://localhost:5000/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    enteredOtp: enteredOtp,
                    generatedOtp: localStorage.getItem('otp'),
                    email: localStorage.getItem('email'),
                }),
            })
            const result = await response.json();
            
            if (response.status === 400) {
                alert("Invalid OTP");
            } else if (response.status === 200) {
                alert('OTP verified successfully');
                navigate('/users/sign_in');
            }
        } else {
            setError("Please enter a 6-digit OTP.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">OTP Verification</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex space-x-2 mb-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            required
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105">
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default OTPVerification;
