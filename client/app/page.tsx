import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      <div className="flex flex-col items-center max-w-[950px] mx-auto p-8 gap-5">

        <h1 className="font-black text-6xl md:text-9xl dark:text-slate-50">devhub</h1>

        <div className="flex flex-col items-center w-full gap-2">

          <div className="flex flex-col gap-2 justify-start w-full bg-zinc-900 rounded-lg p-4 h-[350px] transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-105">
            <h2 className="font-semibold text-4xl text-start md:text-5xl dark:text-slate-50">Conecte-se com outros desenvolvedores.</h2 >
            <p className="text-slate-200 italic md:text-2xl">Explore novos horizontes.</p>
            <Button asChild className="w-[250px]"><Link href="/register">Crie sua conta</Link></Button>


            <p className="font-semibold underline decoration-1">Já tem sua conta?</p>
            <Button asChild className="w-[250px]"><Link href="/login">Entrar</Link></Button>
          </div>
        </div>
        {/*
        <div className="flex flex-col w-full bg-zinc-900 rounded-lg p-4 transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-105">
        <h2 className="font-semibold text-3xl text-start dark:text-slate-50">Exiba seus principais feitos.</h2>
        <p className="text-slate-200 italic">Seja com projetos ou artigos. </p>
        </div>
        */} 

        <div className="flex flex-col w-full bg-zinc-900 rounded-lg p-4 transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-105">
        <h2 className="font-semibold text-3xl text-start dark:text-slate-50 md:text-5xl pb-2">Mostre no que você é especial.</h2>
        <p className="text-slate-200 italic md:text-2xl">Decore seu perfil com badges que mostram suas especialidades.</p>
          <div className="flex flex-wrap gap-2 w-full justify-center py-2">
          <Badge className="animate-pulse text-center">HTML</Badge>
          <Badge className="animate-pulse text-center">JavaScript</Badge>
          <Badge className="animate-pulse text-center">CSS</Badge>
          <Badge className="animate-pulse text-center">Python</Badge>
          <Badge className="animate-pulse text-center">React</Badge>
          <Badge className="animate-pulse text-center">SQL</Badge>
          <Badge className="animate-pulse text-center">Java</Badge>
          <Badge className="animate-pulse text-center">PHP</Badge>
          </div>
        </div>

        
        <div className="flex flex-col w-full bg-zinc-900 rounded-lg p-4 transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-105">
          <h1 className="font-semibold text-3xl dark:text-slate-50">Dúvidas frequentes</h1>
          <Accordion type="single" collapsible className="max-w-[400px]">
            <AccordionItem value="item-1">
              <AccordionTrigger>No que o Devhub me agrega?</AccordionTrigger>
              <AccordionContent>
                Nosso objetivo é suprir a necessidade de um ecossistema em formato de rede social para profissionais da área da tecnologia. Visando dar suporte tanto para áreas baseadas em projetos quanto para áreas baseadas em pesquisas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-start">O que são badges?</AccordionTrigger>
              <AccordionContent>
                As badges servem de uma forma visual para demonstrar para outras pessoas seus interesses e/ou especialidades
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>É de graça?</AccordionTrigger>
              <AccordionContent>
                Sim.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator className="mt-12 w-4/5" />
        <p className="text-muted dark:text-slate-50">&copy; Devhub 2024</p>

      </div>


    </main>
  );
}

