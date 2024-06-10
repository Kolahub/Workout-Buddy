import { useEffect, useRef, useState } from "react"
import { json, useFetcher, useNavigation } from "react-router-dom"

const WorkoutForm = ( {method} ) => {
  console.log(method);
  const fetcher = useFetcher();
  const formRef = useRef();
  // const navigation = useNavigation()
  const [data, setData] = useState();
  // console.log(data);
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.title) {
        formRef.current.reset();
      }
      if (fetcher.data.message) {
        setData(fetcher.data);
        setTimeout(() => {
          setData(undefined);
        }, 3000);
      }
    }
  }, [fetcher.data]);

  function handleSubmit (e) {
    e.preventDefault()
    fetcher.submit(e.target, { method })
  }

  return (
    <fetcher.Form ref={formRef} method={method} className="create" onSubmit={(e) => handleSubmit(e)}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text"
        name="title"
        className={data && data.message !== undefined && data.emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        name="load"
        className={data && data.message !== undefined && data.emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type="number"
        name="reps"
        className={data && data.message !== undefined && data.emptyFields.includes('reps') ? 'error' : ''}
      />

     
      <button disabled={fetcher.state === 'submitting' || data}>
      {fetcher.state === 'submitting' ? 'Submitting...' : 'Add Workout'}
        </button>
      {data && data.message !== undefined && (
        <div className="error">{data.message}</div>
      )}
    </fetcher.Form>
  )
}

export default WorkoutForm

export async function Action({ request }) {
  console.log('logged');
  const formData = await request.formData();
  const method = request.method;

  let url = 'http://localhost:4000/api/workouts';
  let body = null;

    // Extract token from cookies
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  
    if (!token) {
      throw json({ message: 'Unauthorized' }, { status: 401 });
    }

  if (method === 'DELETE') {
    const workoutId = formData.get('workoutId');
    if (!workoutId) {
      throw new Error('workoutId is undefined');
    }
    url = `http://localhost:4000/api/workouts/${workoutId}`;
  } else {
    const workoutData = {
      title: formData.get('title'),
      load: formData.get('load'),
      reps: formData.get('reps'),
    };
    body = JSON.stringify(workoutData);
    console.log(workoutData);
  }


  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add token to headers
    },
    body: body,
  });

  if (!res.ok) {
    const errorMessage = await res.json();
    console.log(res.status, errorMessage.error);
    if (res.status === 400) {
      return json({ message: errorMessage.error, emptyFields: errorMessage.emptyFields}, {status: 400 });
    }

    throw json(
      { message: errorMessage.error},
      { status: res.status }
    );
  }

  const data = await res.json()
  console.log(data);
  return res;
}

