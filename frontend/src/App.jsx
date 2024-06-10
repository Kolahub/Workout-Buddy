import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import LandingPage from './pages/LandingPage';
import Home, { Loader as workoutLoader } from './pages/Home';
// import WorkoutDetails from './pages/WorkoutDetails';
// import NewWorkout from './pages/NewWorkout';
import { Action as workoutAction } from './components/WorkoutForm';
import Error from './pages/Error';
import Authentiction, { Action as authAction } from './pages/Authentiction';
import { action as  logoutAction} from './pages/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      {
        path: 'workouts',
        element: <Home />,
        action: workoutAction,
        loader: workoutLoader,
      },

      {
        path: 'auth',
        element: <Authentiction />,
        action: authAction
      },

      {
        path: 'logout',
        action: logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
