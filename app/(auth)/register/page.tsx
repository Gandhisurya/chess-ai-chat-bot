"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.warning(data?.message || "Registration failed");
      }

      toast.success("Registration Successfully!");

      router.push("/login");
    } catch (err: any) {
      toast.warning(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
              <Input
                type="text"
                placeholder="User name"
                className="pl-10"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
              <Input
                type="password"
                placeholder="password"
                className="pl-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                data-testid="password-input"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Confirm password"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                data-testid="confirm-password-input"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
