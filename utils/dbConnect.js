//Importing node modules needed for this file
import mongoose from 'mongoose'

const connection = {}

//Connects to the database usign the MONGO_URI which is stored in the environment file
async function dbConnect(){

    //If already connected return nothing
    if(connection.isConnected){
        return
    }

    //Else connect to the database
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    //Creates the socket
    connection.isConnected = db.connections[0].readyState
}

export default dbConnect