import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SectionHeader } from './About'
import { CATEGORIES, MODAL_CONTENT } from '@/lib/constants'
import { cn } from '@/lib/utils'

const A = '#c47818'

const STEPS = ['Categoría', 'Datos', 'Salud', 'Pago']

const PAYMENT_INFO = {
  nequi: {
    title: 'Instrucciones Nequi / Daviplata',
    body: 'Envía el pago al número **300 123 4567** (Nombre: Organización Zarzo SAS).\nSube el comprobante en el campo a continuación.',
    showUpload: true,
  },
  transferencia: {
    title: 'Datos Bancarios',
    body: 'Bancolombia · Cuenta de Ahorros\nNro: **123-456789-12**\nA nombre de: **Organización Zarzo SAS**\nNIT: 900.123.456-7',
    showUpload: true,
  },
  efectivo: {
    title: 'Puntos de Pago Efectivo',
    body: 'Baloto · Efecty · Su Red\nReferencia de pago: Se generará al finalizar el registro.\nVálido hasta 48 horas después de completar el formulario.',
    showUpload: false,
  },
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

export default function Registration() {
  const [step, setStep]       = useState(0)
  const [success, setSuccess] = useState(false)
  const [modal, setModal]     = useState(null)
  const [form, setForm]       = useState({
    categoria: '', subcategoria: '', talla: '',
    nombre: '', apellido: '', documento: '', nacimiento: '', genero: '', ciudad: '', email: '', telefono: '', club: '',
    rh: '', eps: '', alergias: '', medicamentos: '', emergenciaNombre: '', emergenciaTel: '', emergenciaRel: '', aptoMedico: false,
    pago: '', terminos: false, reglamento: false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const cat = form.categoria ? CATEGORIES[form.categoria] : null
  const pi  = form.pago ? PAYMENT_INFO[form.pago] : null

  if (success) return <SuccessScreen cat={cat} />

  return (
    <section id="inscripcion" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Regístrate"
          title="Formulario de Inscripción"
          desc="Completa el formulario y asegura tu cupo. Los cupos son limitados."
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-24">
            {/* Price summary */}
            <div className="border border-border bg-card p-6">
              <p className="text-[11px] font-bold tracking-[.3em] uppercase mb-4 text-foreground">
                Resumen
              </p>
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
                  <div className="border-t border-border pt-3" style={{ borderLeft: `3px solid ${A}`, paddingLeft: 10 }}>
                    <p className="text-xs font-semibold" style={{ color: A }}>
                      🐦 Precio Early Bird hasta el 30 de Abril
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Selecciona una categoría para ver el precio</p>
              )}
            </div>

            {/* Cupos */}
            <div className="border border-border bg-card p-6">
              <p className="text-[11px] font-bold tracking-[.3em] uppercase mb-4 text-foreground">
                Estado de Cupos
              </p>
              {[
                { label: 'Gravel Race', val: 62, text: '186/300', color: A },
                { label: 'El Paseo',    val: 40, text: '80/200',  color: '#4a7aaa' },
              ].map(c => (
                <div key={c.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>{c.label}</span><span>{c.text}</span>
                  </div>
                  <Progress value={c.val} indicatorClassName={c.color === A ? 'bg-primary' : 'bg-[#4a7aaa]'} />
                </div>
              ))}
              <p className="text-xs font-semibold mt-3" style={{ color: A }}>⚠️ Gravel Race llenando rápido</p>
            </div>
          </div>

          {/* Main form */}
          <div className="border border-border bg-card">
            {/* Step bar */}
            <div className="flex border-b border-border">
              {STEPS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => i < step && setStep(i)}
                  className="flex-1 py-3 text-[11px] font-bold uppercase tracking-wide transition-colors border-r border-border last:border-r-0"
                  style={{
                    color: i === step ? '#fff' : i < step ? A : 'hsl(27 20% 42%)',
                    background: i === step ? A : 'transparent',
                    cursor: i < step ? 'pointer' : 'default',
                  }}
                >
                  {i < step ? '✓ ' : `${i + 1}. `}{s}
                </button>
              ))}
            </div>

            <div className="p-8">
              <form onSubmit={e => { e.preventDefault(); setSuccess(true) }} className="space-y-5">

                {/* Step 0 — Category */}
                {step === 0 && (
                  <>
                    <h3 className="font-title text-2xl text-foreground tracking-wide">Elige tu Categoría</h3>
                    <RadioGroup value={form.categoria} onValueChange={v => set('categoria', v)} className="grid sm:grid-cols-2 gap-4">
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
                        <Select value={form.subcategoria} onValueChange={v => set('subcategoria', v)}>
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
                      <Select value={form.talla} onValueChange={v => set('talla', v)}>
                        <SelectTrigger><SelectValue placeholder="Selecciona tu talla" /></SelectTrigger>
                        <SelectContent>
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FF>
                  </>
                )}

                {/* Step 1 — Personal data */}
                {step === 1 && (
                  <>
                    <h3 className="font-title text-2xl text-foreground tracking-wide">Datos Personales</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FF label="Nombre(s)" required><Input placeholder="Tu nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} /></FF>
                      <FF label="Apellido(s)" required><Input placeholder="Tus apellidos" value={form.apellido} onChange={e => set('apellido', e.target.value)} /></FF>
                      <FF label="N° Documento" required><Input placeholder="1012345678" value={form.documento} onChange={e => set('documento', e.target.value)} /></FF>
                      <FF label="Fecha de Nacimiento" required><Input type="date" value={form.nacimiento} onChange={e => set('nacimiento', e.target.value)} /></FF>
                      <FF label="Género" required>
                        <Select value={form.genero} onValueChange={v => set('genero', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            {['Masculino', 'Femenino', 'No binario', 'Prefiero no decirlo'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FF>
                      <FF label="Ciudad" required><Input placeholder="Tu ciudad" value={form.ciudad} onChange={e => set('ciudad', e.target.value)} /></FF>
                      <FF label="Correo electrónico" required><Input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={e => set('email', e.target.value)} /></FF>
                      <FF label="Teléfono / WhatsApp" required><Input type="tel" placeholder="+57 300 000 0000" value={form.telefono} onChange={e => set('telefono', e.target.value)} /></FF>
                    </div>
                    <FF label="Club / Equipo (opcional)"><Input placeholder="Nombre de tu equipo o club" value={form.club} onChange={e => set('club', e.target.value)} /></FF>
                  </>
                )}

                {/* Step 2 — Health */}
                {step === 2 && (
                  <>
                    <h3 className="font-title text-2xl text-foreground tracking-wide">Información de Salud</h3>
                    <div className="border-l-4 p-4 text-muted-foreground text-sm bg-muted" style={{ borderColor: A }}>
                      Información estrictamente confidencial, solo usada en emergencias.
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FF label="Tipo de sangre / RH" required>
                        <Select value={form.rh} onValueChange={v => set('rh', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'No sé'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FF>
                      <FF label="EPS / Aseguradora" required><Input placeholder="Nombre de tu EPS" value={form.eps} onChange={e => set('eps', e.target.value)} /></FF>
                    </div>
                    <FF label="Alergias o condiciones médicas"><Textarea placeholder="Ej: alergia a la penicilina, asma..." value={form.alergias} onChange={e => set('alergias', e.target.value)} /></FF>
                    <FF label="Medicamentos actuales"><Textarea placeholder="Lista los medicamentos si es relevante" value={form.medicamentos} onChange={e => set('medicamentos', e.target.value)} /></FF>
                    <FF label="Contacto de emergencia — Nombre" required><Input placeholder="Nombre completo" value={form.emergenciaNombre} onChange={e => set('emergenciaNombre', e.target.value)} /></FF>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FF label="Teléfono de emergencia" required><Input type="tel" placeholder="+57 300 000 0000" value={form.emergenciaTel} onChange={e => set('emergenciaTel', e.target.value)} /></FF>
                      <FF label="Parentesco" required>
                        <Select value={form.emergenciaRel} onValueChange={v => set('emergenciaRel', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            {['Padre/Madre', 'Cónyuge/Pareja', 'Hijo/Hija', 'Hermano/Hermana', 'Amigo/Amiga', 'Otro'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FF>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox id="apto" checked={form.aptoMedico} onCheckedChange={v => set('aptoMedico', v)} />
                      <label htmlFor="apto" className="text-muted-foreground text-sm leading-relaxed cursor-pointer">
                        Declaro que estoy en condiciones físicas aptas y no tengo contraindicaciones médicas para actividad física de alta intensidad. <span style={{ color: A }}>*</span>
                      </label>
                    </div>
                  </>
                )}

                {/* Step 3 — Payment */}
                {step === 3 && (
                  <>
                    <h3 className="font-title text-2xl text-foreground tracking-wide">Método de Pago</h3>
                    {cat && (
                      <div className="border border-border p-4 flex justify-between items-center bg-muted">
                        <div>
                          <strong className="text-foreground text-sm block">{cat.name}</strong>
                          <span className="text-muted-foreground text-xs">{form.nombre} {form.apellido} · {form.email}</span>
                        </div>
                        <strong className="font-title text-2xl" style={{ color: A }}>{cat.price}</strong>
                      </div>
                    )}
                    <RadioGroup value={form.pago} onValueChange={v => set('pago', v)} className="grid sm:grid-cols-3 gap-3">
                      {[
                        { v: 'nequi',         label: 'Nequi / Daviplata',    sub: 'Pago inmediato' },
                        { v: 'transferencia', label: 'Transferencia Bancaria', sub: 'Bancolombia · Davivienda' },
                        { v: 'efectivo',      label: 'Efectivo',             sub: 'Puntos autorizados' },
                      ].map(p => (
                        <label key={p.v} htmlFor={`pm-${p.v}`}
                          className="cursor-pointer border-2 p-4 text-center transition-all"
                          style={{ borderColor: form.pago === p.v ? A : 'hsl(35 26% 77%)' }}>
                          <RadioGroupItem value={p.v} id={`pm-${p.v}`} className="sr-only" />
                          <strong className="text-foreground text-sm block">{p.label}</strong>
                          <small className="text-muted-foreground text-xs">{p.sub}</small>
                        </label>
                      ))}
                    </RadioGroup>
                    {pi && (
                      <div className="border border-border p-5 bg-muted space-y-2">
                        <h5 className="text-foreground font-semibold text-sm">{pi.title}</h5>
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line"
                          dangerouslySetInnerHTML={{ __html: pi.body.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                        {pi.showUpload && (
                          <div className="pt-2">
                            <Label className="text-xs font-semibold uppercase tracking-wide">
                              Comprobante de pago <span style={{ color: A }}>*</span>
                            </Label>
                            <Input type="file" accept="image/*,.pdf" className="mt-2 cursor-pointer" />
                            <p className="text-muted-foreground text-xs mt-1">JPG, PNG, PDF. Máx 5 MB.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="space-y-4">
                      {[
                        { key: 'terminos',   label: 'Acepto los', link: 'terms',      linkLabel: 'Términos y Condiciones', suffix: 'y la', link2: 'privacy', link2Label: 'Política de Privacidad' },
                        { key: 'reglamento', label: 'He leído y acepto el', link: 'reglamento', linkLabel: 'Reglamento de la Carrera' },
                      ].map(c => (
                        <div key={c.key} className="flex items-start gap-3">
                          <Checkbox id={c.key} checked={form[c.key]} onCheckedChange={v => set(c.key, v)} />
                          <label htmlFor={c.key} className="text-muted-foreground text-sm leading-relaxed cursor-pointer">
                            {c.label}{' '}
                            <button type="button" onClick={() => setModal(c.link)} style={{ color: A }} className="underline">{c.linkLabel}</button>
                            {c.suffix && <> {c.suffix} <button type="button" onClick={() => setModal(c.link2)} style={{ color: A }} className="underline">{c.link2Label}</button></>}
                            {' '}de Caídos del Zarzo 2026. <span style={{ color: A }}>*</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4 border-t border-border">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      className="px-6 py-2.5 text-sm font-bold border border-border text-foreground hover:border-foreground transition-colors"
                    >
                      ← Atrás
                    </button>
                  ) : <span />}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s + 1)}
                      className="px-8 py-2.5 text-sm font-bold text-white transition-colors"
                      style={{ background: A }}
                      onMouseEnter={e => e.currentTarget.style.background = '#8f5510'}
                      onMouseLeave={e => e.currentTarget.style.background = A}
                    >
                      Continuar →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-2.5 text-sm font-bold text-white transition-colors"
                      style={{ background: A }}
                      onMouseEnter={e => e.currentTarget.style.background = '#8f5510'}
                      onMouseLeave={e => e.currentTarget.style.background = A}
                    >
                      Completar Inscripción 🏁
                    </button>
                  )}
                </div>
              </form>
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

function SuccessScreen({ cat }) {
  return (
    <section id="inscripcion" className="py-24 bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-7xl mb-6 animate-bounce-up">🎉</div>
        <h3 className="font-title text-5xl text-foreground tracking-wide mb-4">¡Inscripción Recibida!</h3>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          Gracias por inscribirte a <strong className="text-foreground">Caídos del Zarzo 2026</strong>.
        </p>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          En los próximos <strong className="text-foreground">30 minutos</strong> recibirás un correo de confirmación
          con tu número de participante y link de seguimiento de pago.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            className="px-8 py-3 font-bold text-sm text-white"
            style={{ background: A }}
          >
            Descargar Confirmación (PDF)
          </button>
          <button
            className="px-8 py-3 font-bold text-sm border border-border text-foreground hover:border-foreground transition-colors"
            onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar la Ruta
          </button>
        </div>
        <p className="text-muted-foreground text-sm mb-3">¡Comparte tu inscripción!</p>
        <div className="flex gap-3 justify-center">
          <a href={`https://wa.me/?text=¡Me inscribí en Caídos del Zarzo Gravel Race 2026! 🚵 %23CaidosDelZarzo2026`}
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
      </div>
    </section>
  )
}
