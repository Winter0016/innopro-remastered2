import React from 'react';
import { useState, useEffect } from 'react';
import { Employee } from './employee';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
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
    const [getid,setgetid]=useState('');
    const [error, setError] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isfunnctioning,setisfunctioning] = useState(false);
    const [getuser,setgetuser]=useState();
    const [errofetch,seterrorfetch]=useState("");   
    const defaultID = "666666666666666666666666";
    // console.log(`defaultid.length: ${defaultID.length}`)
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
    useEffect(() => {
        const getrefreshtoken = async () => {
            const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt:'));
            const cartItemsString = cookieValue ? cookieValue.substring(cookieValue.indexOf(':') + 1) : null;
            
            try {
                const response = await fetch(`http://localhost:3500/refresh/${cartItemsString}`, {
                    credentials: "include",
                });
                
                if (response.status === 401) {
                    throw new Error('NO JWT Token received.');
                } else if (response.status === 403) {
                    if(cookieValue){
                        throw new Error('NO user found at database');
                    }
                    else{
                        throw new Error("Currently unauthoritized")
                    }
                }
    
                const data = await response.json();
                setcurrentusername(data.USERNAME);
                setaccesstoken(data.accessToken);
                setcurrentrole(data.roles);
            } catch (error) {
                setError(error.message);
            }
        }
        getrefreshtoken();
    }, [])
    
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
                throw new Error('Invalid username or password');
            }
        
            const data = await response.json();
            setcurrentusername(data.USERNAME);
            setaccesstoken(data.accessToken);
            setcurrentrole(data.roles);
            document.cookie= `jwt:${data.refreshToken}`
            // const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt:'));
            // const cartItemsString = cookieValue ? cookieValue.substring(cookieValue.indexOf(':') + 1) : null;
            // console.log(`cookie : ${cartItemsString}`);
            setError("");
            // console.log(data); // Handle successful login response
        } catch (error) {
            setError(error.message);
        }
        setIsSigningIn(false);
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
                throw new Error("Unauthoritized");
            }
        
            // const data = await response.json();
            // console.log(data); // Handle successful post
            seterrorfetch("");

        } catch (error) {
            seterrorfetch(error.message);
        }
        setisfunctioning(false);
    };
    const handleDelete = async (e) => {
        setisfunctioning(true);
        e.preventDefault();
        try {
            if(getid){
                if(getid.length < defaultID.length || getid.length > defaultID.length){
                    throw new Error("Invalid ID")
                }
            }
            const response = await fetch('http://localhost:3500/employees', {
                method: 'DELETE',
                headers: {
                'Authorization': `Bearer ${accesstoken ? accesstoken : ''}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: getid })
            });
        
            if (!response.ok) {
                throw new Error("Unauthoritized");
            }
            if(response.status === 204){
                throw new Error("No employee matches the ID!")
            }
            // const data = await response.json();
            // console.log(data); // Handle successful post
            seterrorfetch("");

        } catch (error) {
            seterrorfetch(error.message);
        }
        setisfunctioning(false);

    };
    const handleUpdate = async (e) => {
        setisfunctioning(true);
        e.preventDefault();
        try {
            if(getid){
                if(getid.length < defaultID.length || getid.length > defaultID.length){
                    throw new Error("Invalid ID")
                }
            }
            const response = await fetch('http://localhost:3500/employees', {
                method: 'PUT',
                headers: {
                'Authorization': `Bearer ${accesstoken ? accesstoken : ''}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: getid ,firstname: newfirstname, lastname: newlastname })
            });
        
            if (!response.ok) {
                throw new Error("Unauthoritized");
            }
            if(response.status === 204){
                throw new Error("No employee matches the ID!")
            }
            // const data = await response.json();
            // console.log(data); // Handle successful post
            seterrorfetch("");

        } catch (error) {
            seterrorfetch(error.message);
        }
        setisfunctioning(false);
    };
    const handleGet = async (e) => {
        setisfunctioning(true);
        e.preventDefault();
        try {
            if(getid){
                if(getid.length < defaultID.length || getid.length > defaultID.length){
                    throw new Error("Invalid ID")
                }
            }
            const response = await fetch(`http://localhost:3500/employees/${getid}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${accesstoken ? accesstoken : ''}`,
                'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                setisfunctioning(false);
                throw new Error("Unauthoritized");
            }  
            if(response.status === 204){
                throw new Error("No employee matches the ID!")
            }
            const data = await response.json();      
            setgetuser(data);
            // console.log(data); // Handle successful post
            seterrorfetch("");
        } catch (error) {
            seterrorfetch(error.message);
        }
        setisfunctioning(false);

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
    // if(employees)
    //     console.log(`employees: ${JSON.stringify(employees)}`)
    let arrayuser = []
    if(getuser){
        // console.log(`getuser : ${JSON.stringify(getuser)}`)
        arrayuser.push(getuser);
    }

    const clearAllCookies = () => {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookieParts = cookies[i].split('=') || cookies[i].split('=') ;
            const cookieName = cookieParts[0];
            document.cookie = `${cookieName}; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
        console.log(`document.cookie: ${document.cookie}`)
    };
    // clearAllCookies();

    const [messages,setmessages] = useState([
        {
            message: "Hello from chatbot",
            direction:"incoming",
        },
    ])
    const [isTyping, setIsTyping] = useState(false);

    const handlesend = async (message) => {
        // console.log(`message: ${message}`);
        const newmessage = {
            message,
            direction: "outgoing",
        }


        setIsTyping(true);
        try{
            setmessages([...messages,newmessage]);
            // console.log("setnewmessage: ", JSON.stringify(messages));
            const response = await fetch("http://localhost:3500/messend",{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({"mess":newmessage.message})
            });
            const data = await response.json();
            const chatbotmessage = {
                message: data,
                direction:"incoming",
            }
            setTimeout( () => {
                setmessages([...messages,newmessage,chatbotmessage]);
                setIsTyping(false);
            },3000)
        }catch(err){
            console.log(err);
        }
        // console.log(JSON.stringify(messages));
    }
    return (
        <div className='employees-container'>
            <div id='login-form-custom' className="w-full max-w-md p-8 rounded shadow-xl">
                <h2 id='login-text-custom' className="text-center text-2xl font-semibold mb-4">ADMIN: {currentusername ? currentusername : ""}</h2>
                {
                    currentusername ? (
                        <>  
                            <form onSubmit={() => clearAllCookies()}>
                                <button
                                    type="submit"
                                    className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700`}
                                >
                                    LOGOUT
                                </button>
                            </form>
                        </>
                    ):(
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
                    )
                }
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
                        <th className='border-2 bg-red-300 p-3 hover:cursor-pointer hover:bg-gray-400' onClick={() => setmytab(0)}>POST</th>
                        <th className='border-2 bg-red-300 p-3 hover:cursor-pointer hover:bg-gray-400' onClick={()=> setmytab(1)}>UPDATE</th>
                        <th className='border-2 bg-red-300 p-3 hover:cursor-pointer hover:bg-gray-400'onClick={() => setmytab(2)}>DELETE</th>
                        <th className='border-2 bg-red-300 p-3 hover:cursor-pointer hover:bg-gray-400'onClick={()=> setmytab(3)}>GET EMPLOYEE BY ID</th>
                    </tr>
                </thead>
            </table>
            {
                mytab === 0 && (
                    <form onSubmit={handlePost} className='min-w-96 bg-gray-300 rounded-lg p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>POST FUNCTION</div>
                        <div className='w-full text-center text-red-600'>REQUIRED ROLES : 5150 or 1984</div>
                        <div>
                            <label>FIRSTNAME:</label><br/>
                            <input type="text" value={newfirstname} onChange={(e) => setnewfirstname(e.target.value)} required/>
                        </div>
                        <div>
                            <label>LASTNAME:</label><br/>
                            <input type="text"value={newlastname} onChange={(e) => setnewlastname(e.target.value)} required/>
                        </div>
                        {errofetch ? (<h2 className='text-red-600'>{errofetch}</h2>): ""}
                        <button className='border-4 rounded-lg w-36 h-9 hover:bg-gray-400 text-center' type='submit'>{isfunnctioning? "Submitting.." : "Submit"}</button>
                    </form> 
                )
            }          
            {
                mytab === 1 && (
                    <form onSubmit={handleUpdate} className='min-w-96 bg-gray-300 rounded-lg  p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>UPDATE FUNCTION</div>
                        <div className='w-full text-center text-red-600'>REQUIRED ROLES : 5150 or 1984</div>
                        <div>
                            <label>ID:</label><br/>
                            <input value={getid} onChange={(e)=> setgetid(e.target.value)} type="text" required/>
                        </div>
                        <div>
                            <label>NEW FIRSTNAME:</label><br/>
                            <input value={newfirstname} onChange={(e)=> setnewfirstname(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <label>NEW LASTNAME:</label><br/>
                            <input value={newlastname} onChange={(e)=> setnewlastname(e.target.value)} type="text"/>
                        </div>
                        {errofetch ? (<h2 className='text-red-600'>{errofetch}</h2>): ""}
                        <button className='border-4 rounded-lg w-36 h-9 hover:bg-gray-400 text-center' type='submit'>{isfunnctioning? "Submitting.." : "Submit"}</button>
                    </form> 
                )
            }          
            {
                mytab === 2 && (
                    <form onSubmit={handleDelete} className='min-w-96 bg-gray-300 rounded-lg  p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>DELETE FUNCTION</div>
                        <div className='w-full text-center text-red-600'>REQUIRED ROLES : 5150</div>
                        <div>
                            <label>ID:</label><br/>
                            <input type="text" value={getid} onChange={(e)=> setgetid(e.target.value)}/>
                        </div>
                        {errofetch ? (<h2 className='text-red-600'>{errofetch}</h2>): ""}
                        <button className='border-4 rounded-lg w-36 h-9 hover:bg-gray-400 text-center' type='submit'>{isfunnctioning? "Submitting.." : "Submit"}</button>
                    </form> 
                )
            }          
            {
                mytab === 3 && (
                    <form onSubmit={handleGet} className='min-w-96 bg-gray-300 rounded-lg  p-4 flex flex-col items-center gap-4'>
                        <div className='w-full text-center'>GET FUNCTION</div>
                        <div className='w-full text-center text-red-600'>NO ROLE REQUIRED</div>
                        <div>
                            <label>ID:</label><br/>
                            <input type="text" value={getid} onChange={(e) => setgetid(e.target.value)}/>
                        </div>
                        {getuser && (
                            <div>
                                {arrayuser.map(user => (
                                    <div key={user._id}>
                                        <div>ID: {user._id}</div>
                                        <div>FIRSTNAME: {user.firstname}</div>
                                        <div>LASTNAME: {user.lastname}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errofetch ? (<h2 className='text-red-600'>{errofetch}</h2>): ""}
                        <button className='border-4 rounded-lg w-36 h-9 hover:bg-gray-400 text-center' type='submit'>{isfunnctioning? "Submitting.." : "Submit"}</button>
                    </form> 
                )
            }
            <div style={{ position:"relative", height: "500px", width: "700px", marginBottom :"5rem", overflow :"auto"  }}>
                <MainContainer>
                    <ChatContainer>       
                    <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="CHATBOT is typing" /> : null}>
                        {messages.map((message, i) => (
                            <Message
                                key={i}
                                model={message}
                            />
                        ))}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handlesend}/>        
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}