import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { doSignInWithEmailAndPassword,doSignInWithGoogle,doSendEmailVerification } from '../../myfirebase/auth';
import { doPasswordReset } from '../../myfirebase/auth';

import { useAuth } from '../../context/shopContext';
import images from '../../images/images';
function Login(){
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
    const onGoogleSignIn =  async (e) =>{
        e.preventDefault();
        try{
            await doSignInWithGoogle();
            await doSendEmailVerification();
        }catch(err){
            setErrorMessage(err);
        }
    }

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
                    <div id='login-text-custom' className='flex flex-row text-center w-full mt-3'>
                        <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>OR</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                    </div>
                    <button id='login-text-custom'
                        disabled={isSigningIn}
                        onClick={(e) => { onGoogleSignIn(e) }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
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
