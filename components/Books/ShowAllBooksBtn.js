//Node modules needed for this component
import Link from 'next/link'

//Displays a button that redirects the user where it displays all of the books
const ShowAllBooksBtn = ({role}) => (
    <Link href={`/${role}/all-requests`}>
        <a className='bg-green-300 p-1 px-3 text-sm rounded cursor-pointer m-1'>
            Show all books
        </a>
    </Link>
    
)

export default ShowAllBooksBtn
