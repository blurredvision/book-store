/* eslint-disable import/no-anonymous-default-export */
//Importing the components for the api to work
import dbConnect from "../../../utils/dbConnect";
import User from "../../../components/models/User";

//Connecting to the database
dbConnect()

//Receives request and response
export default async(req, res) =>{
    //Extracts the method of the request 
    const { method } = req
    //Extracts the information in the request body
    const { name, email, password, role } = req.body

    switch(method){
        //If the method is post it will execute this part
        case 'POST':
            //Tries to find if there is already a user with the same email, if so it will show one of these errors
            try {
                User.findOne({email}, (err,user)=>{
                    if(err)
                        res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
                    if(user)
                        res.status(400).json({message: {msgBody: "Email is already taken", msgError: true}})
                    else{
                        //If successful it will create the user and send a response to the server that it was successful
                        const newUser = new User({name, email, password, role})
                        newUser.save(err=>{
                            if(err)
                                res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
                            else
                                res.status(200).json({message: {msgBody: "Account created!", msgError: false}})
                        })
                    }
                 }) 
            } catch (error) {
                //If there are any errors it will give out a false response
                res.status(400).json({success: false})
            }
            break
        default:
        res.status(400).json({success: false})
        break
    }
}
