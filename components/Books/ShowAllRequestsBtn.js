//Node modules needed for this component
import Link from 'next/link'

//Displays a button that redirects the user to a page where you can se all of the book request
const ShowAllRequests = () => (
    <Link href={'/employee'}>
        <a className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
            Show all requests
        </a>
    </Link>
    
)

export default ShowAllRequests
