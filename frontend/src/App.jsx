import React from "react"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Finance Manager
          </h1>
          <span className="text-sm text-gray-500">Phase 1 — Setup complete</span>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Total income</p>
            <p className="text-2xl font-semibold text-green-600">₹0</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Total expenses</p>
            <p className="text-2xl font-semibold text-red-500">₹0</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Balance</p>
            <p className="text-2xl font-semibold text-gray-800">₹0</p>
          </div>
        </div>

        {/* API connection test */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-medium text-gray-700 mb-4">
            Backend connection
          </h2>
          <ApiStatus />
        </div>
      </main>
    </div>
  )
}

function ApiStatus() {
  const [status, setStatus] = React.useState("checking...")

  React.useEffect(() => {
    fetch("http://localhost:8000/health")
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus("offline — start your FastAPI server!"))
  }, [])

  const isOnline = status === "ok"

  return (
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-400"}`} />
      <span className="text-sm text-gray-600">
        FastAPI backend: <span className={isOnline ? "text-green-600 font-medium" : "text-red-500"}>{status}</span>
      </span>
    </div>
  )
}

export default App