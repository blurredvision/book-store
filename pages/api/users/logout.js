//Importing the components for the api to work
import dbConnect from "../../../utils/dbConnect";
import {verify} from 'jsonwebtoken'
import cookie from 'cookie'

//Connecting to the database
dbConnect()

//Receives request and response
export const authenticated = (fn) => async (
    req,
    res
) =>{
    //Before it goes to the endpoint it will authenticate the user to make sure it has the permission to access the endpoint
    //By verifiyng the jwt token and then setting the age on it 1 meaning it will destroy itself instantly
    verify(req.cookies.token, "BookStore", async function(err, decoded){
        if(!err && decoded){
            res.setHeader("Set-Cookie", cookie.serialize("token", 'deleted', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 1,
                sameSite: 'strict',
                path: "/",
            }))
            return await fn(req, res)
        }
        //If the user is not logged in they will be promt with this message
        res.status(401).json({message: "Sorry you are not authenticated"})
    })
}

//The logout function after its authenticated
export default authenticated(async function logout(
    req,
    res
){
    //Extracts the method of the request
    const { method } = req

    switch(method){
        case 'POST':
            try{
                //Responds with this message
                res.status(200).json({message: 'Successfully logged'})
            }catch(error){
               res.status(400).json({success: false})
            }
            break
       default:
       res.status(400).json({success: false})
       break
    }
})