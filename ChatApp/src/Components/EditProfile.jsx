import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const loginuserEmail = localStorage.getItem("email");
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        bio: '',
        avatar: null,
        loginuserEmail: loginuserEmail,
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: name === 'avatar' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('fullName', userData.fullName);
        formData.append('email', userData.email);
        formData.append('bio', userData.bio);
        formData.append('avatar', userData.avatar);
        formData.append('loginuserEmail', userData.loginuserEmail);

        try {
            const response = await fetch(`https://chatwithbuddy-chatappserver.onrender.com/user/edit/profile`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.msg);
                const user = JSON.parse(localStorage.getItem('user:detail'));
                const userdata = {
                    id: user.id,
                    email: result.email,
                    fullName: result.fullName,
                    bio: result.bio,
                    pnumber: result.pnumber,
                    avatar: result.avatar
                };
                localStorage.setItem('user:detail', JSON.stringify(userdata));
                localStorage.setItem('email', result.email);

                navigate('/', { state: { admindata: result } });
            } else {
                console.error("Error updating profile:", result.error || 'Unknown error');
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            alert('An error occurred while updating your profile. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-6 max-w-md bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-transform transform hover:scale-105"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-transform transform hover:scale-105"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Bio:</label>
                    <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-transform transform hover:scale-105"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Profile Picture:</label>
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-transform transform hover:scale-105"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'} text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-105`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
