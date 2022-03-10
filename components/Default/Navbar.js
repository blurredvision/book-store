//Imports node modules to have this component to work
import Link from 'next/link'

const Navbar = () => (
    //Creating the navbar
    <nav className='flex items-center flex-wrap bg-teal-500 p-3 '>
        <Link href="/">
            <a className='inline-flex items-center p-2 mr-4'>
                <span className='text-xl text-white font-bold uppercase tracking-wide'>
                    BOOK STORE
                </span>
            </a>
        </Link>
    </nav>
    
)

export default Navbar
