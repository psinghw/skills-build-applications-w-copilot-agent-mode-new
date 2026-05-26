
// Uses VITE_CODESPACE_NAME from .env.local for endpoint construction
const getWorkoutsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  }
  // fallback to localhost for local dev
  return 'http://localhost:8000/api/workouts/'
}

// Handles paginated or array responses
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  return [payload?.results, payload?.items, payload?.data].find(Array.isArray) ?? []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getWorkoutsEndpoint())
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setWorkouts(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadWorkouts()
  }, [])

  return (
    <section className="resource-view">
      <header>
        <p className="eyebrow">Programming</p>
        <h1>Workouts</h1>
      </header>
      {status === 'loading' && <p className="status-text">Loading workouts...</p>}
      {status === 'error' && <p className="status-text error">{error}</p>}
      {status === 'ready' && (
        <div className="data-grid workouts-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id ?? workout.title}>
              <h2>{workout.title}</h2>
              <dl>
                <div><dt>Category</dt><dd>{workout.category}</dd></div>
                <div><dt>Difficulty</dt><dd>{workout.difficulty}</dd></div>
                <div><dt>Duration</dt><dd>{workout.durationMinutes} min</dd></div>
              </dl>
              <p>{workout.description}</p>
              <p className="muted-line">{workout.targetMuscles?.join(', ')}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
