/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
//Importing the node modules for the page
import {useState, useEffect} from 'react'
import {verify} from 'jsonwebtoken'
import Navbar from '../../components/Default/Navbar'
import EmployeeBookList from '../../components/Books/EmployeeBookList'
import LogoutBtn from '../../components/Default/LogoutBtn'
import AccessDenied from '../../components/Default/AccessDenied'
import ShowAllBooksBtn from '../../components/Books/ShowAllBooksBtn'

//Function that has cookies, role, bookData and userData passed through as a prop from the server
export default function Employee({cookies, role, bookData, userData}) { 
  //Defining the states
  const [welcomeMessage, setWelcomeMessage] = useState(null)
  const [books, setBooks] = useState(bookData)

  //useEffect to decode the cookie to determine if the user has access to view the page
  useEffect(() =>{
    verify(cookies.token, "BookStore", async function(err, decoded){
      if(!err && decoded){
          setWelcomeMessage(decoded.name)
      }
    })
  })

  //if statement to check if user is employee if not they have no access to view the page
  if(role !== "employee"){
    return <AccessDenied />
  }

  return (
    <>
    {/* Renders the navbar */}
    <Navbar />
    {/* Creates a container with the message and the show all request book button and the logout button */}
    <div className='container mx-auto text-center mt-5 text-lg font-bold'>
      {welcomeMessage ? <>
        <div className='max-w-5x'>
          <h1>Hello, {welcomeMessage}!</h1>
          <ShowAllBooksBtn role={role} />
          <LogoutBtn />
        </div></> 
        : ""}
    </div>
    {/* Check if the book state is empty if not it'll pass the userData and bookData to a EmployeeBookList component */}
    <div>
      {books ? <EmployeeBookList data={bookData.data} users={userData}/> : JSON.stringify(bookData.message)}
    </div>
    </>
  )
}

//Server sided gathering the employee and users endpoint and also decoding the role before the user enters the site to determine if they ahve access or not
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