import { User } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import EditButton from "./editbtn";

const Sidebar = () => {


    return (
        <div className={"p-8 h-screen relative flex flex-col"}>
          <h1 className="font-black text-6xl md:text-2xl dark:text-slate-50">devhub</h1>
          <div className="flex flex-col mt-10 gap-2">
            <a href="" className="flex items-center gap-2">
                <User />
                Meu perfil
            </a>
          </div>
          <div className="mt-auto block">
            <div className="flex items-center space-x-2">
                <ThemeToggle />
              <EditButton></EditButton>
         
            </div>
          </div>
        </div>
    )
}

export default Sidebar;