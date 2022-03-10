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
            if(decoded.role == "employee" || decoded.role == "admin"){
                userID = decoded.sub
                return await fn(req, res)
            }
            else{
                //If there isnt a match then it will display this message
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }
        //If it cannot verify the message it will display this message
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After the user is authenticated it will run this function
export default authenticated(async function Employee(
    req,
    res
){
    //Extracts the method from the request
    const { method } = req

    switch(method){
        case 'GET':
            try{
               //Finds the book where bookStatus is Waiting
               const books = await Book.find({bookStatus: "Waiting"})
               res.status(200).json({success: true, data: books}) 
            }catch(error){
               res.status(400).json({success: false})
            }
            break
       default:
       res.status(400).json({success: false})
       break
    }
})
