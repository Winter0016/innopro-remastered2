import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../myfirebase/auth';
import { useAuth } from '../../context/shopContext';
import images from '../../images/images';
export const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setIsSigningIn(false);
                setErrorMessage("Error signing in with Google!"); // Set error message from Firebase
            }
        }
    };

    return (
        <div className='login-container'>
            {userLoggedIn && (<Navigate to={'/'} />)}
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
                    <p id='login-text-custom' className="text-center text-sm mt-4">Don't have an account? <Link to={'/register'} className="text-indigo-600 font-semibold hover:underline">Sign up</Link></p>
                    <div className="flex items-center mt-6">
                        <div className="w-full border-t border-gray-300"></div>
                        <p className="mx-3 text-sm">OR</p>
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <button
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                        className={`mt-6 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 ${isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.125 2.483 7.714 6.047 9.274-.088-.792-.149-1.604-.149-2.432 0-3.625 2.438-6.651 5.733-7.605-1.28-1.366-2.873-2.195-4.581-2.195-3.447 0-6.25 2.803-6.25 6.25s2.803 6.25 6.25 6.25c2.347 0 4.342-1.307 5.389-3.231 1.046.28 2.143.431 3.261.431 5.523 0 10-4.477 10-10zm-5.25-.625c0 .69-.56 1.25-1.25 1.25h-3.5v2.5c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25v-2.5h-3.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25h3.5V5.625c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v3.75h3.5c.69 0 1.25.56 1.25 1.25z" />
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
                <img id='login-img-custom' src={images.city} alt="" />
            </main>
        </div>
    );
};

export default Login;
