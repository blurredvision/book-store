/* eslint-disable react-hooks/exhaustive-deps */
//Importing the node modules needed for the page
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import {verify} from 'jsonwebtoken'
import Navbar from '../../components/Default/Navbar';
import axios from 'axios';

//ID of the user passed through the prop from server
function New({id}) {
    //Defining the states and the router
    const [form, setForm] = useState({title: '', description: '', price: '', releaseYear: '', author: '', createdBy: id})
    const [isSubmitting, setIsSubmitting] = new useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    //useEffect to check if there are errors if not addBook function will be ran
    useEffect(() =>{
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                addBook()
            }
            else{
                setIsSubmitting(false)
            }
        }
    }, [errors])

    //this function adds a book to the database
    const addBook = async () =>{
        try {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            await axios.post('http://localhost:3000/api/books', form, options).catch((error) =>{
                setIsSubmitting(false)
                window.alert(form.title + " already exists")
            }).then((response) =>{
                if(response.data.success){
                    router.push("/client")
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Here it prevents the page from reloading and checks if there are any errors in the form and sets the errors in the error state
    const handleSubmit = (e) =>{
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitting(true)
    }

    //Here it handles the change in value of each field thats inside the form state
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    //Validates if there is anything missing on the form
    const validate = () =>{
        let err = {}
        if(!form.title){
            err.title = 'Title is required'
        }
        if(!form.description){
            err.description = 'Description is required'
        }
        if(!form.author){
            err.author = 'Author is required'
        }
        if(!form.price){
            err.price = 'Price is required'
        }
        if(!form.releaseYear){
            err.releaseYear = 'Release Year is required'
        }

        return err
    }

  return (
    <>
    {/* Renders the navbar */}
    <Navbar />
    <div>
        {/* Creates a form container where user can enter the book details */}
        <div className='container mx-auto p-10'>
        <h1 className='max-w-5x font-bold text-3xl text-center mb-2'>Request Book</h1>
        <div className='max-w-md mx-auto rounded overflow-hidden shadow-lg'>
            {
                isSubmitting 
                    ? "Loading" 
                    :  <>
                        <form className='space-y-4 text-gray-700' onSubmit={handleSubmit}>
                            <div className='flex flex-wrap p-5'>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Title:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='title' type='text' placeholder='Title' onChange={handleChange} />
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Author:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='author' type='text' placeholder='Author' onChange={handleChange}/>
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Price:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='price' type='text' placeholder='Price' onChange={handleChange}/>
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Release Year:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='releaseYear' type='text' placeholder='Release Year' onChange={handleChange}/>
                                </div>
                                <div className='w-full'>
                                    <label className='block mb-2'>Description:</label>
                                    <textarea className='w-full p-3 py-2 text-gray-700 border roudned-lg focus:shadow-outline' rows="10" required={true} name='description' type='text' placeholder='Add a description' onChange={handleChange}/>
                                </div>
                                <button className='w-full mt-2 bg-green-300 p-1 px-3 text-sm rounded cursor-pointer font-bold' type='submit'>Create Book</button>
                            
                                <Link href={'/client'}>
                                    <a className='w-full mt-2 bg-teal-300 p-1 px-3 text-sm rounded cursor-pointer font-bold text-center'>Go Back</a>
                                </Link>
                            </div>
                        </form></>
            }
            </div>
        </div>
    </div>
    </>
    );
}

export default New;

//Server sided where the user is decoded and passes id and role through props and makes a request to the books endpoint and pass it through too
export async function getServerSideProps(ctx){
    const { req, res } = ctx
    const cookie = ctx.req?.headers.cookie
    const {cookies} = req
    var role = null
    var sub
  
    verify(cookies.token, "BookStore", async function(err, decoded){
      if(!err && decoded){
          role = decoded.role
          sub = decoded.sub
      }
    })
  
    const resp = await fetch('http://localhost:3000/api/books', {
        headers:{
            cookie: cookie
        }
    })
  
    const json = await resp.json()
    return { props: {cookies: cookies, role: role, id: sub, bookData: json} }
  }
