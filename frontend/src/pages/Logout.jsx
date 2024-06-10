import { redirect } from "react-router-dom";

export function action() {
  // Clear the 'token' cookie
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  // Redirect to the home page
  return redirect('/');
}
