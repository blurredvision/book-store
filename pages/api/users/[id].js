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
            //Checks the role of the user with the ones below
            if(decoded.role == "employee" || decoded.role == "admin"){
                userID = decoded.sub
                userRole = decoded.role
                return await fn(req, res)
            }
            else{
                //If it doesnt it displays this message
                res.status(401).json({message: "You dont have the right permissions"})
            }
        }

        //If it cannot verify the token it will display this
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//After the user is authenticated it will run this function
export default authenticated(async function getUserId(
    req,
    res
){
    //Extracts the method of the request
    const { method } = req
    switch(method){
        //If the method is GET it will run this
        case 'GET':
                try{
                    //Gets the user by id
                    const user = await User.findById(req.query.id)
                    res.status(200).json({success: true, data: user}) 
                 }catch(error){
                     console.log(error)
                    res.status(400).json({success: "false"})
                 }
                 break
        //If the method is PUT it will run this
        case 'PUT':
                try {
                    //Gets the user by id and updates it with the information provided in the body
                    const user = await User.findByIdAndUpdate(req.query.id, req.body, {
                        new: true,
                        runValidators: true
                    })
                    if(!user){
                        return res.status(400).json({success: false})
                    }
                    res.status(200).json({success: true, data: user})
                } catch (error) {
                    console.log(error)
                    res.status(400).json({success: false})
                }
                break
        //If the method is DELETE it will run this
        case 'DELETE':
                try {
                    //Deletes the user with user id
                    const deletedUser = await User.deleteOne({_id: req.query.id})
                    if(!deletedUser){
                        return res.status(400).json({success: false})
                    }
                    res.status(200).json({success: true, data: {}})
                } catch (error) {
                    res.status(400).json({success: false})
                    console.log(error)
                }
                break
       default:
       res.status(400).json({success: false})
       break
    }
})
