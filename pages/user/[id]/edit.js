/* eslint-disable react-hooks/exhaustive-deps */
//Importing node modules used for the page
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import Navbar from '../../../components/Default/Navbar';

function Edit({userData}) {
    //Defining the states and the router
    const [form, setForm] = useState({name: userData.name, email: userData.email, roles: userData.roles})
    const [isSubmitting, setIsSubmitting] = new useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    //useEffect checks for any errors when the errors state has been changed, if errors is equals to 0 runs the udpdateUser function
    useEffect(() =>{
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                updateUser()
            }
            else{
                setIsSubmitting(false)
            }
        }
    }, [errors])

    //updateUser function handles the updating part of the user
    const updateUser = async () =>{
        try {
            const res = await fetch(`http://localhost:3000/api/users/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.back()
        } catch (error) {
            console.log(error);
        }
    }

    //This function prevents the page from reloading, runs the validate function to check if something is missed and then sets IsSubmitting to true
    const handleSubmit = (e) =>{
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitting(true)
    }
    //This captures the change the user does in the input field and sets the data in the form state. 
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    //Validate function checks if the user has missed anything in the form
    const validate = () =>{
        let err = {}
        if(!form.name){
            err.name = 'Name is required'
        }
        if(!form.email){
            err.email = 'Email is required'
        }
        if(!form.roles){
            err.roles = 'Roles is required'
        }

        return err
    }

  return (
      <>
      {/* Renders the navbar */}
      <Navbar />
        <div>
        {/* Creates the form to edit the users with a statement if isSubmitting is true Loading will be shown else it shows the form */}
        <div className='container mx-auto p-10'>
            <h1 className='max-w-5x font-bold text-3xl text-center mb-2'>Editing this User</h1>
            <div className='max-w-md mx-auto rounded overflow-hidden shadow-lg'>
                {
                    isSubmitting 
                        ? "Loading" 
                        :  
                        <form className='space-y-4 text-gray-700' onSubmit={handleSubmit}>
                            <div className='flex flex-wrap p-5'>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Name:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='name' type='text' placeholder='Name' onChange={handleChange} value={form.name} />
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Email:</label>
                                    <input className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='email' type='text' placeholder='Email' onChange={handleChange} value={form.email} />
                                </div>
                                <div className='w-full mb-2'>
                                    <label className='block mb-1'>Role:</label>
                                    <select className='w-full h-10 px-3 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline' required={true} name='roles' type='text' onChange={handleChange} value={form.roles}>
                                        <option value="client">Client</option>
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button className='w-full mt-2 bg-green-300 p-1 px-3 text-sm rounded cursor-pointer font-bold' type='submit'>Update</button>
                                <a onClick={() => router.back()} className='w-full mt-2 bg-teal-300 p-1 px-3 text-sm rounded cursor-pointer font-bold text-center'>Go Back</a>
                            </div>
                        </form>
                }
            </div>
            </div>
        </div>
    </>
    );
}

//Server sided rendering the user as its been passthrough an api with its id
export const getServerSideProps = async (ctx) => {
    const cookie = ctx.req?.headers.cookie
    const resp = await axios.get(`http://localhost:3000/api/users/${ctx.params.id}`, {headers:{cookie: cookie}})
    return { 
        props:{
            userData: resp.data.data
        }
    }
  }

export default Edit;
