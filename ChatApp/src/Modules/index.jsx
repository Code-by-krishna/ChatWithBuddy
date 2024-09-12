import React, { useEffect, useState } from "react";
import Input from "../Components/input";
import Button from "../Components/Button";
import { useNavigate } from 'react-router-dom';
import otpGenerator from 'otp-generator'

  const captcha = [...Array(6)].map(() => Math.random().toString(36)[2]).join('');
  console.log(captcha);
  localStorage.setItem('captcha', captcha);

function Form({ isSignInPage = false }) {
  const [data, setData] = useState({
    ...(!isSignInPage && { fullName: "", pnumber: "" }),
    email: "",
    password: "",
    enteredCaptcha: "",
    generatedCaptcha: localStorage.getItem('captcha'),
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://chatwithbuddy-chatappserver.onrender.com/auth/${isSignInPage ? 'login' : 'register'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 400) {
      alert(result.msg);
    } else {
      if (result.otp) {
        localStorage.setItem('otp', result.otp);
        localStorage.setItem('email', result.email);
        navigate('/verify-otp');
      } else if (result.token) {
        localStorage.setItem('user:token', result.token);
        localStorage.setItem('user:detail', JSON.stringify(result.user));
        navigate('/');
      }
    }
  };

  return (
    <div className="bg-blue-50 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center transition-transform transform hover:scale-105">
        <div className="flex items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-hipchat" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17.802 17.292s.077 -.055 .2 -.149c1.843 -1.425 3 -3.49 3 -5.789c0 -4.286 -4.03 -7.764 -9 -7.764c-4.97 0 -9 3.478 -9 7.764c0 4.288 4.03 7.646 9 7.646c.424 0 1.12 -.028 2.088 -.084c1.262 .82 3.104 1.493 4.716 1.493c.499 0 .734 -.41 .414 -.828c-.486 -.596 -1.156 -1.551 -1.416 -2.29z" />
            <path d="M7.5 13.5c2.5 2.5 6.5 2.5 9 0" />
          </svg>
          <span className="text-3xl font-bold text-blue-900 ml-3">ChatBuddy</span>
        </div>
        <p className="text-lg font-medium text-gray-700 mb-3 text-center">
          {isSignInPage ? 'Sign in to your account' : 'Create a new account'}
        </p>
        <form className="flex flex-col space-y-2 w-full max-w-xs" onSubmit={handleSubmit}>
          {!isSignInPage && (
            <Input
              label="Full name:"
              type="text"
              name="fullName"
              placeholder="Enter your full name."
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
          )}
          <Input
            label="Email address:"
            type="email"
            name="email"
            placeholder="Enter your email."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
          />
          <Input
            label="Password:"
            type="password"
            name="password"
            placeholder="Enter your password."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
          />
          {!isSignInPage && (
            <Input
              label="Phone Number:"
              type="tel"
              name="pnumber"
              placeholder="Enter +919817271014 only"
              value={data.pnumber}
              onChange={(e) => setData({ ...data, pnumber: e.target.value })}
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
          )}
          {isSignInPage && (
            <Input
              label="Captcha:"
              type="text"
              name="enteredCaptcha"
              placeholder="Enter Captcha."
              value={data.enteredCaptcha}
              onChange={(e) => setData({ ...data, enteredCaptcha: e.target.value })}
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
          )}

          <div className="flex">
          {isSignInPage && (<h1 className=" bg-gray-400 text-white max-w-[80px] p-1 border border-black text-xl ">{localStorage.getItem('captcha')}</h1>)}

          {isSignInPage && (<a
              //href="#"
              onClick={() => navigate('/forgot-password')}
              className="px-2 py-1 text-sm ml-auto cursor-pointer text-blue-600 underline "
            >
              Forgot password?
            </a>)}
          </div>
          <Button
            label={isSignInPage ? 'Login' : 'Register'}
            type="submit"
            className="py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          />
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isSignInPage ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)}
            >
              {isSignInPage ? ' Sign Up' : ' Sign In'}
            </span>
          </p>
          {isSignInPage && (<a
              //href="#"
              onClick={() => navigate('/verify-otp')}
              className="block px-4 py-2 text-sm text-blue-600 cursor-pointer underline"
            >
            Verify OTP again
            </a>)}
        </div>
      </div>
    </div>
  );
}

export default Form;
