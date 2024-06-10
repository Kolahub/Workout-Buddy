import { useRouteError } from "react-router-dom"
import ErrorComp from "../components/ErrorComp"
import Navbar from "../components/Navbar"

function Error() {
    const error = useRouteError()
    console.log(error.status);
    let title = 'An Error Occurred!'
    let msg = 'Something went wrong'
  
    // if(error.status === 500) {
    //   msg = error.data.message
    // }
  
    if(error.status === 404) {
      title = 'Not found.'
      msg = error.data.message || 'Could not find resource or page.';
    }

  return (
    <>
    <Navbar />
    <ErrorComp title={title}>
        <p>{msg}</p>
    </ErrorComp>
    </>
  )
}

export default Error