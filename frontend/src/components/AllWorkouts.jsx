import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react';
import { useFetcher } from 'react-router-dom'


function AllWorkouts({ workout }) {
  const fetcher = useFetcher();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete(id) {
    setIsDeleting(true);
    fetcher.submit({ workoutId: id }, { method: 'DELETE' });
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <button className="delete" onClick={() => handleDelete(workout._id)} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default AllWorkouts;