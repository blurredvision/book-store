//Node modules needed for this component
import Link from 'next/link'

//When user has no permission to view the page they will be promted with this button
const AccessDenied = () => (
    <>
    <div className='text-center mt-10'>
        <h1>Access Denied</h1>
        <Link href={"/"}>
        <a className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
            Login
        </a>
        </Link>
    </div>
    </>
    
)

export default AccessDenied
