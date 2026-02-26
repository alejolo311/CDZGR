import { useState, useEffect } from 'react'
import { Input }     from '@/components/ui/input'
import { Label }     from '@/components/ui/label'
import { Textarea }  from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox }  from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SectionHeader } from './About'
import { CATEGORIES, MODAL_CONTENT } from '@/lib/constants'
import { supabase }             from '@/lib/supabase'
import { createMPPreference, createMPGroupPreference, MP_PRICES, GRUPO_DESCUENTO, GRUPO_MIN } from '@/lib/mercadopago'

const A  = '#c47818'
const MP = '#009EE3'

const IND_STEPS  = ['Categoría', 'Datos', 'Salud', 'Pago']
const GRUP_STEPS = ['Grupo', 'Líder', 'Pago']

// ── helpers ───────────────────────────────────────────────────────────────────

function fmtCOP(n) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
}

function FF({ label, children, required }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[12px] font-semibold text-foreground uppercase tracking-wide">
        {label}{required && <span style={{ color: A }} className="ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  )
}

function ModalContent({ type }) {
  const data = MODAL_CONTENT[type]
  if (!data) return null
  return (
    <>
      <DialogHeader><DialogTitle>{data.title}</DialogTitle></DialogHeader>
      <div className="space-y-4 mt-2">
        {data.sections.map(s => (
          <div key={s.heading}>
            <h3 className="font-semibold text-sm mb-1" style={{ color: A }}>{s.heading}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{s.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── ModeSelector ──────────────────────────────────────────────────────────────

function ModeSelector({ mode, onChange }) {
  return (
    <div className="flex border-b border-border">
      {[
        { id: 'individual', label: 'Individual',              sub: 'Inscripción personal' },
        { id: 'grupal',     label: 'En Grupo',  badge: '10 % dto.',   sub: `Mín. ${GRUPO_MIN} personas` },
      ].map(m => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className="flex-1 py-3.5 px-4 text-left transition-colors border-r border-border last:border-r-0"
          style={{
            background: mode === m.id ? A : 'transparent',
            color:      mode === m.id ? '#fff' : 'hsl(27 20% 42%)',
          }}
        >
          <span className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide">{m.label}</span>
            {m.badge && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: mode === m.id ? 'rgba(255,255,255,0.25)' : A,
                  color: '#fff',
                }}
              >
                {m.badge}
              </span>
            )}
          </span>
          <span
            className="text-[10px] block mt-0.5"
            style={{ color: mode === m.id ? 'rgba(255,255,255,0.75)' : 'hsl(27 15% 60%)' }}
          >
            {m.sub}
          </span>
        </button>
      ))}
    </div>
  )
}

// ── StepBar ───────────────────────────────────────────────────────────────────

function StepBar({ steps, current, onBack }) {
  return (
    <div className="flex border-b border-border">
      {steps.map((s, i) => (
        <button
          key={s}
          type="button"
          onClick={() => i < current && onBack(i)}
          className="flex-1 py-3 text-[11px] font-bold uppercase tracking-wide transition-colors border-r border-border last:border-r-0"
          style={{
            color:      i === current ? '#fff' : i < current ? A : 'hsl(27 20% 42%)',
            background: i === current ? A : 'transparent',
            cursor:     i < current ? 'pointer' : 'default',
          }}
        >
          {i < current ? '✓ ' : `${i + 1}. `}{s}
        </button>
      ))}
    </div>
  )
}

// ── Legales ───────────────────────────────────────────────────────────────────

function Legales({ terminos, reglamento, onSetTerminos, onSetReglamento, onModal }) {
  return (
    <div className="space-y-4">
      {[
        { key: 'terminos',   checked: terminos,   set: onSetTerminos,
          label: 'Acepto los', link: 'terms', linkLabel: 'Términos y Condiciones',
          suffix: 'y la', link2: 'privacy', link2Label: 'Política de Privacidad' },
        { key: 'reglamento', checked: reglamento, set: onSetReglamento,
          label: 'He leído y acepto el', link: 'reglamento', linkLabel: 'Reglamento de la Carrera' },
      ].map(c => (
        <div key={c.key} className="flex items-start gap-3">
          <Checkbox id={c.key} checked={c.checked} onCheckedChange={v => c.set(v)} />
          <label htmlFor={c.key} className="text-muted-foreground text-sm leading-relaxed cursor-pointer">
            {c.label}{' '}
            <button type="button" onClick={() => onModal(c.link)} style={{ color: A }} className="underline">{c.linkLabel}</button>
            {c.suffix && <> {c.suffix} <button type="button" onClick={() => onModal(c.link2)} style={{ color: A }} className="underline">{c.link2Label}</button></>}
            {' '}de Caídos del Zarzo 2026. <span style={{ color: A }}>*</span>
          </label>
        </div>
      ))}
    </div>
  )
}

// ── Registration (main) ───────────────────────────────────────────────────────

export default function Registration() {
  const [mode,     setMode]     = useState('individual')  // 'individual' | 'grupal'
  const [step,     setStep]     = useState(0)             // individual steps
  const [grupStep, setGrupStep] = useState(0)             // group steps
  const [success,  setSuccess]  = useState(null)          // null | { estado, tipo }
  const [isPaying, setIsPaying] = useState(false)
  const [payError, setPayError] = useState(null)
  const [modal,    setModal]    = useState(null)

  /* Detecta el regreso desde MercadoPago (?inscripcion=ok/error/pendiente&tipo=grupo?) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const estado = params.get('inscripcion')
    if (!estado) return

    setSuccess({ estado, tipo: params.get('tipo') || 'individual' })
    window.history.replaceState({}, '', window.location.pathname)
    // El webhook mp-webhook actualiza estado_pago en Supabase y envía el correo.
  }, [])

  // ── Individual form state ──────────────────────────────────────────────────

  const [form, setForm] = useState({
    categoria: '', subcategoria: '', talla: '',
    nombre: '', apellido: '', documento: '', nacimiento: '', genero: '', ciudad: '', email: '', telefono: '', club: '',
    rh: '', eps: '', alergias: '', medicamentos: '',
    emergenciaNombre: '', emergenciaTel: '', emergenciaRel: '',
    aptoMedico: false, terminos: false, reglamento: false,
  })
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const cat  = form.categoria ? CATEGORIES[form.categoria] : null

  // ── Group form state ───────────────────────────────────────────────────────

  const [grupForm, setGrupForm] = useState({
    categoria: '', nombreGrupo: '', numParticipantes: GRUPO_MIN,
    nombre: '', apellido: '', documento: '', email: '', telefono: '', ciudad: '',
    terminos: false, reglamento: false,
  })
  const setG = (k, v) => setGrupForm(f => ({ ...f, [k]: v }))

  const grupPrecioUnit  = grupForm.categoria ? Math.round(MP_PRICES[grupForm.categoria] * (1 - GRUPO_DESCUENTO)) : 0
  const grupPrecioTotal = grupPrecioUnit * (grupForm.numParticipantes || 0)
  const grupCat         = grupForm.categoria ? CATEGORIES[grupForm.categoria] : null

  // Reset step when switching mode
  const handleModeChange = (m) => {
    setMode(m)
    setPayError(null)
    if (m === 'individual') setStep(0)
    else setGrupStep(0)
  }

  // Validation guards for "Continuar"
  const canContinueInd = () => {
    if (step === 0) return !!form.categoria && !!form.talla && (form.categoria !== 'gravel' || !!form.subcategoria)
    if (step === 1) return !!(form.nombre && form.apellido && form.documento && form.nacimiento && form.genero && form.ciudad && form.email && form.telefono)
    if (step === 2) return !!(form.aptoMedico && form.rh && form.eps && form.emergenciaNombre && form.emergenciaTel && form.emergenciaRel)
    return true
  }

  const canContinueGrup = () => {
    if (grupStep === 0) return !!(grupForm.categoria && grupForm.nombreGrupo.trim().length >= 2 && grupForm.numParticipantes >= GRUPO_MIN)
    if (grupStep === 1) return !!(grupForm.nombre && grupForm.apellido && grupForm.email && grupForm.telefono)
    return true
  }

  // ── handlePay (individual) ─────────────────────────────────────────────────

  const handlePay = async () => {
    if (!form.terminos || !form.reglamento) return
    setIsPaying(true)
    setPayError(null)
    try {
      const inscripcionId = crypto.randomUUID()
      const { error: dbError } = await supabase
        .from('inscripciones')
        .insert({
          id:                inscripcionId,
          categoria:         form.categoria,
          subcategoria:      form.subcategoria  || null,
          talla:             form.talla,
          nombre:            form.nombre,
          apellido:          form.apellido,
          documento:         form.documento,
          nacimiento:        form.nacimiento,
          genero:            form.genero,
          ciudad:            form.ciudad,
          email:             form.email,
          telefono:          form.telefono,
          club:              form.club         || null,
          rh:                form.rh,
          eps:               form.eps,
          alergias:          form.alergias     || null,
          medicamentos:      form.medicamentos || null,
          emergencia_nombre: form.emergenciaNombre,
          emergencia_tel:    form.emergenciaTel,
          emergencia_rel:    form.emergenciaRel,
          precio_cop:        cat.priceNum,
          estado_pago:       'pendiente',
        })
      if (dbError) throw dbError

      const url = await createMPPreference({
        categoria:   form.categoria,
        nombre:      form.nombre,
        apellido:    form.apellido,
        email:       form.email,
        telefono:    form.telefono,
        externalRef: inscripcionId,
      })
      window.location.href = url
    } catch (err) {
      console.error('[Inscripción] Error:', err)
      setPayError(err.message || 'Error al iniciar el pago. Intenta de nuevo.')
      setIsPaying(false)
    }
  }

  // ── handleGroupPay ─────────────────────────────────────────────────────────

  const handleGroupPay = async () => {
    if (!grupForm.terminos || !grupForm.reglamento) return
    setIsPaying(true)
    setPayError(null)
    try {
      const grupoId = crypto.randomUUID()
      const { error: dbError } = await supabase
        .from('grupos')
        .insert({
          id:                grupoId,
          nombre_grupo:      grupForm.nombreGrupo.trim(),
          categoria:         grupForm.categoria,
          num_participantes: grupForm.numParticipantes,
          precio_unitario:   grupPrecioUnit,
          precio_total:      grupPrecioTotal,
          estado_pago:       'pendiente',
          lider_nombre:      grupForm.nombre,
          lider_apellido:    grupForm.apellido,
          lider_email:       grupForm.email,
          lider_telefono:    grupForm.telefono,
          lider_documento:   grupForm.documento || null,
          lider_ciudad:      grupForm.ciudad    || null,
        })
      if (dbError) throw dbError

      const url = await createMPGroupPreference({
        categoria:        grupForm.categoria,
        nombre:           grupForm.nombre,
        apellido:         grupForm.apellido,
        email:            grupForm.email,
        telefono:         grupForm.telefono,
        numParticipantes: grupForm.numParticipantes,
        grupoId,
      })
      window.location.href = url
    } catch (err) {
      console.error('[Grupo] Error:', err)
      setPayError(err.message || 'Error al iniciar el pago. Intenta de nuevo.')
      setIsPaying(false)
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────

  if (success) return <SuccessScreen estado={success.estado} tipo={success.tipo} />

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section id="inscripcion" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Regístrate"
          title="Formulario de Inscripción"
          desc="Completa el formulario en pocos pasos y paga de forma segura con MercadoPago."
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">

          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <div className="space-y-5 lg:sticky lg:top-24">
            {mode === 'individual' ? (
              <IndSidebar cat={cat} step={step} />
            ) : (
              <GrupSidebar
                grupCat={grupCat}
                numParticipantes={grupForm.numParticipantes}
                precioUnit={grupPrecioUnit}
                precioTotal={grupPrecioTotal}
                grupStep={grupStep}
              />
            )}
          </div>

          {/* ── Formulario ───────────────────────────────────────────────── */}
          <div className="border border-border bg-card">

            {/* Selector de modo */}
            <ModeSelector mode={mode} onChange={handleModeChange} />

            {/* Step bar */}
            {mode === 'individual' ? (
              <StepBar steps={IND_STEPS}  current={step}     onBack={setStep} />
            ) : (
              <StepBar steps={GRUP_STEPS} current={grupStep} onBack={setGrupStep} />
            )}

            <div className="p-8">
              <div className="space-y-5">

                {/* ════════ INDIVIDUAL STEPS ════════ */}
                {mode === 'individual' && (
                  <>
                    {/* Step 0 · Categoría */}
                    {step === 0 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Elige tu Categoría</h3>
                        <RadioGroup value={form.categoria} onValueChange={v => setF('categoria', v)} className="grid sm:grid-cols-2 gap-4">
                          {Object.values(CATEGORIES).map(c => (
                            <label key={c.id} htmlFor={`cat-${c.id}`}
                              className="cursor-pointer border-2 p-5 flex items-center gap-4 transition-all"
                              style={{ borderColor: form.categoria === c.id ? A : 'hsl(35 26% 77%)' }}>
                              <RadioGroupItem value={c.id} id={`cat-${c.id}`} />
                              <span className="text-3xl">{c.icon}</span>
                              <div>
                                <strong className="text-foreground block">{c.name}</strong>
                                <span className="text-muted-foreground text-xs">{c.specs[0].value} · {c.specs[1].value} desnivel</span>
                                <em className="font-bold block text-sm not-italic" style={{ color: A }}>{c.price}</em>
                              </div>
                            </label>
                          ))}
                        </RadioGroup>
                        {form.categoria === 'gravel' && (
                          <FF label="Subcategoría de edad" required>
                            <Select value={form.subcategoria} onValueChange={v => setF('subcategoria', v)}>
                              <SelectTrigger><SelectValue placeholder="Selecciona tu subcategoría" /></SelectTrigger>
                              <SelectContent>
                                {['Sub-23 (menores de 23 años)', 'Open (23–34 años)', 'Master 35+ (35–44 años)', 'Master 45+ (45–54 años)', 'Master 55+ (55 años o más)'].map(o => (
                                  <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FF>
                        )}
                        <FF label="Talla de camiseta" required>
                          <Select value={form.talla} onValueChange={v => setF('talla', v)}>
                            <SelectTrigger><SelectValue placeholder="Selecciona tu talla" /></SelectTrigger>
                            <SelectContent>
                              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FF>
                      </>
                    )}

                    {/* Step 1 · Datos personales */}
                    {step === 1 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Datos Personales</h3>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FF label="Nombre(s)" required><Input value={form.nombre}    onChange={e => setF('nombre', e.target.value)} /></FF>
                          <FF label="Apellido(s)" required><Input value={form.apellido}  onChange={e => setF('apellido', e.target.value)} /></FF>
                          <FF label="N° Documento" required><Input value={form.documento} onChange={e => setF('documento', e.target.value)} /></FF>
                          <FF label="Fecha de Nacimiento" required><Input type="date" value={form.nacimiento} onChange={e => setF('nacimiento', e.target.value)} /></FF>
                          <FF label="Género" required>
                            <Select value={form.genero} onValueChange={v => setF('genero', v)}>
                              <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                              <SelectContent>
                                {['Masculino', 'Femenino', 'No binario', 'Prefiero no decirlo'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </FF>
                          <FF label="Ciudad" required><Input value={form.ciudad}    onChange={e => setF('ciudad', e.target.value)} /></FF>
                          <FF label="Correo electrónico" required><Input type="email" value={form.email}     onChange={e => setF('email', e.target.value)} /></FF>
                          <FF label="Teléfono / WhatsApp" required><Input type="tel" value={form.telefono} onChange={e => setF('telefono', e.target.value)} /></FF>
                        </div>
                        <FF label="Club / Equipo (opcional)"><Input value={form.club} onChange={e => setF('club', e.target.value)} /></FF>
                      </>
                    )}

                    {/* Step 2 · Salud */}
                    {step === 2 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Información de Salud</h3>
                        <div className="border-l-4 p-4 text-muted-foreground text-sm bg-muted" style={{ borderColor: A }}>
                          Información estrictamente confidencial, solo usada en emergencias.
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FF label="Tipo de sangre / RH" required>
                            <Select value={form.rh} onValueChange={v => setF('rh', v)}>
                              <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                              <SelectContent>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'No sé'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </FF>
                          <FF label="EPS / Aseguradora" required><Input value={form.eps} onChange={e => setF('eps', e.target.value)} /></FF>
                        </div>
                        <FF label="Alergias o condiciones médicas"><Textarea value={form.alergias}     onChange={e => setF('alergias', e.target.value)} /></FF>
                        <FF label="Medicamentos actuales"><Textarea         value={form.medicamentos} onChange={e => setF('medicamentos', e.target.value)} /></FF>
                        <FF label="Contacto de emergencia — Nombre" required><Input value={form.emergenciaNombre} onChange={e => setF('emergenciaNombre', e.target.value)} /></FF>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FF label="Teléfono de emergencia" required><Input type="tel" value={form.emergenciaTel} onChange={e => setF('emergenciaTel', e.target.value)} /></FF>
                          <FF label="Parentesco" required>
                            <Select value={form.emergenciaRel} onValueChange={v => setF('emergenciaRel', v)}>
                              <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                              <SelectContent>
                                {['Padre/Madre', 'Cónyuge/Pareja', 'Hijo/Hija', 'Hermano/Hermana', 'Amigo/Amiga', 'Otro'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </FF>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox id="apto" checked={form.aptoMedico} onCheckedChange={v => setF('aptoMedico', v)} />
                          <label htmlFor="apto" className="text-muted-foreground text-sm leading-relaxed cursor-pointer">
                            Declaro que estoy en condiciones físicas aptas y no tengo contraindicaciones médicas para actividad física de alta intensidad. <span style={{ color: A }}>*</span>
                          </label>
                        </div>
                      </>
                    )}

                    {/* Step 3 · Pago (individual) */}
                    {step === 3 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Resumen y Pago</h3>
                        {cat && (
                          <div className="border border-border p-5 bg-muted space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong className="text-foreground block">{cat.name}</strong>
                                <span className="text-muted-foreground text-xs">{form.nombre} {form.apellido}</span>
                                <span className="text-muted-foreground text-xs block">{form.email}</span>
                                {form.subcategoria && <span className="text-xs mt-1 block" style={{ color: A }}>{form.subcategoria}</span>}
                              </div>
                              <strong className="font-title text-3xl shrink-0" style={{ color: A }}>{cat.price}</strong>
                            </div>
                            <div className="flex justify-between text-xs border-t border-border pt-2">
                              <span className="text-muted-foreground">Seguro de accidentes</span>
                              <span style={{ color: '#4a7aaa' }}>Incluido</span>
                            </div>
                          </div>
                        )}
                        <Legales
                          terminos={form.terminos}     onSetTerminos={v => setF('terminos', v)}
                          reglamento={form.reglamento} onSetReglamento={v => setF('reglamento', v)}
                          onModal={setModal}
                        />
                        <PayButton
                          label={`Pagar ${cat?.price} · MercadoPago`}
                          disabled={!form.terminos || !form.reglamento}
                          isPaying={isPaying}
                          onClick={handlePay}
                        />
                        {payError && <PayError msg={payError} />}
                      </>
                    )}
                  </>
                )}

                {/* ════════ GROUP STEPS ════════ */}
                {mode === 'grupal' && (
                  <>
                    {/* Grup Step 0 · Info del grupo */}
                    {grupStep === 0 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Información del Grupo</h3>

                        {/* Categoría */}
                        <FF label="Categoría" required>
                          <RadioGroup value={grupForm.categoria} onValueChange={v => setG('categoria', v)} className="grid sm:grid-cols-2 gap-4 mt-1">
                            {Object.values(CATEGORIES).map(c => (
                              <label key={c.id} htmlFor={`gcat-${c.id}`}
                                className="cursor-pointer border-2 p-4 flex items-center gap-3 transition-all"
                                style={{ borderColor: grupForm.categoria === c.id ? A : 'hsl(35 26% 77%)' }}>
                                <RadioGroupItem value={c.id} id={`gcat-${c.id}`} />
                                <span className="text-2xl">{c.icon}</span>
                                <div>
                                  <strong className="text-foreground text-sm block">{c.name}</strong>
                                  <em className="font-bold text-xs not-italic" style={{ color: A }}>
                                    {fmtCOP(Math.round(c.priceNum * (1 - GRUPO_DESCUENTO)))} / persona
                                  </em>
                                  <span className="text-muted-foreground text-xs block line-through">{c.price}</span>
                                </div>
                              </label>
                            ))}
                          </RadioGroup>
                        </FF>

                        <FF label="Nombre del grupo" required>
                          <Input
                            placeholder="Ej: Club Ciclistas Cali, Empresa XYZ…"
                            value={grupForm.nombreGrupo}
                            onChange={e => setG('nombreGrupo', e.target.value)}
                          />
                        </FF>

                        <FF label={`Número de participantes (mínimo ${GRUPO_MIN})`} required>
                          <Input
                            type="number"
                            min={GRUPO_MIN}
                            step={1}
                            value={grupForm.numParticipantes}
                            onChange={e => setG('numParticipantes', Math.max(GRUPO_MIN, parseInt(e.target.value) || GRUPO_MIN))}
                          />
                        </FF>

                        {/* Live discount calculator */}
                        {grupForm.categoria && (
                          <div className="border border-border p-5 bg-muted space-y-2 text-sm">
                            <p className="font-bold text-foreground uppercase text-[10px] tracking-widest mb-3">Resumen del Descuento</p>
                            <Row label="Categoría"        value={grupCat?.name} />
                            <Row label="Participantes"    value={grupForm.numParticipantes} />
                            <Row label="Precio regular"   value={`${fmtCOP(MP_PRICES[grupForm.categoria])} / persona`} muted />
                            <Row label={`Descuento ${GRUPO_DESCUENTO * 100}%`} value={`− ${fmtCOP(MP_PRICES[grupForm.categoria] - grupPrecioUnit)} / persona`} accent />
                            <Row label="Precio con dto."  value={`${fmtCOP(grupPrecioUnit)} / persona`} />
                            <div className="border-t border-border pt-2 mt-2">
                              <Row label="Total a pagar" value={fmtCOP(grupPrecioTotal)} bold />
                              <Row label="Ahorro total"  value={`${fmtCOP((MP_PRICES[grupForm.categoria] - grupPrecioUnit) * grupForm.numParticipantes)}`} accent />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Grup Step 1 · Datos del líder */}
                    {grupStep === 1 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Datos del Líder</h3>
                        <p className="text-muted-foreground text-sm">
                          Solo necesitamos los datos de quien realiza el pago. Los demás participantes se gestionan operativamente.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FF label="Nombre(s)" required><Input value={grupForm.nombre}    onChange={e => setG('nombre', e.target.value)} /></FF>
                          <FF label="Apellido(s)" required><Input value={grupForm.apellido}  onChange={e => setG('apellido', e.target.value)} /></FF>
                          <FF label="N° Documento"><Input value={grupForm.documento} onChange={e => setG('documento', e.target.value)} /></FF>
                          <FF label="Ciudad"><Input value={grupForm.ciudad}    onChange={e => setG('ciudad', e.target.value)} /></FF>
                          <FF label="Correo electrónico" required><Input type="email" value={grupForm.email}    onChange={e => setG('email', e.target.value)} /></FF>
                          <FF label="Teléfono / WhatsApp" required><Input type="tel" value={grupForm.telefono} onChange={e => setG('telefono', e.target.value)} /></FF>
                        </div>
                      </>
                    )}

                    {/* Grup Step 2 · Pago grupal */}
                    {grupStep === 2 && (
                      <>
                        <h3 className="font-title text-2xl text-foreground tracking-wide">Resumen y Pago Grupal</h3>

                        <div className="border border-border p-5 bg-muted space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <strong className="text-foreground block">{grupForm.nombreGrupo}</strong>
                              <span className="text-muted-foreground text-xs">{grupCat?.name} · {grupForm.numParticipantes} participantes</span>
                              <span className="text-muted-foreground text-xs block">{grupForm.nombre} {grupForm.apellido} · {grupForm.email}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <strong className="font-title text-3xl block" style={{ color: A }}>{fmtCOP(grupPrecioTotal)}</strong>
                              <span className="text-xs text-muted-foreground">{fmtCOP(grupPrecioUnit)} × {grupForm.numParticipantes}</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs border-t border-border pt-2">
                            <span className="text-muted-foreground">Descuento grupal (10%)</span>
                            <span style={{ color: '#4a7aaa' }}>Aplicado</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Seguro de accidentes</span>
                            <span style={{ color: '#4a7aaa' }}>Incluido para todos</span>
                          </div>
                        </div>

                        <Legales
                          terminos={grupForm.terminos}     onSetTerminos={v => setG('terminos', v)}
                          reglamento={grupForm.reglamento} onSetReglamento={v => setG('reglamento', v)}
                          onModal={setModal}
                        />
                        <PayButton
                          label={`Pagar ${fmtCOP(grupPrecioTotal)} · MercadoPago`}
                          disabled={!grupForm.terminos || !grupForm.reglamento}
                          isPaying={isPaying}
                          onClick={handleGroupPay}
                        />
                        {payError && <PayError msg={payError} />}
                      </>
                    )}
                  </>
                )}

                {/* ── Navegación ────────────────────────────────────────── */}
                <div className="flex justify-between pt-4 border-t border-border">
                  {/* Botón Atrás */}
                  {((mode === 'individual' && step > 0) || (mode === 'grupal' && grupStep > 0)) ? (
                    <button
                      type="button"
                      onClick={() => mode === 'individual' ? setStep(s => s - 1) : setGrupStep(s => s - 1)}
                      className="px-6 py-2.5 text-sm font-bold border border-border text-foreground hover:border-foreground transition-colors"
                    >
                      ← Atrás
                    </button>
                  ) : <span />}

                  {/* Botón Continuar */}
                  {mode === 'individual' && step < 3 && (
                    <button
                      type="button"
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canContinueInd()}
                      className="px-8 py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: A }}
                    >
                      Continuar →
                    </button>
                  )}
                  {mode === 'grupal' && grupStep < 2 && (
                    <button
                      type="button"
                      onClick={() => setGrupStep(s => s + 1)}
                      disabled={!canContinueGrup()}
                      className="px-8 py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: A }}
                    >
                      Continuar →
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!modal} onOpenChange={o => !o && setModal(null)}>
        <DialogContent className="max-w-lg">
          <ModalContent type={modal} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

// ── Shared small components ───────────────────────────────────────────────────

function Row({ label, value, muted, accent, bold }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={`text-xs ${bold ? 'font-bold text-foreground' : ''}`}
        style={accent ? { color: A } : muted ? {} : {}}
      >
        {value}
      </span>
    </div>
  )
}

function PayButton({ label, disabled, isPaying, onClick }) {
  return (
    <div className="space-y-3 pt-2">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || isPaying}
        className="w-full py-4 font-bold text-white text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-opacity"
        style={{ background: (disabled || isPaying) ? '#aac9e5' : MP, cursor: (disabled || isPaying) ? 'not-allowed' : 'pointer' }}
      >
        {isPaying ? (
          <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando…</>
        ) : (
          <>🔒 {label}</>
        )}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Tarjeta de crédito/débito · PSE · Nequi · Daviplata · Efectivo
      </p>
    </div>
  )
}

function PayError({ msg }) {
  return (
    <div className="border border-red-300 bg-red-50 p-3 text-red-700 text-sm rounded">
      ⚠️ {msg}
    </div>
  )
}

// ── Sidebars ──────────────────────────────────────────────────────────────────

function IndSidebar({ cat, step }) {
  const STEPS = ['Categoría', 'Datos', 'Salud', 'Pago']
  return (
    <>
      <div className="border border-border bg-card p-6">
        <p className="text-[11px] font-bold tracking-[.3em] uppercase mb-4 text-foreground">Resumen</p>
        {cat ? (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">{cat.name}</span>
              <strong className="font-title text-2xl" style={{ color: A }}>{cat.price}</strong>
            </div>
            <div className="flex justify-between text-xs border-t border-border pt-2">
              <span className="text-muted-foreground">Seguro accidentes</span>
              <span style={{ color: '#4a7aaa' }}>Incluido</span>
            </div>
            <div className="border-t border-border pt-3" style={{ borderLeft: `3px solid ${MP}`, paddingLeft: 10 }}>
              <p className="text-xs font-semibold" style={{ color: MP }}>🔒 Pago seguro con MercadoPago</p>
              <p className="text-xs text-muted-foreground mt-0.5">Tarjeta · PSE · Nequi · Efectivo</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Selecciona una categoría para ver el precio</p>
        )}
      </div>
      <div className="border border-border bg-card p-6">
        <p className="text-[11px] font-bold tracking-[.3em] uppercase mb-4 text-foreground">Proceso</p>
        <ol className="space-y-2">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-xs">
              <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: i <= step ? A : 'hsl(35 20% 88%)', color: i <= step ? '#fff' : 'hsl(27 20% 42%)' }}>
                {i < step ? '✓' : i + 1}
              </span>
              <span style={{ color: i === step ? A : i < step ? 'hsl(27 30% 50%)' : 'hsl(27 15% 65%)' }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

function GrupSidebar({ grupCat, numParticipantes, precioUnit, precioTotal, grupStep }) {
  const STEPS = ['Grupo', 'Líder', 'Pago']
  return (
    <>
      <div className="border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold tracking-[.3em] uppercase text-foreground">Inscripción Grupal</p>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: A }}>
            10% DTO
          </span>
        </div>
        {grupCat ? (
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">{grupCat.name}</span>
              <strong className="font-title text-xl" style={{ color: A }}>{fmtCOP(precioUnit)}<span className="text-xs font-normal">/p</span></strong>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Participantes</span><span>{numParticipantes}</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
              <span className="text-foreground">Total</span>
              <span style={{ color: A }}>{fmtCOP(precioTotal)}</span>
            </div>
            <div className="border-t border-border pt-3" style={{ borderLeft: `3px solid ${MP}`, paddingLeft: 10 }}>
              <p className="text-xs font-semibold" style={{ color: MP }}>🔒 Pago seguro con MercadoPago</p>
              <p className="text-xs text-muted-foreground mt-0.5">Tarjeta · PSE · Nequi · Efectivo</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Selecciona una categoría para ver el precio con descuento</p>
        )}
      </div>
      <div className="border border-border bg-card p-6">
        <p className="text-[11px] font-bold tracking-[.3em] uppercase mb-4 text-foreground">Proceso Grupal</p>
        <ol className="space-y-2">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-xs">
              <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: i <= grupStep ? A : 'hsl(35 20% 88%)', color: i <= grupStep ? '#fff' : 'hsl(27 20% 42%)' }}>
                {i < grupStep ? '✓' : i + 1}
              </span>
              <span style={{ color: i === grupStep ? A : i < grupStep ? 'hsl(27 30% 50%)' : 'hsl(27 15% 65%)' }}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tras el pago, el organizador asignará los cupos a cada participante. Recibirás un correo con las instrucciones.
          </p>
        </div>
      </div>
    </>
  )
}

// ── Success Screen ─────────────────────────────────────────────────────────────

const SUCCESS_CONTENT = {
  individual: {
    ok: {
      emoji: '🎉', title: '¡Pago Confirmado!',
      body: 'Tu inscripción en Caídos del Zarzo 2026 está asegurada. Recibirás un correo con tu número de participante e instrucciones para el kit.',
      share: true,
    },
    pendiente: {
      emoji: '⏳', title: 'Pago en Revisión',
      body: 'MercadoPago está procesando tu pago. Te notificaremos por correo cuando se confirme (puede tardar hasta 24 h). Tu inscripción ya está registrada.',
    },
    error: {
      emoji: '❌', title: 'Pago no completado',
      body: 'El pago fue rechazado o cancelado. Puedes intentarlo nuevamente — tu formulario no se perdió.',
      retry: true,
    },
  },
  grupo: {
    ok: {
      emoji: '🎉', title: '¡Grupo Registrado!',
      body: 'El pago grupal fue confirmado. Recibirás un correo con instrucciones para coordinar los datos de cada participante y la entrega de kits.',
      share: true,
    },
    pendiente: {
      emoji: '⏳', title: 'Pago Grupal en Revisión',
      body: 'MercadoPago está procesando el pago de tu grupo. Te notificaremos por correo cuando se confirme (puede tardar hasta 24 h).',
    },
    error: {
      emoji: '❌', title: 'Pago no completado',
      body: 'El pago fue rechazado o cancelado. Puedes intentarlo nuevamente.',
      retry: true,
    },
  },
}

function SuccessScreen({ estado, tipo }) {
  const c = SUCCESS_CONTENT[tipo]?.[estado] ?? SUCCESS_CONTENT.individual.ok
  return (
    <section id="inscripcion" className="py-24 bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-7xl mb-6">{c.emoji}</div>
        <h3 className="font-title text-5xl text-foreground tracking-wide mb-4">{c.title}</h3>
        <p className="text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">{c.body}</p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {c.retry && (
            <button className="px-8 py-3 font-bold text-sm text-white" style={{ background: MP }} onClick={() => window.location.reload()}>
              Intentar de nuevo
            </button>
          )}
          <button
            className="px-8 py-3 font-bold text-sm border border-border text-foreground hover:border-foreground transition-colors"
            onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar la Ruta
          </button>
        </div>
        {c.share && (
          <>
            <p className="text-muted-foreground text-sm mb-3">¡Comparte tu inscripción!</p>
            <div className="flex gap-3 justify-center">
              <a href="https://wa.me/?text=¡Me inscribí en Caídos del Zarzo Gravel Race 2026! 🚵 %23CaidosDelZarzo2026"
                target="_blank" rel="noreferrer"
                className="bg-[#25d366] text-white font-bold py-2.5 px-6 text-sm hover:opacity-90 transition-opacity">
                WhatsApp
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="text-white font-bold py-2.5 px-6 text-sm hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)' }}>
                Instagram
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
