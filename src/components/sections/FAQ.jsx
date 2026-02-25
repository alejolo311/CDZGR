import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { SectionHeader } from './About'
import { FAQ_ITEMS } from '@/lib/constants'

export default function FAQ() {
  const half = Math.ceil(FAQ_ITEMS.length / 2)
  const left  = FAQ_ITEMS.slice(0, half)
  const right = FAQ_ITEMS.slice(half)

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Preguntas Frecuentes" title="Tienes Dudas, Las Resolvemos" desc="Todo lo que necesitas saber antes de inscribirte." />

        <div className="grid lg:grid-cols-2 gap-x-12">
          {[left, right].map((col, ci) => (
            <Accordion key={ci} type="single" collapsible className="w-full">
              {col.map((item, i) => (
                <AccordionItem key={i} value={`item-${ci}-${i}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}
