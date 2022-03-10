/* eslint-disable @next/next/link-passhref */
//Importing node modules that are used in the page
import {useState, useEffect} from 'react'
import {verify} from 'jsonwebtoken'
import Navbar from '../../components/Default/Navbar'
import BookList from '../../components/Books/BookList'
import LogoutBtn from '../../components/Default/LogoutBtn'
import AccessDenied from '../../components/Default/AccessDenied'

//cookies, roles and booData passed through the prop from the server 
export default function Client({cookies, role, bookData}) { 
  //Defining the states
  const [welcomeMessage, setWelcomeMessage] = useState(null)
  const [books, setBooks] = useState(bookData.data)

  //decodes the cookie and gets the username and sets it in the welcomeMessage state
  useEffect(() =>{
    verify(cookies.token, "BookStore", async function(err, decoded){
      if(!err && decoded){
          setWelcomeMessage(decoded.name)
      }
    })
  })

  //Checks if the user has access to view the page
  if(role !== "client"){
    return <AccessDenied />
  }

  return (
    <>
    {/* Renders the navbar */}
    <Navbar />
    {/* Creates a container with the welcome message and also how much credits the have. Also has the logout button */}
    <div className='container mx-auto text-center mt-5 text-lg font-bold'>
      {welcomeMessage ? <><div className='max-w-5x'><h1>Hello, {welcomeMessage}! You have £{bookData.data.credits} in your account</h1> <LogoutBtn /></div></> : ""}
    </div>
    {/* Checks if books is empty if not passes the book data through the BookList component */}
    <div>
      {books ? <BookList data={books.books} /> : JSON.stringify(bookData.message)}
    </div>
    </>
  )
}

//Server side where it decodes the role of the user and makes a request to the user books endpoint and pass it through the props
export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx
  const cookie = ctx.req?.headers.cookie
  const {cookies} = req
  var role = null

  verify(cookies.token, "BookStore", async function(err, decoded){
    if(!err && decoded){
        role = decoded.role
    }
  })

  const resp = await fetch('http://localhost:3000/api/users/books', {
      headers:{
          cookie: cookie
      }
  })

  const json = await resp.json()
  return { props: {cookies: cookies, role: role, bookData: json} }
}