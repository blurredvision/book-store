//Imports the node modules needed for this page
import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import axios from 'axios';
import Navbar from '../../../components/Default/Navbar';

//Renders out the user for admins to manage and has the user data passed through as a prop
function Index({userData}) {
    //Defining states to be used later and router to redirect the user
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    //Run when it detects a change in the isDeleting state
    useEffect(() =>{
        if(isDeleting){
            //If so it runs the deleteUser function to delete the user from the database
            deleteUser()
        }
    }, [isDeleting])

    //Delete user function to delete the user by ID
    const deleteUser = async () =>{
        const userId = router.query.id
        try {
            const deleted = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: "Delete"
            })
            router.back()
        } catch (error) {
            console.log(error);
        }
    }

    //Sets the isDeleting state to true so the useEffect can run its part
    const handleDelete = async () =>{
        setIsDeleting(true)
    }

  return (
    <>
    {/* Renders the navbar */}
    <Navbar />
    <div>
        {/* If isDeleting is true it displays the loading message */}
        {isDeleting
          ? "Loading"
          : 
          <>
          {/* Else it creates a container with the user data such as Name, Email and Role */}
          <div className='container mx-auto p-10'>
          <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{userData.name}</div>
                  <p className='text-gray-700 text-base mb-2'>Email: {userData.email}</p>
                  <p className='text-gray-700 text-base mb-2'>Role: {userData.roles}</p>
                  <button onClick={handleDelete} className='w-full mt-2 bg-red-500 p-1 px-3 text-sm rounded cursor-pointer font-bold mb-2'>Delete</button>
                  <a onClick={() => router.back()} className='w-full bg-teal-300 p-1 px-3 text-sm rounded cursor-pointer font-bold text-center float-right mb-2'>Go Back</a>
              </div>
              </div>
          </div>
          </>
          }

    </div>
    </>
  )
}


//Server sided rendering to get data from the user as it calls the api by the user id. 
export const getServerSideProps = async (ctx) => {
    const cookie = ctx.req?.headers.cookie
    const resp = await axios.get(`http://localhost:3000/api/users/${ctx.params.id}`, {headers:{cookie: cookie}})
    return { 
        props:{
            userData: resp.data.data
        }
    }
}
  
export default Index;