import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AdminLogin from './AdminLogin'
import Dashboard from './Dashboard'

export default function AdminApp() {
  const [session, setSession] = useState(undefined) // undefined = cargando

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return session ? <Dashboard session={session} /> : <AdminLogin />
}
