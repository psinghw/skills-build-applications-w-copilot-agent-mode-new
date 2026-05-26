
// Uses VITE_CODESPACE_NAME from .env.local for endpoint construction
const getActivitiesEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api/activities/`
  }
  // fallback to localhost for local dev
  return 'http://localhost:8000/api/activities/'
}

// Handles paginated or array responses
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  return [payload?.results, payload?.items, payload?.data].find(Array.isArray) ?? []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getActivitiesEndpoint())
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setActivities(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadActivities()
  }, [])

  return (
    <section className="resource-view">
      <header>
        <p className="eyebrow">Training Log</p>
        <h1>Activities</h1>
      </header>
      {status === 'loading' && <p className="status-text">Loading activities...</p>}
      {status === 'error' && <p className="status-text error">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
                  <td>{activity.userName}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
