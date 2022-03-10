//Importing the components for the api to work
import dbConnect from "../../../utils/dbConnect";
import Book from "../../../components/models/Book";
import {verify} from 'jsonwebtoken'

//Connecting to the database
dbConnect()

var userID

//Authenticates the user
export const authenticated = (fn) => async (
    req,
    res
) =>{
    //Verifies the JWT token
    verify(req.cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            //Checks the user roles with the list below
            if(decoded.role == "client" || decoded.role == "employee"){
                userID = decoded.sub
                return await fn(req, res)
            }
            else{
                //If it doesnt match up it displays this messages
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }
        //If it cannot verify the token it will display this message
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After the user is authenticated it will run this function
export default authenticated(async function Books(
    req,
    res
){
    //Extracts the method of the request
    const { method } = req

    switch(method){
        //If the method is GET it will run this function
        case 'GET':
            try{
               //Gets all of the books from the books database
               const books = await Book.find({})
               res.status(200).json({success: true, data: books}) 
            }catch(error){
               res.status(400).json({success: false})
            }
            break
        //If the method is POST it will run this function
       case 'POST':
           try {
               //Creates a new book and adds it to the database
               const book = await Book.create(req.body)
               res.status(201).json({success: true, data: book})
           } catch (error) {
               res.status(400).json({success: false, data: error})
           }
           break
       default:
       res.status(400).json({success: false})
       break
    }
})