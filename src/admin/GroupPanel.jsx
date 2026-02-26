import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'

const A = '#c47818'

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(n) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

const ESTADO_LABELS = {
  completado: { label: 'Completado', cls: 'bg-emerald-900/50 text-emerald-400 border-emerald-800' },
  pendiente:  { label: 'Pendiente',  cls: 'bg-amber-900/50  text-amber-400  border-amber-800'  },
  fallido:    { label: 'Fallido',    cls: 'bg-red-900/50    text-red-400    border-red-800'    },
}

const inp = 'w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors'

function Badge({ estado }) {
  const e = ESTADO_LABELS[estado] ?? { label: estado, cls: 'bg-zinc-800 text-zinc-400 border-zinc-700' }
  return <span className={`inline-block text-xs px-2 py-0.5 rounded border font-medium ${e.cls}`}>{e.label}</span>
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-black text-white">{value}</div>
      {sub && <div className="text-xs text-zinc-500 mt-0.5">{sub}</div>}
    </div>
  )
}

// ── AddParticipantForm ────────────────────────────────────────────────────────

function AddParticipantForm({ grupo, onAdded, onCancel }) {
  const [form, setForm] = useState({
    nombre: '', apellido: '', documento: '', email: '',
    telefono: '', ciudad: '', talla: '', subcategoria: '',
  })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const isValid = form.nombre && form.apellido && form.talla &&
    (grupo.categoria !== 'gravel' || form.subcategoria)

  const handleAdd = async () => {
    if (!isValid) return
    setSaving(true)
    setError(null)

    const newId = crypto.randomUUID()
    const estadoPago = grupo.estado_pago === 'completado' ? 'completado' : 'pendiente'

    const { error: dbErr } = await supabase
      .from('inscripciones')
      .insert({
        id:                newId,
        grupo_id:          grupo.id,
        categoria:         grupo.categoria,
        nombre:            form.nombre,
        apellido:          form.apellido,
        documento:         form.documento   || '',
        email:             form.email       || '',
        telefono:          form.telefono    || '',
        ciudad:            form.ciudad      || '',
        talla:             form.talla,
        subcategoria:      form.subcategoria || null,
        precio_cop:        grupo.precio_unitario,
        estado_pago:       estadoPago,
        // Campos requeridos por el esquema — se completan operativamente luego
        nacimiento:        '',
        genero:            '',
        rh:                '',
        eps:               '',
        emergencia_nombre: '',
        emergencia_tel:    '',
        emergencia_rel:    '',
        alergias:          null,
        medicamentos:      null,
        club:              null,
      })

    if (dbErr) {
      setError(dbErr.message)
      setSaving(false)
      return
    }

    onAdded({
      id: newId, ...form,
      subcategoria: form.subcategoria || null,
      precio_cop:   grupo.precio_unitario,
      estado_pago:  estadoPago,
      created_at:   new Date().toISOString(),
    })
    setSaving(false)
  }

  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Nuevo participante</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { k: 'nombre',   label: 'Nombre *',    ph: 'Nombre' },
          { k: 'apellido', label: 'Apellido *',   ph: 'Apellido' },
          { k: 'documento',label: 'Documento',    ph: 'Cédula / Pasaporte' },
          { k: 'email',    label: 'Email',        ph: 'correo@ejemplo.com', type: 'email' },
          { k: 'telefono', label: 'Teléfono',     ph: '+57 300…', type: 'tel' },
          { k: 'ciudad',   label: 'Ciudad',       ph: 'Ciudad' },
        ].map(f => (
          <div key={f.k} className="space-y-1">
            <label className="block text-[10px] text-zinc-400 uppercase tracking-wider">{f.label}</label>
            <input
              type={f.type ?? 'text'}
              placeholder={f.ph}
              value={form[f.k]}
              onChange={e => set(f.k, e.target.value)}
              className={inp}
            />
          </div>
        ))}

        {/* Talla */}
        <div className="space-y-1">
          <label className="block text-[10px] text-zinc-400 uppercase tracking-wider">Talla kit *</label>
          <select value={form.talla} onChange={e => set('talla', e.target.value)} className={inp}>
            <option value="">— Seleccionar —</option>
            {['XS','S','M','L','XL','XXL'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Subcategoría (solo Gravel) */}
        {grupo.categoria === 'gravel' && (
          <div className="space-y-1">
            <label className="block text-[10px] text-zinc-400 uppercase tracking-wider">Subcategoría *</label>
            <select value={form.subcategoria} onChange={e => set('subcategoria', e.target.value)} className={inp}>
              <option value="">— Seleccionar —</option>
              {['Sub-23','Open M/F','Master 35+','Master 45+','Master 55+'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded px-3 py-2">{error}</p>
      )}

      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleAdd}
          disabled={!isValid || saving}
          className="px-5 py-2 text-xs font-semibold text-white rounded transition-colors disabled:opacity-40"
          style={{ background: A }}
        >
          {saving ? 'Agregando…' : '+ Agregar participante'}
        </button>
      </div>
    </div>
  )
}

