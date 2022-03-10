/* eslint-disable react-hooks/rules-of-hooks */
//Node modules needed for the component
import React, {useState} from 'react';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import Router from 'next/router'

function Login() {
    //Defining the states
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    //Login function to login the user and store the cookie
    const login = async (e) => {
        e.preventDefault(); 
        const options = {
          headers: {'Content-Type': 'application/json'}
        };
        await axios.post('http://localhost:3000/api/users/login', { name: loginEmail, password: loginPassword}, options).catch(function (response){
        }).then(x =>{
          if(x){
            if(x.data.authToken){
              const token = x.data.authToken
              if(token){
                const json = jwt.decode(token)
                if(json.role === "client")
                  Router.push('./client')
                else if(json.role === "employee"){
                  Router.push('./employee')
                }
                else if(json.role === "admin"){
                  Router.push('./admin')
                }
              }
            }
          } else{
            //If there is a issue then it will display this message
            setErrorMessage("Wrong username or password")
          }
        })
    }


  return (
    <>
        {/* Creates a container and has the login form for the user to login */}
        <h1 className='text-2xl font-medium text-primary mt-4 mb-3 text-center'>
        Log in to your account
        </h1>
        {!errorMessage ? 
          ""
          : <p className='text-center text-red-500 font-medium mb-12 text-primary'>{errorMessage}</p>}
                <form >
                    <div>
                        <label htmlFor='email'>Name</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='name'
                            placeholder='Your Name'
                            value={loginEmail}
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                              } }
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            value={loginPassword}
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                              } }
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            onClick={login}
                            className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green-500 focus:outline-none focus:border-green-800`}
                        >
                            Login
                        </button>
                    </div>
                </form>
          </>
  )
}

export default Login;
