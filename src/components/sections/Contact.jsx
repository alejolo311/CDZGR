import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from './About'
import { EVENT } from '@/lib/constants'

const CONTACT_INFO = [
  { icon: '📧', label: 'Correo General', value: EVENT.email, href: `mailto:${EVENT.email}` },
  { icon: '📱', label: 'WhatsApp', value: EVENT.whatsapp, href: EVENT.whatsappHref },
  { icon: '📍', label: 'Sede Organizadora', value: EVENT.address },
  { icon: '⏰', label: 'Horario de Atención', value: EVENT.horario },
]

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'Strava',    href: '#' },
  { label: 'YouTube',   href: '#' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }) }, 4000)
  }

  return (
    <section id="contacto" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Contáctanos" title="¿Aún tienes preguntas?" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div className="space-y-6">
            {CONTACT_INFO.map((ci) => (
              <div key={ci.label} className="flex gap-4 items-start">
                <span className="text-2xl">{ci.icon}</span>
                <div>
                  <strong className="text-white text-sm block mb-0.5">{ci.label}</strong>
                  {ci.href ? (
                    <a href={ci.href} className="text-primary text-sm hover:underline">{ci.value}</a>
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">{ci.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href}
                  className="px-5 py-2 border border-border rounded-full text-muted-foreground text-sm font-semibold hover:border-primary hover:text-primary transition-all">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input placeholder="Tu nombre" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Correo</Label>
                  <Input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Asunto</Label>
                  <Select value={form.asunto} onValueChange={(v) => set('asunto', v)}>
                    <SelectTrigger><SelectValue placeholder="Selecciona el asunto" /></SelectTrigger>
                    <SelectContent>
                      {['Consulta sobre inscripción', 'Información de la ruta', 'Patrocinios', 'Prensa / Medios', 'Otro'].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Mensaje</Label>
                  <Textarea rows={4} placeholder="Escribe tu consulta..." value={form.mensaje} onChange={(e) => set('mensaje', e.target.value)} />
                </div>
                <Button type="submit" className="w-full" style={sent ? { background: '#22c55e' } : {}}>
                  {sent ? '✓ Mensaje enviado' : 'Enviar Mensaje'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
