//Importing the components for the api to work
import User from "../../../components/models/User";
import {verify} from 'jsonwebtoken'

var userID
var userRole

//Authenticaets the user
export const authenticated = (fn) => async (
    req,
    res
) =>{
    //Verifies the JWT token
    verify(req.cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            //Checks the roles if it matches to the ones below it authenticates it
            if(decoded.role == "admin" || decoded.role == "employee" || decoded.role == "client"){
                userID = decoded.sub
                userRole = decoded.role
                return await fn(req, res)
            }
            else{
                //If doesnt match up with the ones above it shows this message
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }
        //If there is a error it will show this message
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After the user is authenticated it will do the api request
export default authenticated(async function getUsers(
    req,
    res
){
    //Extracts the method of the request
    const { method } = req
    switch(method){
        case 'GET':
            try{
                //Finds all user and populates it with the books virutal, also it hides the password for obvious reasons
                const users = await User.find({}, {password: 0}).populate("books")
                //Responds with the user data
                res.status(200).json({success: true, data: users})
            }catch(error){
                console.log(error)
               res.status(400).json({success: false})
            }
            break
       default:
       res.status(400).json({success: false})
       break
    }
})
