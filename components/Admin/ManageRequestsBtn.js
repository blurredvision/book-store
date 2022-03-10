//Node module needed for the component
import Link from 'next/link'

//Creates a button to redirect the user where they can manage the requests
const ManageRequestsBtn = () => (
    <Link href={'/admin'}>
    <a className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
        Manage Requests
    </a>
    </Link>
    
)

export default ManageRequestsBtn
