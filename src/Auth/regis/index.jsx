import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/shopContext';
import images from '../../images/images';
import { doCreateUserWithEmailAndPassword} from '../../myfirebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../../myfirebase/firebase-config';

function Register() {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const{setchangebackground} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [username,setusername] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match');
                setIsRegistering(false);
                return;
            }
            try {
                await doCreateUserWithEmailAndPassword(email, password,username);
                navigate('/login'); // Redirect to login after successful registration
            } catch (error) {
                setIsRegistering(false);
                setErrorMessage(error.message); // Set more informative error message
            }
        }
    };
    return (
        <div className='login-container'>
            <main id='login-container-custom' className="flex items-center h-screen flex-wrap">
                <div id='login-form-custom' className="w-full max-w-md p-8 rounded shadow-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 id='login-text-custom' className="text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label id='login-text-custom' className="text-sm font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label id='login-text-custom' className="text-sm font-bold">Username</label>
                            <input
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label id='login-text-custom' className="text-sm font-bold">Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label id='login-text-custom' className="text-sm  font-bold">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                                isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'
                            }`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div id='login-text-custom' className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to="/login" id='login-text-custom' className="text-center text-sm hover:underline font-bold">
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
                <img id='login-img-custom' src={images.city} alt="" />
            </main>
        </div>
    );
};

export default Register;
