import LoginForm from "@/components/login-page/login-form";
import { ForgetPasswordDialog } from "@/components/login-page/forget-password-dialog";
import { TestDrawer } from "@/components/login-page/test-drawer";
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-5">
      <LoginForm></LoginForm>
      <TestDrawer>
      </TestDrawer>
    </div>
  );
}
