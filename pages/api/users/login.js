/* eslint-disable import/no-anonymous-default-export */
//Importing the components for the api to work
import dbConnect from "../../../utils/dbConnect";
import { compare } from 'bcrypt'
import User from "../../../components/models/User";
import Book from "../../../components/models/Book"
import {sign} from 'jsonwebtoken'
import cookie from 'cookie'

//Connecting to the database
dbConnect()

export default async (req, res) =>{
    //Extracts the method of the request
    const {method} = req
    //Extracts the data from the body of the request
    const {name, password} = req.body
    
    switch(method){
        case 'POST':
            try {
                //Finds the user using the name of the user
                const user = await User.find({name})
                //Compares the password with the hashed password on the database
                compare(password, user[0].password, async function(err, result){
                    if(!err && result){
                        //Creates a claim meaning a json data containing important information thats going to be attached to the jwt token
                        const claims = {sub: user[0]._id, name: name, role: user[0].roles}
                        //Creates a JWT token that expires in 1 hour
                        const jwt = sign(claims, 'BookStore', {expiresIn: '1h'})
                        //Sets the cookie in the header with the jwt token
                        res.setHeader("Set-Cookie", cookie.serialize("token", jwt, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== "development",
                            maxAge: 60 * 60,
                            sameSite: 'strict',
                            path: "/",
                        }))
                        const books = await Book.find({})
                        //Responds with the jwt token
                        res.status(201).json({authToken: jwt})
                    }
                    else{
                        res.status(400).json({message: 'Something went wrong'})
                    }
                })
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        default:
        res.status(400).json({success: false})
        break
    }
}
