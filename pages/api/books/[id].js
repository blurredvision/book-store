//Importing the components for the api to work
import dbConnect from "../../../utils/dbConnect";
import Book from "../../../components/models/Book";
import {verify} from 'jsonwebtoken'

//Connecting to the database
dbConnect()

var userID

//Authenticating the user
export const authenticated = (fn) => async (
    req,
    res
) =>{
    //Verify the JWT token
    verify(req.cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            //Check user role if they match with the ones below
            if(decoded.role == "client" || decoded.role == "employee" || decoded.role == "admin"){
                userID = decoded.sub
                return await fn(req, res)
            }
            else{
                //If they dont match up it will display this message
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }
        //If it cannot be verified then it will show this message
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After the user is authenticated this function will run
export default authenticated(async function BooksID(
    req,
    res
){
    //Extracts the id from the query and the method of the request
    const {
        query: { id },
        method
    } = req

    switch(method){
        //If method is GET it will run this function
        case 'GET':
            try {
                //Finds the book by the id
                const book = await Book.findById(id)
                if(!book){
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: book})
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        //If method is PUT it will run this function
        case 'PUT':
            try {
                //Updates the book by the id
                const book = await Book.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })
                if(!book){
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: book})
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        //If method is DELETE it will run this function
        case 'DELETE':
            try {
                //Deletes the book by id
                const deletedBook = await Book.deleteOne({_id: id})
                if(!deletedBook){
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
})
