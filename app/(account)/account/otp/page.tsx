import OTPPage from "@/components/UI/Account/Login/OTPPage";
import ProtectedRoute from "@/components/Common/ProtectedRoute";

export default function Home() {
    return (
      <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
        <main>
          <OTPPage />
        </main>
      </ProtectedRoute>
    )
  }