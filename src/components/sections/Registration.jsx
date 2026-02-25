import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SectionHeader } from './About'
import { CATEGORIES, MODAL_CONTENT } from '@/lib/constants'
import { cn } from '@/lib/utils'

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

function FormField({ label, children, required }) {
  return (
    <div className="space-y-2">
      <Label>{label}{required && <span className="text-primary ml-0.5">*</span>}</Label>
      {children}
    </div>
  )
}

function ModalContent({ type }) {
  const data = MODAL_CONTENT[type]
  if (!data) return null
  return (
    <>
      <DialogHeader>
        <DialogTitle>{data.title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-2">
        {data.sections.map((s) => (
          <div key={s.heading}>
            <h3 className="text-primary font-semibold text-sm mb-1">{s.heading}</h3>
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

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const cat = form.categoria ? CATEGORIES[form.categoria] : null
  const pi  = form.pago ? PAYMENT_INFO[form.pago] : null

  const next = () => { if (step < 3) setStep(step + 1) }
  const prev = () => { if (step > 0) setStep(step - 1) }
  const submit = (e) => { e.preventDefault(); setSuccess(true) }

  if (success) return <SuccessScreen cat={cat} />

  return (
    <section id="inscripcion" className="py-24 bg-accent">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Regístrate" title="Formulario de Inscripción" desc="Completa el formulario y asegura tu cupo. Los cupos son limitados." />

        <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-start">
          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-28">
            {/* Price card */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-white font-bold">Resumen de Inscripción</h3>
                {cat ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{cat.name}</span>
                      <strong className="text-primary text-lg">{cat.price}</strong>
                    </div>
                    <div className="flex justify-between text-sm border-t border-border pt-3">
                      <span className="text-muted-foreground">Seguro de acc.</span>
                      <span className="text-emerald-race">Incluido</span>
                    </div>
                    <div className="bg-emerald-race/10 border border-emerald-race/30 rounded-xl p-3">
                      <p className="text-emerald-race text-xs font-semibold">🐦 Precio Early Bird activo hasta el 30 de Abril</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">Selecciona una categoría para ver el precio</p>
                )}
              </CardContent>
            </Card>

            {/* Cupos */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <h4 className="text-white font-bold text-sm">Estado de Cupos</h4>
                {[
                  { label: 'Gravel Race', val: 62, text: '186/300', green: false },
                  { label: 'El Paseo',    val: 40, text: '80/200',  green: true  },
                ].map((c) => (
                  <div key={c.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{c.label}</span><span>{c.text}</span>
                    </div>
                    <Progress value={c.val} indicatorClassName={c.green ? 'bg-emerald-race' : 'bg-primary'} />
                  </div>
                ))}
                <p className="text-primary text-xs font-semibold">⚠️ ¡La Gravel Race está llenando rápido!</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              {/* Step indicators */}
              <div className="flex items-center mb-10 gap-0">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <button
                      onClick={() => i < step && setStep(i)}
                      className={cn(
                        'text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-all',
                        i === step ? 'bg-primary/15 text-primary' : i < step ? 'text-emerald-race' : 'text-muted-foreground'
                      )}
                    >
                      {i < step ? '✓ ' : `${i + 1}. `}{s}
                    </button>
                    {i < STEPS.length - 1 && <div className="flex-1 h-px bg-border mx-1" />}
                  </div>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-6">
                {/* Step 1 – Category */}
                {step === 0 && (
                  <>
                    <h3 className="font-title text-2xl text-white tracking-wide">Elige tu Categoría</h3>
                    <RadioGroup value={form.categoria} onValueChange={(v) => set('categoria', v)}
                      className="grid sm:grid-cols-2 gap-4">
                      {Object.values(CATEGORIES).map((c) => (
                        <label key={c.id} htmlFor={`cat-${c.id}`}
                          className={cn('cursor-pointer border-2 rounded-xl p-5 flex items-center gap-4 transition-all',
                            form.categoria === c.id ? 'border-primary bg-primary/8' : 'border-border hover:border-border/60')}>
                          <RadioGroupItem value={c.id} id={`cat-${c.id}`} />
                          <span className="text-4xl">{c.icon}</span>
                          <div>
                            <strong className="text-white block">{c.name}</strong>
                            <span className="text-muted-foreground text-xs">{c.specs[0].value} · {c.specs[1].value} desnivel</span>
                            <em className="text-primary font-bold block text-sm not-italic">{c.price}</em>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>

                    {form.categoria === 'gravel' && (
                      <FormField label="Subcategoría de edad" required>
                        <Select value={form.subcategoria} onValueChange={(v) => set('subcategoria', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona tu subcategoría" /></SelectTrigger>
                          <SelectContent>
                            {['Sub-23 (menores de 23 años)', 'Open (23–34 años)', 'Master 35+ (35–44 años)', 'Master 45+ (45–54 años)', 'Master 55+ (55 años o más)'].map((o) => (
                              <SelectItem key={o} value={o}>{o}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    )}

                    <FormField label="Talla de camiseta" required>
                      <Select value={form.talla} onValueChange={(v) => set('talla', v)}>
                        <SelectTrigger><SelectValue placeholder="Selecciona tu talla" /></SelectTrigger>
                        <SelectContent>
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FormField>
                  </>
                )}

                {/* Step 2 – Personal data */}
                {step === 1 && (
                  <>
                    <h3 className="font-title text-2xl text-white tracking-wide">Datos Personales</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Nombre(s)" required><Input placeholder="Tu nombre" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} /></FormField>
                      <FormField label="Apellido(s)" required><Input placeholder="Tus apellidos" value={form.apellido} onChange={(e) => set('apellido', e.target.value)} /></FormField>
                      <FormField label="N° Documento" required><Input placeholder="1012345678" value={form.documento} onChange={(e) => set('documento', e.target.value)} /></FormField>
                      <FormField label="Fecha de Nacimiento" required><Input type="date" value={form.nacimiento} onChange={(e) => set('nacimiento', e.target.value)} /></FormField>
                      <FormField label="Género" required>
                        <Select value={form.genero} onValueChange={(v) => set('genero', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            {['Masculino', 'Femenino', 'No binario', 'Prefiero no decirlo'].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Ciudad de origen" required><Input placeholder="Tu ciudad" value={form.ciudad} onChange={(e) => set('ciudad', e.target.value)} /></FormField>
                      <FormField label="Correo electrónico" required><Input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={(e) => set('email', e.target.value)} /></FormField>
                      <FormField label="Teléfono / WhatsApp" required><Input type="tel" placeholder="+57 300 000 0000" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} /></FormField>
                    </div>
                    <FormField label="Club / Equipo (opcional)"><Input placeholder="Nombre de tu equipo o club" value={form.club} onChange={(e) => set('club', e.target.value)} /></FormField>
                  </>
                )}

                {/* Step 3 – Health */}
                {step === 2 && (
                  <>
                    <h3 className="font-title text-2xl text-white tracking-wide">Información de Salud</h3>
                    <div className="bg-primary/8 border-l-4 border-primary rounded-r-xl p-4 text-muted-foreground text-sm">
                      Esta información es estrictamente confidencial y solo será usada en caso de emergencia médica.
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Tipo de sangre / RH" required>
                        <Select value={form.rh} onValueChange={(v) => set('rh', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'No sé'].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="EPS / Aseguradora" required><Input placeholder="Nombre de tu EPS" value={form.eps} onChange={(e) => set('eps', e.target.value)} /></FormField>
                    </div>
                    <FormField label="Alergias o condiciones médicas"><Textarea placeholder="Ej: alergia a la penicilina, asma..." value={form.alergias} onChange={(e) => set('alergias', e.target.value)} /></FormField>
                    <FormField label="Medicamentos actuales"><Textarea placeholder="Lista los medicamentos si es relevante" value={form.medicamentos} onChange={(e) => set('medicamentos', e.target.value)} /></FormField>
                    <FormField label="Contacto de emergencia – Nombre" required><Input placeholder="Nombre completo" value={form.emergenciaNombre} onChange={(e) => set('emergenciaNombre', e.target.value)} /></FormField>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Teléfono de emergencia" required><Input type="tel" placeholder="+57 300 000 0000" value={form.emergenciaTel} onChange={(e) => set('emergenciaTel', e.target.value)} /></FormField>
                      <FormField label="Parentesco" required>
                        <Select value={form.emergenciaRel} onValueChange={(v) => set('emergenciaRel', v)}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            {['Padre/Madre', 'Cónyuge/Pareja', 'Hijo/Hija', 'Hermano/Hermana', 'Amigo/Amiga', 'Otro'].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox id="apto" checked={form.aptoMedico} onCheckedChange={(v) => set('aptoMedico', v)} />
                      <label htmlFor="apto" className="text-muted-foreground text-sm leading-relaxed cursor-pointer">
                        Declaro que me encuentro en condiciones físicas aptas para participar y no tengo contraindicaciones médicas para actividad física de alta intensidad. <span className="text-primary">*</span>
                      </label>
                    </div>
                  </>
                )}

                {/* Step 4 – Payment */}
                {step === 3 && (
                  <>
                    <h3 className="font-title text-2xl text-white tracking-wide">Método de Pago</h3>

                    {cat && (
                      <div className="bg-white/4 border border-border rounded-xl p-4 flex justify-between items-center">
                        <div>
                          <strong className="text-white block">{cat.name}</strong>
                          <span className="text-muted-foreground text-xs">{form.nombre} {form.apellido} · {form.email}</span>
                        </div>
                        <strong className="text-primary text-xl">{cat.price}</strong>
                      </div>
                    )}

                    <RadioGroup value={form.pago} onValueChange={(v) => set('pago', v)} className="grid sm:grid-cols-3 gap-3">
                      {[
                        { v: 'nequi', label: 'Nequi / Daviplata', sub: 'Pago inmediato' },
                        { v: 'transferencia', label: 'Transferencia Bancaria', sub: 'Bancolombia · Davivienda' },
                        { v: 'efectivo', label: 'Efectivo', sub: 'Puntos autorizados' },
                      ].map((p) => (
                        <label key={p.v} htmlFor={`pm-${p.v}`}
                          className={cn('cursor-pointer border-2 rounded-xl p-4 text-center transition-all',
                            form.pago === p.v ? 'border-primary bg-primary/8' : 'border-border')}>
                          <RadioGroupItem value={p.v} id={`pm-${p.v}`} className="sr-only" />
                          <strong className="text-white text-sm block">{p.label}</strong>
                          <small className="text-muted-foreground text-xs">{p.sub}</small>
                        </label>
                      ))}
                    </RadioGroup>

                    {pi && (
                      <div className="bg-white/4 border border-border rounded-xl p-5 space-y-2">
                        <h5 className="text-white font-semibold text-sm">{pi.title}</h5>
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line"
                          dangerouslySetInnerHTML={{ __html: pi.body.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                        {pi.showUpload && (
                          <div className="pt-2">
                            <Label>Comprobante de pago <span className="text-primary">*</span></Label>
                            <Input type="file" accept="image/*,.pdf" className="mt-2 cursor-pointer" />
                            <p className="text-muted-foreground text-xs mt-1">JPG, PNG, PDF. Máx 5 MB.</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      {[
                        { key: 'terminos',    label: 'Acepto los', link: 'terms', linkLabel: 'Términos y Condiciones', suffix: 'y la', link2: 'privacy', link2Label: 'Política de Privacidad' },
                        { key: 'reglamento',  label: 'He leído y acepto el', link: 'reglamento', linkLabel: 'Reglamento de la Carrera' },
                      ].map((c) => (
                        <div key={c.key} className="flex items-start gap-3">
                          <Checkbox id={c.key} checked={form[c.key]} onCheckedChange={(v) => set(c.key, v)} />
                          <label htmlFor={c.key} className="text-muted-foreground text-sm leading-relaxed cursor-pointer">
                            {c.label}{' '}
                            <button type="button" onClick={() => setModal(c.link)} className="text-primary underline">{c.linkLabel}</button>
                            {c.suffix && <> {c.suffix} <button type="button" onClick={() => setModal(c.link2)} className="text-primary underline">{c.link2Label}</button></>}
                            {' '}de Caídos del Zarzo 2026. <span className="text-primary">*</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  {step > 0 ? (
                    <Button type="button" variant="outline" onClick={prev}>← Atrás</Button>
                  ) : <span />}
                  {step < 3 ? (
                    <Button type="button" onClick={next}>Continuar →</Button>
                  ) : (
                    <Button type="submit">Completar Inscripción 🏁</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!modal} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="max-w-lg">
          <ModalContent type={modal} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

function SuccessScreen({ cat }) {
  return (
    <section id="inscripcion" className="py-24 bg-accent">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-8xl mb-6 animate-bounce-up">🎉</div>
        <h3 className="font-title text-5xl text-white tracking-wide mb-4">¡Inscripción Recibida!</h3>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          Gracias por inscribirte a <strong className="text-white">Caídos del Zarzo 2026</strong>.
        </p>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          En los próximos <strong className="text-white">30 minutos</strong> recibirás un correo de confirmación
          con tu número de participante y link de seguimiento de pago.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg">Descargar Confirmación (PDF)</Button>
          <Button size="lg" variant="outline" onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}>
            Explorar la Ruta
          </Button>
        </div>
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">¡Comparte tu inscripción!</p>
          <div className="flex gap-3 justify-center">
            <a href={`https://wa.me/?text=¡Me inscribí en Caídos del Zarzo Gravel Race 2026! 🚵 %23CaidosDelZarzo2026`} target="_blank" rel="noreferrer"
              className="bg-[#25d366] text-white font-bold py-2.5 px-6 rounded-full text-sm hover:opacity-90 transition-opacity">WhatsApp</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-bold py-2.5 px-6 rounded-full text-sm hover:opacity-90 transition-opacity">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  )
}
