/* eslint-disable react-hooks/exhaustive-deps */
//Importing node modules that are needed for the page
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import Navbar from '../../../components/Default/Navbar';

//Passes bookData prop from the server
function Edit({bookData}) {
    //Defining the states and router
    const [form, setForm] = useState({title: bookData.title, description: bookData.description, price: bookData.price, releaseYear: bookData.releaseYear, author: bookData.author})
    const [isSubmitting, setIsSubmitting] = new useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    //Checks if there are any errors if not it runs the updateBook function
    useEffect(() =>{
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                updateBook()
            }
            else{
                setIsSubmitting(false)
            }
        }
    }, [errors])

    //updateBook function
    const updateBook = async () =>{
        try {
            await fetch(`http://localhost:3000/api/books/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/client")
        } catch (error) {
            console.log(error);
        }
    }

    //on submit it stops the page from reloading runs validate function to check for any errors and sets it in the error state
    const handleSubmit = (e) =>{
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitting(true)
    }

    //Stores any changes made to the fields in the form state
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    //Checks the form if there are any errors, if there are it stores it in the errors state
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
      {/* Creates a container and generates the form to enter any new details to update the book */}
        <div>
        <div className='container mx-auto p-10'>
            <h1 className='max-w-5x font-bold text-3xl text-center mb-2'>Editing this book </h1>
            <div className='max-w-md mx-auto rounded overflow-hidden shadow-lg'>
                {
                    isSubmitting 
                        ? "Loading" 
                        :  
                        <form className='space-y-4 text-gray-700' onSubmit={handleSubmit}>
                            <div className='flex flex-wrap p-5'>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Title:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='title' type='text' placeholder='Title' onChange={handleChange} value={form.title} />
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Author:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='author' type='text' placeholder='Author' onChange={handleChange} value={form.author} />
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Price:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='price' type='text' placeholder='Price' onChange={handleChange} value={form.price} />
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Release Year:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='releaseYear' type='text' placeholder='Release Year' onChange={handleChange} value={form.releaseYear} />
                                </div>
                                <div className='w-full'>
                                    <label className='block mb-2'>Description:</label>
                                    <textarea className='w-full p-3 py-2 text-gray-700 border roudned-lg focus:shadow-outline' rows="10" required={true} name='description' type='text' placeholder='Add a description' onChange={handleChange} value={form.description}/>
                                </div>
                                <button className='w-full mt-2 bg-green-300 p-1 px-3 text-sm rounded cursor-pointer font-bold' type='submit'>Update</button>
                            
                                <Link href={'/client'}>
                                    <a className='w-full mt-2 bg-teal-300 p-1 px-3 text-sm rounded cursor-pointer font-bold text-center'>Go Back</a>
                                </Link>
                            </div>
                        </form>
                }
            </div>
            </div>
        </div>
    </>
    );
}

//Server side where its makes a request to the book id and passes it through the prop
export const getServerSideProps = async (ctx) => {
    const cookie = ctx.req?.headers.cookie
    const resp = await axios.get(`http://localhost:3000/api/books/${ctx.params.id}`, {headers:{cookie: cookie}})
    return { 
        props:{
            bookData: resp.data.data
        }
    }
  }

export default Edit;
