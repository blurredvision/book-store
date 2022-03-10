//Importing the components for the api to work
import Book from "../../../components/models/Book";
import {verify} from 'jsonwebtoken'

var userID

//Authenticates the user
export const authenticated = (fn) => async (
    req,
    res
) =>{
    //Verifies the JWT token
    verify(req.cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            //Checks if the user role matches with the list below
            if(decoded.role == "employee" || decoded.role == "admin"){
                userID = decoded.sub
                return await fn(req, res)
            }
            else{
                //If there is no match it'll display this message
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }
        //If it cannot verify the message it will display this message
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After the user is authenticated it will run the function
export default authenticated(async function AllBooks(
    req,
    res
){
    //Extracts the method of the request
    const { method } = req

    switch(method){
        case 'GET':
            try{
               //Finds the books where the bookStatus is Accepted and outputs it
               const books = await Book.find({bookStatus: "Accepted"})
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
