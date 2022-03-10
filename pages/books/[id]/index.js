//Importing node modules needed for the page
import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import axios from 'axios';
import Navbar from '../../../components/Default/Navbar';
import {verify} from 'jsonwebtoken'

//bookData, role, id, userData passed through the props from the server
function Index({bookData, role, id, userData}) {
    //Defining the states and the router
    const [isDeleting, setIsDeleting] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [isDenied, setIsDenied] = useState(false)
    const [isAllowed, setIsAllowed] = useState(false)
    const router = useRouter()

    //Use effect to see if the user is not a client if its true the IsAllowed state gets set to true
    useEffect(() =>{
        if(role != "client"){
            setIsAllowed(true)
        }
    })

    //If isApproved is true the approveBook function runs
    useEffect(() =>{
        if(isApproved){
            approveBook()
        }
    }, [isApproved])

    //If isDenied is true the denyBook function runs
    useEffect(() =>{
        if(isDenied){
            denyBook()
        }
    }, [isDenied])
    
    //If isDeleting is true the deleteBook function runs
    useEffect(() =>{
        if(isDeleting){
            deleteBook()
        }
    }, [isDeleting])

    //This is the deleteBook function where the book gets deleted by using the book id
    const deleteBook = async () =>{
        const bookId = router.query.id
        try {
            const deleted = await fetch(`http://localhost:3000/api/books/${bookId}`, {
                method: "Delete"
            })

            router.push("/client")
        } catch (error) {
            console.log(error);
        }
    }

    //This is the approveBook function where the employee can approve the book, it also charges the user
    const approveBook = async () =>{
        const bookId = router.query.id
        var isApproved = "Accepted"
        var userCredits
        try{
            //Checks which user requestsed it
            for(let i in userData.data){
                if(userData.data[i]._id == bookData.createdBy){
                    //Calculates the cost
                    var temp = parseInt(userData.data[i].credits) - parseInt(bookData.price)
                    //If user has sufficient money it will deduct it, if not it will decline the book and the user wouldnt be charged
                    if(temp > 0){
                        userCredits = Math.round((parseFloat(userData.data[i].credits) - parseFloat(bookData.price)) * 100) / 100
                    }
                    else{
                        isApproved = "Declined"
                        userCredits = userData.data[i].credits
                    }
                }
            }

            //Updates the book using this fetch
            await fetch(`http://localhost:3000/api/books/${bookId}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({bookStatus: isApproved, allocatedTo: id})
            })

            //Updates the user using the fetch
            await fetch(`http://localhost:3000/api/users/${bookData.createdBy}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({credits: userCredits})
            })

            router.back()
        }catch(error){
            console.log(error)
        }
    }

    //This is the denyBook where the employee's can deny the request
    const denyBook = async () =>{
        const bookId = router.query.id
        try{

            //Updates the book using the fetch
            await fetch(`http://localhost:3000/api/books/${bookId}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({bookStatus: "Declined", allocatedTo: id})
            })

            router.back()
        }catch(error){
            console.log(error)
        }
    }

    //If called sets isDeleting to true so useEffect will the contents
    const handleDelete = async () =>{
        setIsDeleting(true)
    }

    //If called sets isApproved to true so useEffect will the contents
    const handleApprove = async () =>{
        setIsApproved(true)
    }

    //If called sets isDenied to true so useEffect will the contents
    const handleDeny = async () =>{
        setIsDenied(true)
    }

  return (
      <>
      {/* Renders the navbar */}
      <Navbar />
      {/* Creates a container and outputs the book data */}
      <div>
          {isDeleting
            ? "Loading"
            : 
            <>
            <div className='container mx-auto p-10'>
            <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{bookData.title}</div>
                    <p className='text-gray-700 text-base mb-2'>Author: {bookData.author}</p>
                    <p className='text-gray-700 text-base mb-2'>Release Year: {bookData.releaseYear}</p>
                    <p className='text-gray-700 text-base mb-2'>Price: £{bookData.price}</p>
                    <p className='text-gray-700 text-base mb-2'>Description: {bookData.description}</p>
                    {isAllowed ? 
                    <>
                        <button onClick={handleApprove} className='w-full mt-2 bg-green-500 p-1 px-3 text-sm rounded cursor-pointer font-bold mb-2'>Approve</button>
                        <button onClick={handleDeny} className='w-full mt-2 bg-orange-500 p-1 px-3 text-sm rounded cursor-pointer font-bold mb-2'>Deny</button>
                    </>
                    : 
                    null}
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

//Server decodes the cookie and does requests to the books and users endpoint and passes it through the props
export const getServerSideProps = async (ctx) => {
    const cookie = ctx.req?.headers.cookie
    const {req} = ctx
    const {cookies} = req
    var role
    var id

    verify(cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            role = decoded.role
            id = decoded.sub
        }
      })

    const books = await axios.get(`http://localhost:3000/api/books/${ctx.params.id}`, {headers:{cookie: cookie}})
    const users = await axios.get(`http://localhost:3000/api/users`, {headers:{cookie: cookie}})

    return { 
        props:{
            bookData: books.data.data,
            userData: users.data,
            role: role,
            id: id
        }
    }
}
  
export default Index;