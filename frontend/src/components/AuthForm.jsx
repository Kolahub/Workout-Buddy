import { Form, NavLink, useActionData, useNavigation, useSearchParams } from "react-router-dom";

function AuthForm() {

    const data = useActionData()
    const navigation = useNavigation()

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === 'submitting'
  console.log(isLogin, data);

  return (
    <>
      <Form method="post" className="signup">
        <h3>{isLogin ? "Login" : "Signup"}</h3>

        <label>Email address:</label>
        <input type="email" name="email" />
        <label>Password:</label>
        <input type="password" name="password" />

        <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'save'}
          </button>
        {/* {error && <div className="error">{error}</div>} */}
      </Form>

      <div className="right-nav">
      {!isLogin ? (
  <>
    Already have an account? <NavLink to="?mode=login">Login</NavLink>
  </>
) : (
  <>
     Dont have an account? <NavLink to="?mode=signup">Signup</NavLink>
  </>
)}
        
        
      </div>
    </>
  );
}

export default AuthForm;
