import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ShieldCheck, Clock, CreditCard, CheckCircle2, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: BookOpen, title: "Browse Exams", desc: "Discover upcoming exams with full details, eligibility, and syllabus." },
  { icon: ShieldCheck, title: "Secure Registration", desc: "End-to-end encrypted submissions and validated user data." },
  { icon: CreditCard, title: "Online Fee Payment", desc: "Pay your exam fees securely via integrated payment gateway." },
  { icon: Clock, title: "Real-Time Status", desc: "Track your application, hall ticket, and results in one place." },
];

const steps = [
  { n: "01", title: "Create Account", desc: "Sign up with your email and verify your identity." },
  { n: "02", title: "Choose Exam", desc: "Browse available exams and select the one you want to register for." },
  { n: "03", title: "Fill Details", desc: "Complete your registration form with personal and academic info." },
  { n: "04", title: "Pay & Submit", desc: "Pay the exam fee securely and download your confirmation." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" aria-hidden="true" />
        <div className="container relative py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Registrations open for May 2026
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Online Exam <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Registration</span> Made Simple
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                A secure, fast, and user-friendly platform for students to discover, register, and pay for examinations — all in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-[var(--shadow-elegant)]">
                  <Link to="/signup">Get Started <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/exams">Browse Exams</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Trusted by 10k+ students</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> 99.9% uptime</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl rounded-full" aria-hidden="true" />
              <Card className="relative shadow-[var(--shadow-elegant)] border-border/50 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Semester End Exams</h3>
                      <p className="text-xs text-muted-foreground">B.Tech CSE-DS · 2025-26</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Registration ends", "30 May 2026"],
                      ["Exam date", "15 June 2026"],
                      ["Fee", "₹ 1,200"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                        <span className="text-sm text-muted-foreground">{k}</span>
                        <span className="text-sm font-medium text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link to="/register">Register Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything you need to register</h2>
          <p className="text-muted-foreground mt-3">Built with modern web technologies for a seamless registration experience.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="border-border/60 hover:shadow-[var(--shadow-soft)] transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How it works</h2>
            <p className="text-muted-foreground mt-3">Four simple steps from sign-up to exam day.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 text-xs font-bold tracking-wider text-primary-foreground bg-primary px-2 py-1 rounded-md">
                  STEP {s.n}
                </span>
                <h3 className="font-semibold text-foreground mt-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-10 md:p-14 text-center shadow-[var(--shadow-elegant)]">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Ready to register for your exam?</h2>
          <p className="text-primary-foreground/90 mt-3 max-w-xl mx-auto">Join thousands of students using ExamReg for hassle-free exam registrations.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button asChild size="lg" variant="secondary">
              <Link to="/signup">Create free account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
