import { useLocation, useNavigate } from 'react-router-dom'
import fractureInfo from '../data/fractures'

const severityConfig = {
  mild:     { bg: 'bg-green-900/40',  border: 'border-green-500',  text: 'text-green-400',  label: 'Mild' },
  moderate: { bg: 'bg-yellow-900/40', border: 'border-yellow-500', text: 'text-yellow-400', label: 'Moderate' },
  severe:   { bg: 'bg-red-900/40',    border: 'border-red-500',    text: 'text-red-400',    label: 'Severe' },
}

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate('/')
    return null
  }

  const { fracture_type, confidence, imageUrl } = state
  const info = fractureInfo[fracture_type]
  const sev = severityConfig[info?.severity || 'moderate']

  return (
    <div className="min-h-screen px-4 py-10 max-w-2xl mx-auto">

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        Analyze another image
      </button>

      {/* Result header */}
      <div className={`rounded-2xl border p-6 mb-6 ${sev.bg} ${sev.border}`}>
        <p className="text-sm text-slate-400 mb-1">Detected fracture type</p>
        <h1 className="text-3xl font-bold text-white">{fracture_type}</h1>
        <div className="flex items-center gap-4 mt-3">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${sev.border} ${sev.text}`}>
            {sev.label} severity
          </span>
          <span className="text-sm text-slate-400">
            Confidence: <span className="text-white font-medium">{confidence}%</span>
          </span>
        </div>
      </div>

      {/* X-ray preview */}
      {imageUrl && (
        <div className="rounded-2xl overflow-hidden bg-slate-900 mb-6">
          <img src={imageUrl} alt="Uploaded X-ray" className="w-full max-h-64 object-contain mx-auto" />
        </div>
      )}

      {/* Plain language explanation */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-4">
        <h2 className="text-cyan-400 font-semibold mb-2">What this means</h2>
        <p className="text-slate-300 leading-relaxed">{info?.plain}</p>
      </div>

      {/* First aid */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-4">
        <h2 className="text-cyan-400 font-semibold mb-3">Immediate steps</h2>
        <ul className="space-y-2">
          {info?.firstAid.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Recovery + when to see doctor */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-cyan-400 font-semibold mb-2">Expected recovery</h2>
          <p className="text-slate-300">{info?.recovery}</p>
        </div>
        <div className={`rounded-2xl p-6 border ${sev.border} ${sev.bg}`}>
          <h2 className={`font-semibold mb-2 ${sev.text}`}>When to see a doctor</h2>
          <p className="text-slate-300">{info?.seeDoctor}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-600 text-center">
        This tool is for educational purposes only and does not constitute medical advice.
        Always consult a qualified healthcare professional for diagnosis and treatment.
      </p>
    </div>
  )
}