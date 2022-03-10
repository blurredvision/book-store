//Import the node modules needed for this file
import React, {useState, useEffect} from 'react';
import Login from '../components/Auth/Login';
import Navbar from '../components/Default/Navbar';
import Signup from '../components/Auth/Signup';
import {verify} from 'jsonwebtoken'
import Link from 'next/link'

//The render as the cookie is being passed as a prop from the server side
function Index({cookies}) {
    //Defining states
    const [index, setIndex] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [role, setRole] = useState("")

    //Toggle if either login/signup should be shown or the dashboard button
    const toggleIndex = () =>{
        setIndex((prevState) => !prevState)
    }

    //Runs at the start to identify user
    useEffect(() =>{
        verify(cookies.token, "BookStore", async function(err, decoded){
            if(!err && decoded){
                setIsAuth(true)
                setRole(decoded.role)
            }
        })
    })
  return (
    
    <>
    {/* Renders the navbar as its a component */}
    <Navbar />
    {/* Creates a container  */}
    <div className='h-screen flex'>
        {/* Checks if the user is authenticated if not it'll show the user the login/sign up box */}
        {!isAuth ?  <div className='w-full max-w-md m-auto bg-white rouned-lg border shadow-default py-10 px-16'>
            {!index ? <Login /> : <Signup />}
            <a className="cursor-pointer hover:text-teal-400" onClick={toggleIndex}>
                {!index ? "New user? Click here " : "Already have an acount?"}
            </a>
        </div> 
        :
        //Else show the message and the dashboard button
        <div className='mx-auto mt-5'>
            <h1 className='text-center mb-2'>Welcome to the library</h1>
            <Link href={`/${role}`}>
                <a className='bg-green-300 p-1 px-3 font-bold rounded cursor-pointer m-5'>
                    Dashboard
                </a>
            </Link>
        </div>}
    </div>
    </>
  )
}

export default Index;

//Server sided rendering to get the cookie from the headers and passes through as a prop
export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: {cookies: cookies} }
  }
