import { Form, Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  
  return (
    <header>
      <div className="container">
        <div className="left-nav">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>
        </div>

        {token && (
          <div className="user-nav">
            <NavLink
              to="workouts"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              workouts
            </NavLink>

            <Form action='/logout' method='post'>
            <button>Logout</button>
            </Form>
          </div>
        )}

{!token && <div className="">
          <Link to="auth">Get Started</Link>
        </div>}
      </div>
    </header>
  );
};

export default Navbar;
