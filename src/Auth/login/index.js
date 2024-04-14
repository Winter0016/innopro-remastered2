import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { doSignInWithEmailAndPassword } from '../../myfirebase/auth';
import { doPasswordReset } from '../../myfirebase/auth';

import { useAuth } from '../../context/shopContext';
import images from '../../images/images';
export const Login = () => {
    const { userLoggedIn } = useAuth();
    const{setchangebackground} = useAuth();
    const [sendemailreset ,setsendemailreset] = useState('');
    const [sendedemail,setsendedemail] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [forgotpass,setforgotpass] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setIsSigningIn(false);
                setErrorMessage("Wrong password or invalid account!"); // Set error message from Firebase
            }
        }
    };
    useEffect(() => {
        let timer;
        if (sendedemail) {
          timer = setTimeout(() => {
            setsendedemail(false);
          }, 5000);
        }
        return () => clearTimeout(timer);
      }, [sendedemail]);

      useEffect(() => {
        if (userLoggedIn) {
            setchangebackground(false); // Update background upon user login
            navigate('/'); // Navigate to home page upon user login
        }
    }, [userLoggedIn, setchangebackground, navigate]);

    return (
        <div className='login-container'>
            <main id='login-container-custom' className="flex items-center h-screen flex-wrap">
                <div id='login-form-custom' className="w-full max-w-md p-8 rounded shadow-xl">
                    <h2 id='login-text-custom' className="text-center text-2xl font-semibold mb-4">Welcome Back</h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label id='login-text-custom' htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                            />
                        </div>
                        <div>
                            <label id='login-text-custom' htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-600">{errorMessage}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md ${isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p id='login-text-custom' className="text-center text-sm mt-4">Don't have an account? <Link to={'/register'} className="text-indigo-600 font-semibold hover:underline" onClick={() => setchangebackground(true)}>Sign up</Link></p>
                    {
                        forgotpass ? (                                
                            <form className='mt-2' onSubmit={(e) => {doPasswordReset(sendemailreset); e.preventDefault(); setforgotpass(false); setsendedemail(true) }}>
                                <label id='login-text-custom' htmlFor="resetpassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter your gmail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={sendemailreset}
                                    onChange={(e) => setsendemailreset(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    // disabled={isSigningIn}
                                    className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md ${isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                                >
                                    Send Email.
                                    {/* {isSigningIn ? 'Signing In...' : 'Sign In'} */}
                                </button>
                            </form>
                        ):(
                            <>
                                <p id='login-text-custom' className="text-center text-sm mt-3">Forgot password? <span className="text-indigo-600 font-semibold hover: cursor-pointer" onClick={()=> setforgotpass(true)}>Reset Password</span></p>
                                {
                                    sendedemail ? (
                                        <p id='reset-text-custom' className="text-center text-sm mt-3">Đã gửi resetpassword qua email.</p>
                                    ):(
                                        <>

                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
                <img id='login-img-custom' src={images.city} alt="" />
            </main>
        </div>
    );
};

export default Login;
