//Importing the components for the api to work
import User from "../../../components/models/User";
import {verify} from 'jsonwebtoken'

var userID
var userRole

//Authenticates the user
export const authenticated = (fn) => async (
    req,
    res
) =>{
    //Verifies the JWT token
    verify(req.cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            //Checks if the roles meet up with the ones below
            if(decoded.role == "client" || decoded.role == "employee"){
                userID = decoded.sub
                userRole = decoded.role
                return await fn(req, res)
            }
            else{
                //If it doesnt it shows this message
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }
        //Else it will show this message that they are not authenticated
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After its authenticated it will run this function
export default authenticated(async function getUserBooks(
    req,
    res
){
    //Extracts the method of the request
    const { method } = req
    switch(method){
        case 'GET':
                try{
                    //Finds the user by the userID and populates it with books virutal
                    const user = await User.findById(userID).populate("books")
                    //Responds with the user data with the books that they have requested
                    res.status(200).json({success: true, data: user}) 
                 }catch(error){
                     console.log(error)
                    res.status(400).json({success: "false"})
                 }
                 break
       default:
       res.status(400).json({success: false})
       break
    }
})
