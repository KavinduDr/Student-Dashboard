'use client'
require("dotenv").config();
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { toast } from "sonner";


const SignIn = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        registrationNumber: '',
        password: '',
    })

    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    }

    const { setUser } = useUser();
    const [apiUrl, setApiUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This will run only on the client side
            if (window.location.hostname === 'localhost') {
                setApiUrl('http://localhost:4000');
            } else {
                setApiUrl('http://52.64.209.177:4000');
            }
        }
    }, []);
    const handleSignIn = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/v1/login-user`, {
                registrationNumber: formData.registrationNumber,
                password: formData.password,
            })

            if (response.status === 200 || response.data.success) {
                const token = response.data.accessToken; // accesstoken
                sessionStorage.setItem('name', response.data.user.name);
                if (rememberMe) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }
                setUser(response.data.user)
                toast.success('Logged in successfully!');
                router.push('/dashboard');
            }
            else {
                alert('Invalid credentials')
                toast.error('Invalid credentials');
            }
        }
        catch (error) {
            // console.error('Error during sign in:', error);
            alert(`An error occurred. Please try again. ${error}`);
            toast.error('An error occurred. Please try again.');
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
                        <p className="text-sm text-gray-600">Sign in to continue your learning</p>
                    </div>

                    {/* Illustration */}
                    <div className="flex justify-center mb-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <Image className="relative w-32 h-auto rounded-lg" src="/SignIn.png" alt='sign in image' width={380} height={380} />
                        </div>
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
                            <label htmlFor="password" className="block mb-1 text-xs font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input type="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent block w-full pl-9 p-2.5 transition-all duration-200 hover:border-green-300" placeholder="••••••••" />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center">
                                <input id="rememberMe" type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer" />
                                <label htmlFor="rememberMe" className="ml-2 text-xs font-medium text-gray-700 cursor-pointer">Remember me</label>
                            </div>
                            <button className="text-xs font-medium text-green-600 hover:text-green-700 hover:underline transition-colors duration-200">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignIn}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 text-center">
                        <p className="text-xs text-gray-600">
                            Don&apos;t have an account?{' '}
                            <button
                                onClick={() => router.push('/signup')}
                                className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>

                {/* Additional info */}
                <p className="text-center text-xs text-gray-500 mt-3">
                    Secure login • Your data is protected
                </p>
            </div>
        </div>
    );
}

export default SignIn;
