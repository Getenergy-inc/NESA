import LoginPage from "@/components/UI/Account/Login";
import ProtectedRoute from "@/components/Common/ProtectedRoute";

export default function Home() {
    return (
      <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
        <main>
          <LoginPage />
        </main>
      </ProtectedRoute>
    )
  }