import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="">Devhub</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Testando o Shad</AccordionTrigger>
          <AccordionContent>
           Pelo visto ta funcionando
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}

