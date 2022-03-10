//Node modules needed for this component
import axios from 'axios'
import Router from 'next/router'

//Logout function as it logs out the user when pressed
const logout = async (e) => {
    const options = {
      headers: {'Content-Type': 'application/json'}
    };
    //Sends a request to the logout endpoint
    await axios.post('http://localhost:3000/api/users/logout', options).then(function (response) {
        console.log(response);
    })
    Router.push("/")

}

//LogoutButton when pressed its gonna do the logout() function
const LogoutBtn = () => (
    <a onClick={logout} className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
        Logout
    </a>
    
)

export default LogoutBtn