// ── GroupRow ──────────────────────────────────────────────────────────────────

function GroupRow({ grupo, isExpanded, onToggle }) {
  const [participants, setParticipants] = useState(null)  // null = no cargados
  const [loadingPart,  setLoadingPart]  = useState(false)
  const [showAddForm,  setShowAddForm]  = useState(false)

  const loadParticipants = async () => {
    if (participants !== null) return
    setLoadingPart(true)
    const { data } = await supabase
      .from('inscripciones')
      .select('id, nombre, apellido, email, telefono, talla, subcategoria, numero_participante, estado_pago, created_at')
      .eq('grupo_id', grupo.id)
      .order('created_at', { ascending: true })
    setParticipants(data ?? [])
    setLoadingPart(false)
  }

  const handleToggle = async () => {
    onToggle()
    if (!isExpanded) await loadParticipants()
  }

  const handleParticipantAdded = (newPart) => {
    setParticipants(prev => [...(prev ?? []), newPart])
    setShowAddForm(false)
  }

  const capacidadCubierta = participants?.length ?? 0
  const capacidadTotal    = grupo.num_participantes

  return (
    <>
      <tr
        onClick={handleToggle}
        className="border-b border-zinc-800/50 hover:bg-zinc-900/60 cursor-pointer transition-colors"
      >
        <td className="px-4 py-3 text-zinc-500 text-sm">{fmtDate(grupo.created_at)}</td>
        <td className="px-4 py-3">
          <div className="font-medium text-sm text-white">{grupo.nombre_grupo}</div>
          <div className="text-xs text-zinc-500">{grupo.lider_nombre} {grupo.lider_apellido}</div>
        </td>
        <td className="px-4 py-3 text-sm capitalize text-zinc-300">{grupo.categoria}</td>
        <td className="px-4 py-3">
          <div className="text-sm text-zinc-300">{grupo.num_participantes}</div>
          {participants !== null && (
            <div className="text-[10px] mt-0.5" style={{ color: capacidadCubierta >= capacidadTotal ? '#34d399' : '#f59e0b' }}>
              {capacidadCubierta}/{capacidadTotal} registrados
            </div>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-zinc-300 whitespace-nowrap">{fmt(grupo.precio_unitario)}<span className="text-zinc-600">/p</span></td>
        <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap" style={{ color: A }}>{fmt(grupo.precio_total)}</td>
        <td className="px-4 py-3"><Badge estado={grupo.estado_pago} /></td>
        <td className="px-4 py-3 text-zinc-600 text-xs">{isExpanded ? '▲' : '▼'}</td>
      </tr>

      {isExpanded && (
        <tr className="bg-zinc-900/40 border-b border-zinc-800">
          <td colSpan={8} className="px-6 py-5 space-y-5">

            {/* Datos del líder */}
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-3">Líder del grupo</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {[
                  ['Email',     grupo.lider_email],
                  ['Teléfono',  grupo.lider_telefono],
                  ['Documento', grupo.lider_documento || '—'],
                  ['Ciudad',    grupo.lider_ciudad    || '—'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div className="text-zinc-600 uppercase tracking-wider mb-0.5 text-[9px]">{l}</div>
                    <div className="text-zinc-300">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de participantes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                  Participantes registrados ({participants?.length ?? '…'} / {grupo.num_participantes})
                </p>
                {!showAddForm && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="text-xs px-3 py-1.5 rounded border font-medium transition-colors"
                    style={{ borderColor: A, color: A }}
                  >
                    + Agregar participante
                  </button>
                )}
              </div>

              {loadingPart ? (
                <div className="flex justify-center py-6">
                  <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : participants?.length === 0 ? (
                <p className="text-zinc-600 text-xs py-4">Aún no hay participantes registrados en este grupo.</p>
              ) : (
                <div className="overflow-x-auto rounded border border-zinc-800">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/50">
                        {['#','Participante','Email','Talla','Subcategoría','Estado','Fecha'].map(h => (
                          <th key={h} className="text-left text-[10px] text-zinc-500 uppercase tracking-wider px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((p, i) => (
                        <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/40">
                          <td className="px-3 py-2 text-zinc-600">{i + 1}</td>
                          <td className="px-3 py-2 font-medium text-white">{p.nombre} {p.apellido}</td>
                          <td className="px-3 py-2 text-zinc-400">{p.email || '—'}</td>
                          <td className="px-3 py-2 text-zinc-400">{p.talla}</td>
                          <td className="px-3 py-2 text-zinc-400">{p.subcategoria || '—'}</td>
                          <td className="px-3 py-2"><Badge estado={p.estado_pago} /></td>
                          <td className="px-3 py-2 text-zinc-500">{fmtDate(p.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {showAddForm && (
                <div className="mt-4">
                  <AddParticipantForm
                    grupo={grupo}
                    onAdded={handleParticipantAdded}
                    onCancel={() => setShowAddForm(false)}
                  />
                </div>
              )}
            </div>

          </td>
        </tr>
      )}
    </>
  )
}

// ── GroupPanel (main) ─────────────────────────────────────────────────────────

export default function GroupPanel() {
  const [groups,    setGroups]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [expanded,  setExpanded]  = useState(null)
  const [search,    setSearch]    = useState('')
  const [filterPago, setFilterPago] = useState('todos')

  const fetchGroups = async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('grupos')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) { setError(err.message); setLoading(false); return }
    setGroups(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchGroups() }, [])

  const stats = useMemo(() => {
    const total       = groups.length
    const completados = groups.filter(g => g.estado_pago === 'completado').length
    const pendientes  = groups.filter(g => g.estado_pago === 'pendiente').length
    const participantes = groups.reduce((s, g) => s + g.num_participantes, 0)
    const recaudo     = groups.filter(g => g.estado_pago === 'completado').reduce((s, g) => s + (g.precio_total || 0), 0)
    return { total, completados, pendientes, participantes, recaudo }
  }, [groups])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return groups.filter(g => {
      const matchSearch = !q || [g.nombre_grupo, g.lider_nombre, g.lider_apellido, g.lider_email]
        .some(v => v && v.toLowerCase().includes(q))
      const matchPago = filterPago === 'todos' || g.estado_pago === filterPago
      return matchSearch && matchPago
    })
  }, [groups, search, filterPago])

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard label="Total grupos"          value={stats.total} />
        <StatCard label="Completados"           value={stats.completados} />
        <StatCard label="Pendientes"            value={stats.pendientes} />
        <StatCard label="Participantes totales" value={stats.participantes} sub="en grupos" />
        <StatCard label="Recaudo grupos"        value={fmt(stats.recaudo)} sub="solo completados" />
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Buscar por nombre de grupo, líder, email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
        />
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
          onClick={fetchGroups}
          className="bg-zinc-800 hover:bg-zinc-700 text-white rounded px-4 py-2 text-sm transition-colors whitespace-nowrap"
        >
          ↻ Actualizar
        </button>
      </div>

      <div className="text-xs text-zinc-500">
        {filtered.length} de {groups.length} grupos
      </div>

      {/* Error / Loading */}
      {error && (
        <div className="bg-red-950/40 border border-red-900 text-red-400 rounded px-4 py-3 text-sm">
          Error al cargar grupos: {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">
          {groups.length === 0 ? 'Aún no hay inscripciones grupales' : 'Sin resultados'}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                {['Fecha','Grupo / Líder','Categoría','Participantes','Precio / p.','Total','Estado',''].map(h => (
                  <th key={h} className="text-left text-xs text-zinc-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(grupo => (
                <GroupRow
                  key={grupo.id}
                  grupo={grupo}
                  isExpanded={expanded === grupo.id}
                  onToggle={() => setExpanded(expanded === grupo.id ? null : grupo.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
