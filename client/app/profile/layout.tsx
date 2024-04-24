
export default function LayoutProfile({ children }: { children: React.ReactNode }){
    return (
    <section className={"flex p-8 box-border"}>
      <div className={"w-1/4 sticky top-0"}>
        <div>
          <h1 className="font-black text-6xl md:text-4xl dark:text-slate-50">devhub</h1>
        </div>
      </div>
      <div className={"flex-1"}>{children}</div>
      <div className={"w-1/4"}></div>
    </section>
    )
}