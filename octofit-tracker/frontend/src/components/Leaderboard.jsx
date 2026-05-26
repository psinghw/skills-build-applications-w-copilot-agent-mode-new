
// Uses VITE_CODESPACE_NAME from .env.local for endpoint construction
const getLeaderboardEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  }
  // fallback to localhost for local dev
  return 'http://localhost:8000/api/leaderboard/'
}

// Handles paginated or array responses
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  return [payload?.results, payload?.items, payload?.data].find(Array.isArray) ?? []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getLeaderboardEndpoint())
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setEntries(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadLeaderboard()
  }, [])

  return (
    <section className="resource-view">
      <header>
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </header>
      {status === 'loading' && <p className="status-text">Loading leaderboard...</p>}
      {status === 'error' && <p className="status-text error">{error}</p>}
      {status === 'ready' && (
        <div className="leaderboard-list">
          {entries.map((entry) => (
            <article className="leaderboard-row" key={entry._id ?? entry.rank}>
              <strong>#{entry.rank}</strong>
              <span>{entry.userName}</span>
              <span>{entry.teamName}</span>
              <span>{entry.points} pts</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
