//Node module needed for the component
import Link from 'next/link'

//Creates a button that redirects the user where the admin can manage users
const ManageUsersBtn = () => (
    <Link href={'/admin/manage-users'}>
    <a className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
        Manage Users
    </a>
    </Link>
    
)

export default ManageUsersBtn
