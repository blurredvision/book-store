/* eslint-disable @next/next/link-passhref */
//Node modules needed for this component
import React from 'react';
import Link from 'next/link'

function EmployeeBookList({data, users}) {
    //Converts the timestamp to a readable string
    const convertDate = (timeStamp) =>{
      var requestDate = new Date(timeStamp)
      return (
        requestDate.toLocaleDateString("en-US")
      )
    }
  
    //A function that outputs all of the users in the database except the current users
    const getName = (id) =>{
        for(let i in users.data){
            if(users.data[i]._id == id){
                return(
                    users.data[i].name
                )
            }
        }
    }

    //A function that outputs appropriate badges for the status part in the table
    const createBadge = (badgeName, id) =>{
      if(badgeName == "Waiting"){
        return (
          <>
          <td className='px-5 py-2 text-center'>
            <span className='bg-orange-300 py-1 px-4 text-xs rounded-full'>
              Waiting
            </span>
          </td>
          <td className='px-5 py-2 text-center'>
            <Link href={`/books/${id}`}>
              <span className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
                View
              </span>
            </Link>
          </td>
          </>
        )
      } else if(badgeName == "Declined"){
        return (
          <>
          <td className='px-5 py-2 text-center'>
          <span className='bg-red-300 py-1 px-4 text-xs rounded-full'>
            Declined
          </span>
          </td>
          <td className='px-5 py-2 text-center'>
            <Link href={`/books/${id}`}>
              <span className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
                View
              </span>
            </Link>
          </td>
          </>
        )
      } else if(badgeName == "Accepted"){
        return (
          <>
          <td className='px-5 py-2 text-center'>
          <span className='bg-green-300 py-1 px-4 text-xs rounded-full'>
            Accepted
          </span>
          </td>
          <td className='px-5 py-2 text-center'>
            <Link href={`/books/${id}`}>
              <span className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
                View
              </span>
            </Link>
          </td>
          </>
        )
      }
    }

    return (
      //Creates a container within the container there is a table with all of the book request that are still waiting to be worked on
      <div className='container mx-auto p-10'>
        <h1 className='max-w-5x font-bold text-3xl text-center mb-2'>Book Requests</h1>
        <table className='max-w-5xl mx-auto table-auto shadow-xl'>
          <thead className='justify-between'>
            <tr className='bg-teal-500'>
              <th className='px-8 py-2 items-center'>User</th>
              <th className='px-8 py-2 items-center'>Title</th>
              <th className='px-8 py-2 items-center truncate'>Released Year</th>
              <th className='px-8 py-2 items-center'>Author</th>
              <th className='px-8 py-2 items-center'>Price</th>
              <th className='px-8 py-2 items-center'>Request Date</th>
              <th className='px-10 py-2 items-center'>Status</th>
              <th className='px-8 py-2 items-center'></th>
            </tr>
          </thead>
          <tbody className='bg-gray-200'>
            {/* Loops through the book data and outputs it */}
            {data.map(book =>(
            <tr key={book._id} className='bg-white border-b-2 border-gray-200'>
            <td className='px-5 py-2 text-center '>{getName(book.createdBy)}</td>
            <td className='px-5 py-2 text-center '>{book.title}</td>
            <td className='px-5 py-2 text-center'>{book.releaseYear}</td>
            <td className='px-5 py-2 text-center'>{book.author}</td>
            <td className='px-5 py-2 text-center'>£{book.price}</td>
            <td className='px-5 py-2 text-center'>{convertDate(book.createdAt)}</td>
            {createBadge(book.bookStatus, book._id)}
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default EmployeeBookList;
