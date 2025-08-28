"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false, // important: handle redirect manually
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.ok) {
      // successful login → redirect
      router.push("/products");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <h1 className="text-4xl card-title justify-center">Login</h1>
        <div className="card-body">
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
              required
            />
            <button
              className={`btn btn-neutral w-full ${loading ? "loading" : ""}`}
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="divider">or</div>

          <button
            className="btn btn-primary w-full"
            onClick={() => signIn("google", { callbackUrl: "/products" })}
          >
            Continue with Google
          </button>

          <p className="text-center text-sm opacity-70 mt-2">
            New here?{" "}
            <Link href="/" className="link">
              Go back home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
