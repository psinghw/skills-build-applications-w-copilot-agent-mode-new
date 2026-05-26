
// Uses VITE_CODESPACE_NAME from .env.local for endpoint construction
const getTeamsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api/teams/`
  }
  // fallback to localhost for local dev
  return 'http://localhost:8000/api/teams/'
}

// Handles paginated or array responses
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  return [payload?.results, payload?.items, payload?.data].find(Array.isArray) ?? []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getTeamsEndpoint())
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setTeams(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadTeams()
  }, [])

  return (
    <section className="resource-view">
      <header>
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </header>
      {status === 'loading' && <p className="status-text">Loading teams...</p>}
      {status === 'error' && <p className="status-text error">{error}</p>}
      {status === 'ready' && (
        <div className="data-grid teams-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id ?? team.name}>
              <h2>{team.name}</h2>
              <dl>
                <div><dt>City</dt><dd>{team.city}</dd></div>
                <div><dt>Mascot</dt><dd>{team.mascot}</dd></div>
                <div><dt>Weekly Goal</dt><dd>{team.weeklyGoalMinutes} min</dd></div>
              </dl>
              <p className="muted-line">{team.memberNames?.join(', ')}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
