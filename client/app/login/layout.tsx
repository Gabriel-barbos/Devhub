import PublicRoute from "@/components/auth/public-route"


export default function LayoutLogin({ children }: { children: React.ReactNode }){
    return (
    <PublicRoute>
      <section>
      {children}
      </section>
    </PublicRoute>
    )
}