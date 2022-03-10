/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
//Importing componets thats needed for the page
import {useState, useEffect} from 'react'
import {verify} from 'jsonwebtoken'
import Navbar from '../../components/Default/Navbar'
import LogoutBtn from '../../components/Default/LogoutBtn'
import ManageUsers from '../../components/Admin/ManageUsers'
import ManageRequestsBtn from '../../components/Admin/ManageRequestsBtn'
import AccessDenied from '../../components/Default/AccessDenied'
import ShowAllBooksBtn from '../../components/Books/ShowAllBooksBtn'

//Passing through cookies, role, userData and id through the props from the server
export default function Client({cookies, role, userData, id}) { 
  const [welcomeMessage, setWelcomeMessage] = useState(null)
  const [users, setUsers] = useState(userData)

  //Creates a welcome message by decoding the jwt token and getting the user name
  useEffect(() =>{
    verify(cookies.token, "BookStore", async function(err, decoded){
      if(!err && decoded){
          setWelcomeMessage(decoded.name)
      }
    })
  })

  //Checks if the user is admin, if not it will be denied from viewing the page
  if(role !== "admin"){
    return <AccessDenied />
  }

  return (
    <>
    {/* Renders the navbar */}
    <Navbar />
    {/* Creates a container and displays the welcome message along with the manage request button and logout button */}
    <div className='container mx-auto text-center mt-5 text-lg font-bold'>
      {welcomeMessage ? <><div className='max-w-5x'><h1>Hello, {welcomeMessage}!</h1> <ShowAllBooksBtn role={role} /><ManageRequestsBtn /><LogoutBtn /></div></> : ""}
    </div>
    <div>
      {/* Checks if user is empty if not it will pass id and userData through the ManageUsers component */}
      {users ? <ManageUsers id={id} users={userData}/> : JSON.stringify(userData.message)}
    </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx
  const cookie = ctx.req?.headers.cookie
  const {cookies} = req
  var role = null
  var id

  verify(cookies.token, "BookStore", async function(err, decoded){
    if(!err && decoded){
        role = decoded.role
        id = decoded.sub
    }
  })

  const user = await fetch('http://localhost:3000/api/users', {
      headers:{
          cookie: cookie
      }
  })

  const users = await user.json()
  return { props: {cookies: cookies, role: role, userData: users, id: id} }
}