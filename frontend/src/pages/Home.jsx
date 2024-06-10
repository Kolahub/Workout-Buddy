import WorkoutForm from '../components/WorkoutForm';
import AllWorkouts from '../components/AllWorkouts';
import { json, useLoaderData } from 'react-router-dom';

function Home() {
  const workouts = useLoaderData();


  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <AllWorkouts key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm method='post'/>
    </div>
  );
}

export default Home;

export async function Loader() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  console.log(token);

  try {
    const res = await fetch('http://localhost:4000/api/workouts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    console.log(res);

    if (!res.ok) {
      throw new Error('Failed to fetch workouts');
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw json({ message: 'error' }, { status: 500 });
  }
}
