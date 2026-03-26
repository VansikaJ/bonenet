import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()
  const navigate = useNavigate()

  const handleFile = (selected) => {
    if (!selected) return
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(selected.type)) {
      setError('Please upload a JPEG or PNG image.')
      return
    }
    setError(null)
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Prediction failed. Please try another image.')
      const data = await res.json()
      navigate('/result', { state: { ...data, imageUrl: preview } })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">BoneNet</h1>
        <p className="text-slate-400 mt-2 text-lg">AI-powered bone fracture analysis</p>
      </div>

      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
          ${dragging ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-600 hover:border-slate-400 bg-slate-900'}`}
      >
        {preview ? (
          <img src={preview} alt="X-ray preview" className="mx-auto max-h-64 rounded-lg object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <svg className="w-14 h-14 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-base font-medium">Drop your X-ray here</p>
            <p className="text-sm">or click to browse — JPEG / PNG</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-400 text-sm">{error}</p>
      )}

      {/* Analyze Button */}
      {file && !loading && (
        <button
          onClick={handleSubmit}
          className="mt-6 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl transition-colors duration-200"
        >
          Analyze X-ray
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 flex flex-col items-center gap-3 text-slate-400">
          <svg className="w-8 h-8 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-sm">Analyzing your X-ray...</p>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-slate-600 max-w-md text-center">
        For educational purposes only. This tool does not constitute medical advice.
        Always consult a qualified healthcare professional for diagnosis and treatment.
      </p>
    </div>
  )
}