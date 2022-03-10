//Imports the tailwind plugin to be used on every page without calling it evert time
import '../styles/globals.css'

//Renders the whole app
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
