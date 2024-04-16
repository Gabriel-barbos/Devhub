import LoginForm from "@/components/login-form";
import { ThemeToogle } from "@/components/theme-toogle";

export default function Page() {
  return (
    <main className="flex items-center p-24">
      <ThemeToogle></ThemeToogle>
      <LoginForm></LoginForm>
    </main>
  );
}
