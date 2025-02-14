"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { useUser } from "@/hooks/user.hook";
import { toast } from "sonner";

const LoginPage = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.warning(data?.message || "Login failed");
      }

      const userData = {
        refId: data?.data?._id,
        userId: data?.data?.userId,
        userName: data?.data?.userName,
        email: data?.data?.email,
        accessToken: data?.data?.accessToken,
      };

      setUser(userData);

      toast.success("Login Successfully!");

      router.push("/chat");
    } catch (err: any) {
      toast.success(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome To Chess AI Bot</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Password"
                className="pl-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
