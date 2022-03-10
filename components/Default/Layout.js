//Node modules needed for this component
import Head from 'next/head'
import Navbar from './Navbar'

//Creates the layout of the every page as the title of the page is Book Store and on top of the page will be the navbar
const Layout = ({children}) => (
    <>
        <Head>
            <title>Book Store</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout