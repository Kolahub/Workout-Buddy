import { json, redirect } from "react-router-dom"
import AuthForm from "../components/AuthForm"


function Authentiction() {
  return (
    <AuthForm />
  )
}

export default Authentiction

export async function Action ({ request }) {
    const searchParams = new URL(request.url).searchParams

    const mode = searchParams.get('mode') || 'signup'
    console.log(mode);
    
    if(mode !== 'login' && mode !== 'signup') {
        throw json({message: 'Unsupported mode.'}, {status: 422})
      }

      const dataForm = await request.formData()
      const authData = {
        email: dataForm.get('email'),
        password: dataForm.get('password')
      }

      const res = await fetch(`http://localhost:4000/api/user/${mode}`, {
        method: 'POST', 
        body: JSON.stringify(authData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(res.status === 400)
        return res

      if(!res.ok) {
        throw json({message: 'Could not authenticate user.'}, {status: 500})
      }

      console.log(res);

      const data = await res.json();
      console.log(data);
      // Set the token cookie
      document.cookie = `token=${data.token}; max-age=${3 * 24 * 60 * 60}; path=/`;

      return redirect('/')
}