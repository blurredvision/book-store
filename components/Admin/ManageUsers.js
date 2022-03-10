/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
//Node modules needed for the component
import React from 'react';
import Link from 'next/link'

//Creates a container and inside of it there is a table of all the users except the current user isnt displayed in the table
function ManageUsers({id, users}) { 
    return (
      <div className='container mx-auto p-10'>
        <h1 className='max-w-5x font-bold text-3xl text-center mb-2'>All Users</h1>
        <table className='max-w-5xl mx-auto table-auto shadow-xl'>
          <thead className='justify-between'>
            <tr className='bg-teal-500'>
              <th className='px-8 py-2 items-center'>User</th>
              <th className='px-8 py-2 items-center'>Email</th>
              <th className='px-8 py-2 items-center truncate'>Role</th>
              <th className='px-8 py-2 items-center'></th>
            </tr>
          </thead>
          <tbody className='bg-gray-200'>
            {/* Loops through all of the user data and outputs it */}
            {users.data.map(user =>{
              return (
                user._id != id && (
                  <tr key={user._id} className='bg-white border-b-2 border-gray-200'>
                  <td className='px-5 py-2 text-center '>{user.name}</td>
                  <td className='px-5 py-2 text-center '>{user.email}</td>
                  <td className='px-5 py-2 text-center'>{user.roles}</td>
                  <td className='px-5 py-2 text-center'>
                      <Link href={`/user/${user._id}`}>
                      <span className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
                          View
                      </span>
                      </Link>
                      <Link href={`/user/${user._id}/edit`}>
                      <span className='bg-blue-500 p-1 px-3 text-sm rounded cursor-pointer m-1'>
                          Edit
                      </span>
                      </Link>
                  </td>
                  </tr>
                )
              )
          })}
          </tbody>
        </table>
      </div>
    )
}

export default ManageUsers;
