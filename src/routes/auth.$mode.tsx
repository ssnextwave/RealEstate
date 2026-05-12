import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import heroImg from "@/assets/interior-1.jpg";
import { SITE } from "@/lib/site";

type Mode = "login" | "register" | "forgot";

const loginSchema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  password: z.string().min(6, "Min 6 characters").max(128),
});
const registerSchema = loginSchema.extend({ name: z.string().trim().min(2).max(80) });
const forgotSchema = z.object({ email: z.string().trim().email("Valid email required").max(255) });

export const Route = createFileRoute("/auth/$mode")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.mode === "register" ? "Create account" : params.mode === "forgot" ? "Reset password" : "Sign in"} — ${SITE.name}` },
      { name: "description", content: "Access your saved homes, recently viewed and private listings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useParams();
  const m: Mode = (mode === "register" || mode === "forgot") ? mode : "login";
  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="hidden lg:block">
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex items-center justify-center px-4 py-16 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl lg:text-4xl">
            {m === "login" ? "Welcome back." : m === "register" ? "Create your account." : "Reset your password."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {m === "login" ? "Sign in to access saved homes and private listings." : m === "register" ? "It takes less than a minute." : "We'll email you a reset link."}
          </p>
          {m === "login" && <LoginForm />}
          {m === "register" && <RegisterForm />}
          {m === "forgot" && <ForgotForm />}
          <div className="mt-6 flex justify-between text-sm">
            {m !== "login" && <Link to="/auth/$mode" params={{ mode: "login" }} className="text-muted-foreground hover:text-foreground">Sign in</Link>}
            {m === "login" && <Link to="/auth/$mode" params={{ mode: "register" }} className="text-muted-foreground hover:text-foreground">Create account</Link>}
            {m === "login" && <Link to="/auth/$mode" params={{ mode: "forgot" }} className="text-muted-foreground hover:text-foreground">Forgot password?</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [d, setD] = useState({ email: "", password: "" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); const r = loginSchema.safeParse(d); if (!r.success) return toast.error(r.error.issues[0].message); toast.success("Signed in."); }} className="mt-8 space-y-4">
      <div><Label>Email</Label><Input type="email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} /></div>
      <div><Label>Password</Label><Input type="password" value={d.password} onChange={(e) => setD({ ...d, password: e.target.value })} /></div>
      <Button type="submit" className="w-full rounded-full" size="lg">Sign in</Button>
    </form>
  );
}
function RegisterForm() {
  const [d, setD] = useState({ name: "", email: "", password: "" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); const r = registerSchema.safeParse(d); if (!r.success) return toast.error(r.error.issues[0].message); toast.success("Account created."); }} className="mt-8 space-y-4">
      <div><Label>Full name</Label><Input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></div>
      <div><Label>Email</Label><Input type="email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} /></div>
      <div><Label>Password</Label><Input type="password" value={d.password} onChange={(e) => setD({ ...d, password: e.target.value })} /></div>
      <Button type="submit" className="w-full rounded-full" size="lg">Create account</Button>
    </form>
  );
}
function ForgotForm() {
  const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); const r = forgotSchema.safeParse({ email }); if (!r.success) return toast.error(r.error.issues[0].message); toast.success("Reset link sent."); }} className="mt-8 space-y-4">
      <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <Button type="submit" className="w-full rounded-full" size="lg">Send reset link</Button>
    </form>
  );
}
