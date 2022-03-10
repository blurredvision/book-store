/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
//Importing the node modules needed for this page
import {useState, useEffect} from 'react'
import {verify} from 'jsonwebtoken'
import Navbar from '../../components/Default/Navbar'
import EmployeeBookList from '../../components/Books/EmployeeBookList'
import LogoutBtn from '../../components/Default/LogoutBtn'
import AccessDenied from '../../components/Default/AccessDenied'
import ShowAllRequests from '../../components/Books/ShowAllRequestsBtn'

//Has cookies, role, bookData and userData passed through as a prop from the server side
export default function EmployeeAllRequests({cookies, role, bookData, userData}) { 
  //Defines the states
  const [welcomeMessage, setWelcomeMessage] = useState(null)
  const [books, setBooks] = useState(bookData)

  //Decodes the token and gathers the name for the welcome message
  useEffect(() =>{
    verify(cookies.token, "BookStore", async function(err, decoded){
      if(!err && decoded){
          setWelcomeMessage(decoded.name)
      }
    })
  })

  //Checks if the user has permission to view this page if not they get denied. 
  if(role !== "employee"){
    return <AccessDenied />
  }

  return (
    <>
    {/* Renders the navbar */}
    <Navbar />
    {/* Container which contains the welcome message and the buttons */}
    <div className='container mx-auto text-center mt-5 text-lg font-bold'>
      {welcomeMessage ? <>
        <div className='max-w-5x'>
          <h1>Hello, {welcomeMessage}!</h1>
          <ShowAllRequests />
          <LogoutBtn />
        </div></> 
        : ""}
    </div>
    {/* Checks if books is not empty if not passes bookData and userData through EmployeeBookList component */}
    <div>
      {books ? <EmployeeBookList data={bookData.data} users={userData}/> : JSON.stringify(bookData.message)}
    </div>
    </>
  )
}

//Server side gathers the users role, all book data and the user data. 
export const getServerSideProps = async (ctx) => {
  const { req } = ctx
  const cookie = ctx.req?.headers.cookie
  const {cookies} = req
  var role = null

  verify(cookies.token, "BookStore", async function(err, decoded){
    if(!err && decoded){
        role = decoded.role
    }
  })

  const book = await fetch('http://localhost:3000/api/books/allBooks', {
      headers:{
          cookie: cookie
      }
  })

  const user = await fetch('http://localhost:3000/api/users', {
      headers:{
          cookie: cookie
      }
  })

  const books = await book.json()
  const users = await user.json()

  return { props: {cookies: cookies, role: role, bookData: books, userData: users} }
}