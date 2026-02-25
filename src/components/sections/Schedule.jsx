import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { SectionHeader } from './About'
import { SCHEDULE } from '@/lib/constants'

function TimelineItem({ item }) {
  return (
    <div className={cn(
      'flex gap-7 py-6 border-b border-border last:border-0',
      item.highlight && 'bg-primary/6 rounded-xl px-4 border border-primary/20 my-1'
    )}>
      <span className="font-title text-lg text-primary min-w-[90px] pt-0.5 tracking-wide">{item.time}</span>
      <div>
        <h4 className="text-white font-semibold mb-1.5">{item.title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}

export default function Schedule() {
  return (
    <section id="cronograma" className="py-24 bg-[#070d07]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="Agenda"
          title="Cronograma del Evento"
          desc="Organiza tu fin de semana con todos los detalles del día de la carrera."
        />

        <Tabs defaultValue="sabado">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="sabado"  className="flex-1">Sábado 13 Jun – Pre-Carrera</TabsTrigger>
            <TabsTrigger value="domingo" className="flex-1">Domingo 14 Jun – Día de Carrera</TabsTrigger>
          </TabsList>

          <TabsContent value="sabado">
            <div className="bg-card border border-border rounded-2xl px-6">
              {SCHEDULE.sabado.map((item) => <TimelineItem key={item.time} item={item} />)}
            </div>
          </TabsContent>

          <TabsContent value="domingo">
            <div className="bg-card border border-border rounded-2xl px-6">
              {SCHEDULE.domingo.map((item) => <TimelineItem key={item.time} item={item} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
