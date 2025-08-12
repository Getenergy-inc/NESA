import React, { useState } from "react";
import { Shield, Loader2 } from "lucide-react";
import { useAuthContext } from "@/lib/context/AuthContext";
import { changePassword } from "@/lib/services/authService";
import { useModal } from "@/lib/store/modal";

const SecurityTab = () => {
  const { user } = useAuthContext();
  const { showModal } = useModal();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const validateFields = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "New password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(newPassword)) {
      newErrors.newPassword = "New password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "New password must contain at least one number.";
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handlePasswordChange = async () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await changePassword({
        email: user.email,
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      showModal(
        <p>{response.message || "Password changed successfully!"}</p>,
        "success"
      );

      // Clear form on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      showModal(<p>{errorMessage}</p>, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        
        <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
        <p className="text-gray-600">Manage your password and account security</p>
      </div>

      <div className="p-6 space-y-6">
        {/* <div className="p-5 bg-deepGold/10 rounded-lg border border-deepGold/20">
          <div className="flex items-start">
            <div className="bg-deepGold/20 p-2 rounded-full mr-4 text-deepGold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="ml-auto bg-deepGold text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-deepGold/90 transition">
              Enable
            </button>
          </div>
        </div> */}

        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          <div className="p-5">
            <h3 className="font-medium text-gray-900 mb-3">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full p-3 border ${
                    errors.currentPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition`}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full p-3 border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className={`w-full p-3 border ${
                    errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-deepGold focus:border-deepGold transition`}
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePasswordChange}
                disabled={isLoading}
                className={`px-6 py-2.5 rounded-lg font-medium bg-deepGold text-black hover:bg-deepGold/90 transition flex items-center justify-center gap-2 min-w-[150px] ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;