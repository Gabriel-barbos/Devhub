import { ThemeToogle } from "@/components/theme-toogle";
import { NavigationMenuDemo } from "@/components/navigation-menu";
export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <NavigationMenuDemo />
      <h1 className="font-black text-9xl dark:text-slate-50">devhub</h1>
    </main>
  );
}

