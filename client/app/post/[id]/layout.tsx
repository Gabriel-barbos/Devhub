import PrivateRoute from "@/components/auth/private-route"

export default function Page({ children }: { children: React.ReactNode }){
    return (
    <PrivateRoute>
      <section>
      {children}
      </section>
    </PrivateRoute>
    )
}