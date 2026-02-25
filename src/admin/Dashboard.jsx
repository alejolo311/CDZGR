import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'

const A = '#c47818'

// ── helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const ESTADO_LABELS = {
  completado: { label: 'Completado', cls: 'bg-emerald-900/50 text-emerald-400 border-emerald-800' },
  pendiente:  { label: 'Pendiente',  cls: 'bg-amber-900/50  text-amber-400  border-amber-800'  },
  fallido:    { label: 'Fallido',    cls: 'bg-red-900/50    text-red-400    border-red-800'    },
}

// ── sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-black text-white">{value}</div>
      {sub && <div className="text-xs text-zinc-500 mt-0.5">{sub}</div>}
    </div>
  )
}

function Badge({ estado }) {
  const e = ESTADO_LABELS[estado] ?? { label: estado, cls: 'bg-zinc-800 text-zinc-400 border-zinc-700' }
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded border font-medium ${e.cls}`}>
      {e.label}
    </span>
  )
}

// ── main ──────────────────────────────────────────────────────────────────────

export default function Dashboard({ session }) {
  const [rows,       setRows]       = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [search,     setSearch]     = useState('')
  const [filterCat,  setFilterCat]  = useState('todas')
  const [filterPago, setFilterPago] = useState('todos')
  const [editingId,  setEditingId]  = useState(null)
  const [numInput,   setNumInput]   = useState('')
  const [saving,     setSaving]     = useState(false)
  const [expanded,   setExpanded]   = useState(null)

  // ── fetch ──────────────────────────────────────────────────────────────────

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('inscripciones')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) { setError(err.message); setLoading(false); return }
    setRows(data)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  // ── stats ──────────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const total      = rows.length
    const gravel     = rows.filter(r => r.categoria === 'gravel').length
    const paseo      = rows.filter(r => r.categoria === 'paseo').length
    const completado = rows.filter(r => r.estado_pago === 'completado').length
    const pendiente  = rows.filter(r => r.estado_pago === 'pendiente').length
    const fallido    = rows.filter(r => r.estado_pago === 'fallido').length
    const recaudo    = rows.filter(r => r.estado_pago === 'completado').reduce((s, r) => s + (r.precio_cop || 0), 0)
    return { total, gravel, paseo, completado, pendiente, fallido, recaudo }
  }, [rows])

  // ── filter ─────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return rows.filter(r => {
      const matchSearch = !q || [r.nombre, r.apellido, r.email, r.documento, r.ciudad, r.numero_participante]
        .some(v => v && v.toLowerCase().includes(q))
      const matchCat  = filterCat  === 'todas' || r.categoria   === filterCat
      const matchPago = filterPago === 'todos'  || r.estado_pago === filterPago
      return matchSearch && matchCat && matchPago
    })
  }, [rows, search, filterCat, filterPago])

  // ── assign number ──────────────────────────────────────────────────────────

  const startEdit = (row) => {
    setEditingId(row.id)
    setNumInput(row.numero_participante || '')
  }

  const saveNumber = async (id) => {
    setSaving(true)
    const { error: err } = await supabase
      .from('inscripciones')
      .update({ numero_participante: numInput || null })
      .eq('id', id)
    if (err) { alert('Error: ' + err.message) }
    else { setRows(prev => prev.map(r => r.id === id ? { ...r, numero_participante: numInput || null } : r)) }
    setEditingId(null)
    setSaving(false)
  }

  // ── export CSV ─────────────────────────────────────────────────────────────

  const exportCSV = () => {
    const cols = [
      'numero_participante','nombre','apellido','documento','nacimiento','genero',
      'ciudad','email','telefono','categoria','subcategoria','talla',
      'rh','eps','alergias','medicamentos',
      'emergencia_nombre','emergencia_tel','emergencia_rel',
      'precio_cop','estado_pago','created_at',
    ]
    const header = cols.join(',')
    const csvRows = filtered.map(r =>
      cols.map(c => {
        const v = r[c] ?? ''
        return `"${String(v).replace(/"/g, '""')}"`
      }).join(',')
    )
    const blob = new Blob([header + '\n' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscripciones_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── logout ─────────────────────────────────────────────────────────────────

  const logout = () => supabase.auth.signOut()

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="font-black text-lg tracking-tight">Caídos del Zarzo</span>
          <span className="ml-2 text-xs text-zinc-500 uppercase tracking-widest">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 hidden sm:block">{session.user.email}</span>
          <button
            onClick={logout}
            className="text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total inscritos"  value={stats.total}      />
          <StatCard label="Gravel Race"      value={stats.gravel}     />
          <StatCard label="El Paseo"         value={stats.paseo}      />
          <StatCard label="Pagos completos"  value={stats.completado} />
          <StatCard label="Pendientes"       value={stats.pendiente}  />
          <StatCard label="Recaudo real"     value={fmt(stats.recaudo)} sub="solo completados" />
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Buscar por nombre, email, documento, ciudad…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          >
            <option value="todas">Todas las categorías</option>
            <option value="gravel">Gravel Race</option>
            <option value="paseo">El Paseo</option>
          </select>
          <select
            value={filterPago}
            onChange={e => setFilterPago(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          >
            <option value="todos">Todos los estados</option>
            <option value="completado">Completado</option>
            <option value="pendiente">Pendiente</option>
            <option value="fallido">Fallido</option>
          </select>
          <button
            onClick={fetchData}
            className="bg-zinc-800 hover:bg-zinc-700 text-white rounded px-4 py-2 text-sm transition-colors whitespace-nowrap"
          >
            ↻ Actualizar
          </button>
          <button
            onClick={exportCSV}
            className="text-white rounded px-4 py-2 text-sm transition-colors whitespace-nowrap"
            style={{ background: A }}
          >
            ↓ CSV
          </button>
        </div>

        {/* Contador */}
        <div className="text-xs text-zinc-500">
          {filtered.length} de {rows.length} inscritos
          {(search || filterCat !== 'todas' || filterPago !== 'todos') && (
            <button
              onClick={() => { setSearch(''); setFilterCat('todas'); setFilterPago('todos') }}
              className="ml-2 text-amber-500 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Error / loading */}
        {error && (
          <div className="bg-red-950/40 border border-red-900 text-red-400 rounded px-4 py-3 text-sm">
            Error al cargar datos: {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">Sin resultados</div>
        ) : (
          /* Tabla */
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  {['#','Participante','Doc.','Categoría','Talla','Ciudad','Email','Precio','Estado','N° Part.','Fecha'].map(h => (
                    <th key={h} className="text-left text-xs text-zinc-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap font-medium">{h}</th>
                  ))}
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <>
                    <tr
                      key={row.id}
                      onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                      className="border-b border-zinc-800/50 hover:bg-zinc-900/60 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-zinc-500">{i + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">{row.nombre} {row.apellido}</td>
                      <td className="px-4 py-3 text-zinc-400">{row.documento}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="capitalize">{row.categoria}</span>
                        {row.subcategoria && <span className="text-zinc-500 ml-1 text-xs">· {row.subcategoria}</span>}
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{row.talla}</td>
                      <td className="px-4 py-3 text-zinc-400">{row.ciudad}</td>
                      <td className="px-4 py-3 text-zinc-400 max-w-[160px] truncate">{row.email}</td>
                      <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{fmt(row.precio_cop)}</td>
                      <td className="px-4 py-3"><Badge estado={row.estado_pago} /></td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        {editingId === row.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              autoFocus
                              value={numInput}
                              onChange={e => setNumInput(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') saveNumber(row.id); if (e.key === 'Escape') setEditingId(null) }}
                              className="w-20 bg-zinc-800 border border-amber-500 rounded px-2 py-1 text-xs text-white focus:outline-none"
                              placeholder="ej: 042"
                            />
                            <button
                              onClick={() => saveNumber(row.id)}
                              disabled={saving}
                              className="text-xs text-emerald-400 hover:text-emerald-300 px-1"
                            >✓</button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-xs text-zinc-500 hover:text-zinc-300 px-1"
                            >✕</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(row)}
                            className="text-xs hover:underline"
                            style={{ color: row.numero_participante ? '#c47818' : '#52525b' }}
                          >
                            {row.numero_participante || 'Asignar'}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-zinc-500 text-xs whitespace-nowrap">{fmtDate(row.created_at)}</td>
                      <td className="px-4 py-3 text-zinc-600 text-xs">
                        {expanded === row.id ? '▲' : '▼'}
                      </td>
                    </tr>

                    {/* Fila expandida con datos médicos y emergencia */}
                    {expanded === row.id && (
                      <tr key={row.id + '-exp'} className="bg-zinc-900/40 border-b border-zinc-800">
                        <td colSpan={12} className="px-6 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
                            <Detail label="Teléfono"    value={row.telefono} />
                            <Detail label="Nacimiento"  value={row.nacimiento} />
                            <Detail label="Género"      value={row.genero} />
                            <Detail label="Club"        value={row.club} />
                            <Detail label="RH"          value={row.rh} />
                            <Detail label="EPS"         value={row.eps} />
                            <Detail label="Alergias"    value={row.alergias} />
                            <Detail label="Medicamentos" value={row.medicamentos} />
                            <Detail label="Emergencia"  value={`${row.emergencia_nombre} · ${row.emergencia_tel} (${row.emergencia_rel})`} />
                            <Detail label="ID Supabase" value={row.id} mono />
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function Detail({ label, value, mono }) {
  return (
    <div>
      <div className="text-zinc-600 uppercase tracking-wider mb-0.5">{label}</div>
      <div className={`text-zinc-300 ${mono ? 'font-mono text-[10px] break-all' : ''}`}>
        {value || <span className="text-zinc-700">—</span>}
      </div>
    </div>
  )
}
