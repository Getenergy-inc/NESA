"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function SuperAdminLoginPage() {
  const { signIn, isLoading, error } = useAuthContext();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    try {
      const user = await signIn(form);

      if (user?.role === "super-admin") {
        router.push("/super-admin"); // ✅ redirect to dashboard
      } else {
        setFormError("Unauthorized access. Only Super Admins can login here.");
      }
    } catch (err: any) {
      setFormError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          Super Admin Login
        </h1>

        {/* Error */}
        {(formError || error) && (
          <p className="text-red-600 text-sm text-center mt-2">
            {formError || error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
