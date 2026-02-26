import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) setError(authError.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo / título */}
        <div className="text-center mb-8">
          <div className="text-2xl font-black tracking-tight text-white mb-1">
            Caídos del Zarzo
          </div>
          <div className="text-sm text-zinc-500 uppercase tracking-widest">Panel de administración</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="admin@caidosdelzarzo.co"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-semibold text-white rounded transition-colors disabled:opacity-50"
            style={{ background: loading ? '#6b4f1f' : '#c47818' }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
