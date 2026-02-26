import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const TALLAS       = ['XS','S','M','L','XL','XXL']
const GENEROS      = ['Masculino','Femenino','Otro']
const RH_OPTS      = ['O+','O-','A+','A-','B+','B-','AB+','AB-']
const ESTADOS_PAGO = ['pendiente','completado','fallido']
const SUBCATS_GRAVEL = ['Sub-23','Open M/F','Master 35+','Master 45+','Master 55+']

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs text-zinc-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inp = 'w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors'
const sel = inp + ' cursor-pointer'

export default function EditModal({ row, onClose, onSaved }) {
  const [form, setForm] = useState({
    nombre:            row.nombre            ?? '',
    apellido:          row.apellido          ?? '',
    documento:         row.documento         ?? '',
    nacimiento:        row.nacimiento        ?? '',
    genero:            row.genero            ?? '',
    ciudad:            row.ciudad            ?? '',
    email:             row.email             ?? '',
    telefono:          row.telefono          ?? '',
    club:              row.club              ?? '',
    categoria:         row.categoria         ?? '',
    subcategoria:      row.subcategoria      ?? '',
    talla:             row.talla             ?? '',
    rh:                row.rh                ?? '',
    eps:               row.eps               ?? '',
    alergias:          row.alergias          ?? '',
    medicamentos:      row.medicamentos      ?? '',
    emergencia_nombre: row.emergencia_nombre ?? '',
    emergencia_tel:    row.emergencia_tel    ?? '',
    emergencia_rel:    row.emergencia_rel    ?? '',
    precio_cop:        row.precio_cop        ?? '',
    estado_pago:       row.estado_pago       ?? 'pendiente',
    numero_participante: row.numero_participante ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    const payload = {
      ...form,
      subcategoria:       form.subcategoria       || null,
      club:               form.club               || null,
      alergias:           form.alergias           || null,
      medicamentos:       form.medicamentos        || null,
      numero_participante: form.numero_participante || null,
      precio_cop:         Number(form.precio_cop),
    }
    const { error: err } = await supabase
      .from('inscripciones')
      .update(payload)
      .eq('id', row.id)
    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }
    onSaved({ ...row, ...payload })
    onClose()
  }

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <div className="font-bold text-white">{row.nombre} {row.apellido}</div>
            <div className="text-xs text-zinc-500 mt-0.5">ID: {row.id}</div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-6 space-y-6">

          {/* ── Datos personales ── */}
          <Section title="Datos personales">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre">
                <input className={inp} value={form.nombre} onChange={e => set('nombre', e.target.value)} />
              </Field>
              <Field label="Apellido">
                <input className={inp} value={form.apellido} onChange={e => set('apellido', e.target.value)} />
              </Field>
              <Field label="Documento">
                <input className={inp} value={form.documento} onChange={e => set('documento', e.target.value)} />
              </Field>
              <Field label="Nacimiento">
                <input type="date" className={inp} value={form.nacimiento} onChange={e => set('nacimiento', e.target.value)} />
              </Field>
              <Field label="Género">
                <select className={sel} value={form.genero} onChange={e => set('genero', e.target.value)}>
                  <option value="">— Seleccionar —</option>
                  {GENEROS.map(g => <option key={g}>{g}</option>)}
                </select>
              </Field>
              <Field label="Ciudad">
                <input className={inp} value={form.ciudad} onChange={e => set('ciudad', e.target.value)} />
              </Field>
              <Field label="Email">
                <input type="email" className={inp} value={form.email} onChange={e => set('email', e.target.value)} />
              </Field>
              <Field label="Teléfono">
                <input className={inp} value={form.telefono} onChange={e => set('telefono', e.target.value)} />
              </Field>
              <Field label="Club / equipo">
                <input className={inp} value={form.club} onChange={e => set('club', e.target.value)} placeholder="Opcional" />
              </Field>
            </div>
          </Section>

          {/* ── Categoría ── */}
          <Section title="Categoría e inscripción">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoría">
                <select className={sel} value={form.categoria} onChange={e => set('categoria', e.target.value)}>
                  <option value="gravel">Gravel Race</option>
                  <option value="paseo">El Paseo</option>
                </select>
              </Field>
              {form.categoria === 'gravel' && (
                <Field label="Subcategoría">
                  <select className={sel} value={form.subcategoria} onChange={e => set('subcategoria', e.target.value)}>
                    <option value="">— Seleccionar —</option>
                    {SUBCATS_GRAVEL.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              )}
              <Field label="Talla kit">
                <select className={sel} value={form.talla} onChange={e => set('talla', e.target.value)}>
                  <option value="">— Seleccionar —</option>
                  {TALLAS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Precio COP">
                <input type="number" className={inp} value={form.precio_cop} onChange={e => set('precio_cop', e.target.value)} />
              </Field>
              <Field label="Estado de pago">
                <select className={sel} value={form.estado_pago} onChange={e => set('estado_pago', e.target.value)}>
                  {ESTADOS_PAGO.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="N° participante">
                <input className={inp} value={form.numero_participante} onChange={e => set('numero_participante', e.target.value)} placeholder="ej: 042" />
              </Field>
            </div>
          </Section>

          {/* ── Salud ── */}
          <Section title="Información médica">
            <div className="grid grid-cols-2 gap-4">
              <Field label="RH">
                <select className={sel} value={form.rh} onChange={e => set('rh', e.target.value)}>
                  <option value="">— Seleccionar —</option>
                  {RH_OPTS.map(r => <option key={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="EPS">
                <input className={inp} value={form.eps} onChange={e => set('eps', e.target.value)} />
              </Field>
              <Field label="Alergias">
                <input className={inp} value={form.alergias} onChange={e => set('alergias', e.target.value)} placeholder="Opcional" />
              </Field>
              <Field label="Medicamentos">
                <input className={inp} value={form.medicamentos} onChange={e => set('medicamentos', e.target.value)} placeholder="Opcional" />
              </Field>
            </div>
          </Section>

          {/* ── Emergencia ── */}
          <Section title="Contacto de emergencia">
            <div className="grid grid-cols-3 gap-4">
              <Field label="Nombre">
                <input className={inp} value={form.emergencia_nombre} onChange={e => set('emergencia_nombre', e.target.value)} />
              </Field>
              <Field label="Teléfono">
                <input className={inp} value={form.emergencia_tel} onChange={e => set('emergencia_tel', e.target.value)} />
              </Field>
              <Field label="Relación">
                <input className={inp} value={form.emergencia_rel} onChange={e => set('emergencia_rel', e.target.value)} placeholder="Padre, cónyuge…" />
              </Field>
            </div>
          </Section>

          {/* Error */}
          {error && (
            <div className="bg-red-950/40 border border-red-900 text-red-400 rounded px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-2 border-t border-zinc-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 text-sm font-semibold text-white rounded transition-colors disabled:opacity-50"
              style={{ background: saving ? '#6b4f1f' : '#c47818' }}
            >
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-3 pb-2 border-b border-zinc-800">
        {title}
      </div>
      {children}
    </div>
  )
}
