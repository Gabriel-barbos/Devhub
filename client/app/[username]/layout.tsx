import PrivateRoute from "@/components/auth/private-route"
import Sidebar from "@/components/shared/sidebar-component"

export default function LayoutProfile({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <section className={"flex flex-col sm:flex-row box-border sm:items-start"}>
        <div className={"sm:w-1/4 w-100 sticky top-0"}>
          <Sidebar  />
        </div>
        <div className={"flex-1 p-8"}>{children}</div>
        <div className={"w-1/4 p-8"}></div>
      </section>
    </PrivateRoute>

  )
}