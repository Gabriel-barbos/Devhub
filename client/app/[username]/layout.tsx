import PrivateRoute from "@/components/auth/private-route"
import Sidebar from "@/components/shared/sidebar-component"

export default function LayoutProfile({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <section className={"flex box-border items-start"}>
        <div className={"w-1/4 sticky top-0"}>
          <Sidebar />
        </div>
        <div className={"flex-1 p-8"}>{children}</div>
        <div className={"w-1/4 p-8"}></div>
      </section>
    </PrivateRoute>

  )
}