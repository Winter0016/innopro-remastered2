import React from 'react';
import { useState, useEffect } from 'react';
import { Employee } from './employee';
// import axios from 'axios';


export const Testing_api = () => {
    const API_URL = 'http://localhost:3500/employees';
    const [employees, setEmployees] = useState([]);
    const [mytab,setmytab] = useState(0);
    const [currentusername,setcurrentusername] = useState("");
    const[accesstoken,setaccesstoken] = useState("");
    const [currentrole,setcurrentrole] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newfirstname,setnewfirstname]=useState('');
    const [newlastname,setnewlastname]=useState('');
    const [error, setError] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isfunnctioning,setisfunctioning] = useState(false);

  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await axios.post('http://localhost:3500/auth', {
    //       user: username,
    //       pwd: password
    //     });
    //     console.log(response.data); // Handle successful login response
    //   } catch (error) {
    //     setError('Invalid username or password');
    //   }
    // };
    const handleSubmit = async (e) => {
        setIsSigningIn(true);
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3500/auth', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: username, pwd: password })
            });
        
            if (!response.ok) {
                setIsSigningIn(false);
                throw new Error('Invalid username or password');
            }
        
            const data = await response.json();
            setcurrentusername(data.USERNAME);
            setaccesstoken(data.accessToken);
            setcurrentrole(data.roles);
            setIsSigningIn(false);
            console.log(data); // Handle successful login response
        } catch (error) {
            setError(error.message);
        }
    };
    const handlePost = async (e) => {
        setisfunctioning(true);
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3500/employees', {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${accesstoken ? accesstoken : ''}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstname: newfirstname, lastname: newlastname })
            });
        
            if (!response.ok) {
                setisfunctioning(false);
                throw new Error("Unauthoritized");
            }
        
            const data = await response.json();
            console.log(data); // Handle successful post
            setisfunctioning(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not receive expected data');
                const listItems = await response.json();
                setEmployees(listItems);
            } catch (err) {
                console.log(err);
            }
        }
        fetchItems();
    }, [isfunnctioning]);
    const printroles = (array) =>{
        let print = array[0];
        for(let i = 1 ; i < array.length ; i++){
            print = print + " , " + array[i];
        }
        return print;
    }

    return (
        <div className='employees-container'>
            <div id='login-form-custom' className="w-full max-w-md p-8 rounded shadow-xl">
                <h2 id='login-text-custom' className="text-center text-2xl font-semibold mb-4">ADMIN</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label id='login-text-custom' htmlFor="username" className="block text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    {error && (
                        <p className="text-red-600">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md ${isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
            <h1>USER: {currentusername ? currentusername : ""}</h1>
            <h1>ACCESSTOKEN: {accesstoken ? "VALID" : "NONE"}</h1>
            <h1>ROLES: {currentrole ? printroles(currentrole) : ""} </h1>
            <table id='myfuckingtable' className="w-full border-collapse border-blue-400">
                <thead id='myfuckingtable'>
                    <h1 className='mb-3'>EMPLOYESS TABLE: </h1>
                    <tr id='myfuckingtable' className='text-2xl text-center'>
                        <th id='myfuckingtable' className="border-4 p-3">Firstname</th>
                        <th id='myfuckingtable' className="border-4 p-3">Lastname</th>
                        <th id='myfuckingtable' className="border-4 p-3">ID</th>
                    </tr>
                </thead>
                <tbody id='myfuckingtable' className=' text-xl'>
                    {employees.map((employee) => (
                        <Employee key={employee._id} data={employee} />
                    ))}
                </tbody>
            </table>
            <table className="">
                <thead className='w-full'>
                    <tr className='text-center w-full'>
                        <th className='border-4 p-3 hover:cursor-pointer hover:bg-gray-400' onClick={() => setmytab(0)}>POST</th>
                        <th className='border-4 p-3 hover:cursor-pointer hover:bg-gray-400' onClick={()=> setmytab(1)}>UPDATE</th>
                        <th className='border-4 p-3 hover:cursor-pointer hover:bg-gray-400'onClick={() => setmytab(2)}>DELETE</th>
                        <th className='border-4 p-3 hover:cursor-pointer hover:bg-gray-400'onClick={()=> setmytab(3)}>GET EMPLOYEE BY ID</th>
                    </tr>
                </thead>
            </table>
            {
                mytab === 0 && (
                    <form onSubmit={handlePost} className='w-full border-4 border-red-500 mb-40 p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>POST FUNCTION</div>
                        <div>
                            <label>FIRSTNAME:</label><br/>
                            <input type="text" value={newfirstname} onChange={(e) => setnewfirstname(e.target.value)}/>
                        </div>
                        <div>
                            <label>LASTNAME:</label><br/>
                            <input type="text"value={newlastname} onChange={(e) => setnewlastname(e.target.value)}/>
                        </div>
                        <button className='border-4 rounded-lg w-36 h-9 hover:bg-gray-400 text-center' type='submit'>{isfunnctioning? "Submitting.." : "Submit"}</button>
                    </form> 
                )
            }          
            {
                mytab === 1 && (
                    <form className='w-full border-4 border-red-500 mb-40 p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>UPDATE FUNCTION</div>
                        <div>
                            <label htmlFor="username">FIRSTNAME:</label><br/>
                            <input type="text" id="username" className='w-fit whitespace-nowrap' name="username"/>
                        </div>
                        <div>
                            <label htmlFor="username">NEW FIRSTNAME:</label><br/>
                            <input type="text" id="username" name="username"/>
                        </div>
                        <div>
                            <label htmlFor="username">LASTNAME:</label><br/>
                            <input type="text" id="username" className='w-fit whitespace-nowrap' name="username"/>
                        </div>
                        <div>
                            <label htmlFor="username">NEW LASTNAME:</label><br/>
                            <input type="text" id="username" name="username"/>
                        </div>
                    </form> 
                )
            }          
            {
                mytab === 2 && (
                    <form className='w-full border-4 border-red-500 mb-40 p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>DELETE FUNCTION</div>
                        <div>
                            <label htmlFor="username">ID:</label><br/>
                            <input type="text" id="username" className='w-fit whitespace-nowrap' name="username"/>
                        </div>
                    </form> 
                )
            }          
            {
                mytab === 3 && (
                    <form className='w-full border-4 border-red-500 mb-40 p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>GET FUNCTION</div>
                        <div>
                            <label htmlFor="username">ID:</label><br/>
                            <input type="text" id="username" className='w-fit whitespace-nowrap' name="username"/>
                        </div>
                    </form> 
                )
            }          
        </div>
    );
}