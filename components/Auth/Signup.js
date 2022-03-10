/* eslint-disable react-hooks/rules-of-hooks */
//Node modules needed for the component
import React, {useState} from 'react';
import axios from 'axios'
import Router from 'next/router'

function Signup() {
    //Defines all the states
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    //Signup function to create a user and add it to the database
    const signup = async (e) => {
        e.preventDefault(); 
        const options = {
          headers: {'Content-Type': 'application/json'}
        };
        await axios.post('http://localhost:3000/api/users/register', { name: registerName, email: registerEmail,  password: registerPassword}, options)
        Router.reload()
    }


  return (
    <>
        {/* Container with the Signup form */}
        <h1 className='text-2xl font-medium text-primary mt-4 mb-3 text-center'>
        Create a account
        </h1>
          {!errorMessage ? 
          ""
          : <p className='text-center text-red-500 font-medium mb-12 text-primary'>{errorMessage}</p>}
                <form >
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='name'
                            placeholder='Your Name'
                            value={registerName}
                            onChange={(event) => {
                                setRegisterName(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Name</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                            value={registerEmail}
                            onChange={(event) => {
                                setRegisterEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            value={registerPassword}
                            onChange={(event) => {
                                setRegisterPassword(event.target.value);
                              } }
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            onClick={signup}
                            className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green-500 focus:outline-none focus:border-green-800`}
                        >
                            Create account
                        </button>
                    </div>
                </form>
          </>
  )
}

export default Signup;
