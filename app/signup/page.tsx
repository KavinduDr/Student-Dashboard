'use client'

import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp: React.FC = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNumber: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This will run only on the client side
      if (window.location.hostname === 'localhost') {
        setApiUrl('http://localhost:4000');
      } else {
        //setApiUrl(`${process.env.AWS_URL}`);
        setApiUrl('http://52.64.209.177:4000');
      }
    }
  }, []);
  const handleSignUp = async () => {
    // console.log({
    //   name: formData.name,
    //   email: formData.email,
    //   password: formData.password,
    //   registrationNumber: formData.registrationNumber,
    // });
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const response = await axios.post(`${apiUrl}/api/v1/registration`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        registrationNumber: formData.registrationNumber,
      });

      if (response.status === 201 || response.data.success) {
        if (response.data.activationToken) {
            const token = response.data.activationToken;
            alert(`Registration successful! Please check your email to activate your account.`);
            router.push(`/activate?token=${token}`);
        } else {
            // Registration successful, and no activation needed
            router.push('/dashboard');
        }
      } else {
        // Handle error response
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle error
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  }

  return (
    <div className='w-full h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex justify-center items-center px-4 py-4 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-2 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
            <p className="text-sm text-gray-600">Join us and start your learning journey</p>
          </div>

          {/* Form */}
          <div className="space-y-3">
            <div className="relative">
              <label htmlFor="registrationNumber" className="block mb-1 text-xs font-semibold text-gray-700">Registration Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <input type="text" id="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-9 p-2.5 transition-all duration-200 hover:border-green-300" placeholder="EG/2020/1234" />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="name" className="block mb-1 text-xs font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-10 p-3 transition-all duration-200 hover:border-green-300" placeholder="John Doe" />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-10 p-3 transition-all duration-200 hover:border-green-300" placeholder="john@example.com" />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input type="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-10 p-3 transition-all duration-200 hover:border-green-300" placeholder="••••••••" />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-10 p-3 transition-all duration-200 hover:border-green-300" placeholder="••••••••" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300 mt-2"
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/signin')}
                className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Additional info */}
        <p className="text-center text-xs text-gray-500 mt-3">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignUp;
