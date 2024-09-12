import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai'; // Mail icon
import { FaLock } from 'react-icons/fa'; // Lock icon
import { IoMdArrowBack } from 'react-icons/io'; // Back arrow icon
import { useNavigate } from 'react-router-dom';
import { AiOutlineLock } from 'react-icons/ai';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to handle password reset, send email, etc.
        console.log('Email submitted:', email);
        console.log('password',password);
        const response = await fetch('http://localhost:5000/auth/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: email,
                password: password,
            }),
        })
        const result = await response.json();
        if(response.status == 200) {
            alert(result.msg);
            navigate('/users/sign_in');
        }else {
            alert(result.msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex items-center mb-6">
                    <button 
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => navigate('/users/sign_in')}
                    >
                        <IoMdArrowBack size={24} />
                    </button>
                    <h2 className="text-2xl font-semibold text-center mx-auto">Forgot Password</h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address:
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-3">
                            <AiOutlineMail className="text-gray-500 mx-3" size={24} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                        </div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                             New Password:
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <AiOutlineLock className="text-gray-500 mx-3" size={24} />  
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">Remember your password?</p>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/users/sign_in')}
                    >
                        Login here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
