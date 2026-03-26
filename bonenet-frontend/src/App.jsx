import { Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload.jsx'
import Result from './pages/Result.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}