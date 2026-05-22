import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Modern fitness tracking, ready for the next step.</h1>
        <p className="description">
          React 19 with Vite is initialized in the frontend and ready to connect to the
          Express + TypeScript backend.
        </p>
        <div className="port-grid">
          <div>
            <span>Frontend</span>
            <strong>5173</strong>
          </div>
          <div>
            <span>Backend</span>
            <strong>8000</strong>
          </div>
          <div>
            <span>MongoDB</span>
            <strong>27017</strong>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
