
// Uses VITE_CODESPACE_NAME from .env.local for endpoint construction
const getUsersEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`
  }
  // fallback to localhost for local dev
  return 'http://localhost:8000/api/users/'
}

// Handles paginated or array responses
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  return [payload?.results, payload?.items, payload?.data].find(Array.isArray) ?? []
}

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getUsersEndpoint())
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setUsers(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadUsers()
  }, [])

  return (
    <section className="resource-view">
      <header>
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </header>
      {status === 'loading' && <p className="status-text">Loading users...</p>}
      {status === 'error' && <p className="status-text error">{error}</p>}
      {status === 'ready' && (
        <div className="data-grid users-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id ?? user.username ?? user.email}>
              <h2>{[user.firstName, user.lastName].filter(Boolean).join(' ') || user.username}</h2>
              <dl>
                <div><dt>Email</dt><dd>{user.email}</dd></div>
                <div><dt>Team</dt><dd>{user.teamName}</dd></div>
                <div><dt>Goal</dt><dd>{user.profile?.fitnessGoal}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
