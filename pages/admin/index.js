/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
//Importing componets thats needed for the page
import {useState, useEffect} from 'react'
import jwt, {verify} from 'jsonwebtoken'
import Navbar from '../../components/Default/Navbar'
import EmployeeBookList from '../../components/Books/EmployeeBookList'
import LogoutBtn from '../../components/Default/LogoutBtn'
import ManageUsersBtn from '../../components/Admin/ManageUsersBtn'
import AccessDenied from '../../components/Default/AccessDenied'
import ShowAllBooksBtn from '../../components/Books/ShowAllBooksBtn'


export default function Client({cookies, role, bookData, userData}) { 
  //Defining the state
  const [welcomeMessage, setWelcomeMessage] = useState(null)
  const [books, setBooks] = useState(bookData)

  //Creates the welcome message by verifying the JWT token
  useEffect(() =>{
    verify(cookies.token, "BookStore", async function(err, decoded){
      if(!err && decoded){
          setWelcomeMessage(decoded.name)
      }
    })
  })

  //Checks if user role is admin, if not it will deny the access to view the page
  if(role !== "admin"){
    return <AccessDenied />
  }

  return (
    <>
    {/* Render the navbar */}
    <Navbar />
    {/* Creates a container and displays the welcome message along with the Manage User button and logout button */}
    <div className='container mx-auto text-center mt-5 text-lg font-bold'>
      {welcomeMessage ? <><div className='max-w-5x'><h1>Hello, {welcomeMessage}!</h1> <ShowAllBooksBtn role={role} /><ManageUsersBtn /><LogoutBtn /></div></> : ""}
    </div>
    <div>
      {/* Checks if books is empty, if not it will pass through the bookData and userData in EmployeeBookList component */}
      {books ? <EmployeeBookList data={bookData.data} users={userData}/> : JSON.stringify(bookData.message)}
    </div>
    </>
  )
}

//Server gets the user role and makes requests to the employee and users endpoint and pass it through the props
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
  
    const book = await fetch('http://localhost:3000/api/books/employee', {
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