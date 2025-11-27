import LoginForm from "@/components/UI/Account/Login/LoginForm";
import ProtectedRoute from "@/components/Common/ProtectedRoute";

export default function LoginPage() {
    return (
      <ProtectedRoute requireAuth={false} redirectTo="/member">
        <LoginForm />
      </ProtectedRoute>
    )
  }