import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SectionHeader } from './About'
import { EVENT } from '@/lib/constants'

const A = '#c47818'

const CONTACT_INFO = [
  { icon: '📧', label: 'Correo',            value: EVENT.email,   href: `mailto:${EVENT.email}` },
  { icon: '📱', label: 'WhatsApp',          value: EVENT.whatsapp, href: EVENT.whatsappHref },
  { icon: '📍', label: 'Sede',              value: EVENT.address  },
  { icon: '⏰', label: 'Horario Atención',  value: EVENT.horario  },
]

const SOCIAL = ['Instagram', 'Facebook', 'Strava', 'YouTube']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }) }, 4000)
  }

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Contáctanos" title="¿Aún tienes preguntas?" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <div>
            <div className="space-y-6 mb-10">
              {CONTACT_INFO.map(ci => (
                <div key={ci.label} className="flex gap-4 items-start border-b border-border pb-5 last:border-0 last:pb-0">
                  <span className="text-xl flex-shrink-0">{ci.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.3em] text-muted-foreground mb-0.5">{ci.label}</p>
                    {ci.href ? (
                      <a href={ci.href} className="text-sm font-medium hover:underline" style={{ color: A }}>
                        {ci.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground leading-relaxed">{ci.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.3em] text-muted-foreground mb-4">Redes Sociales</p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map(s => (
                  <a
                    key={s} href="#"
                    className="px-4 py-2 border border-border text-muted-foreground text-xs font-bold uppercase tracking-wide hover:border-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border border-border bg-card p-8">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wide">Nombre</Label>
                  <Input placeholder="Tu nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wide">Correo</Label>
                  <Input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wide">Asunto</Label>
                <Select value={form.asunto} onValueChange={v => set('asunto', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecciona el asunto" /></SelectTrigger>
                  <SelectContent>
                    {['Consulta sobre inscripción', 'Información de la ruta', 'Patrocinios', 'Prensa / Medios', 'Otro'].map(o => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wide">Mensaje</Label>
                <Textarea rows={4} placeholder="Escribe tu consulta..." value={form.mensaje} onChange={e => set('mensaje', e.target.value)} />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-bold text-sm text-white uppercase tracking-widest transition-colors"
                style={{ background: sent ? '#4a7aaa' : A }}
                onMouseEnter={e => { if (!sent) e.currentTarget.style.background = '#8f5510' }}
                onMouseLeave={e => { if (!sent) e.currentTarget.style.background = A }}
              >
                {sent ? '✓ Mensaje enviado' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
