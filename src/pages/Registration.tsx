import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { CreditCard, FileText, User, GraduationCap, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  rollNo: z.string().trim().nonempty({ message: "Roll number is required" }).max(20),
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  phone: z.string().trim().regex(/^[0-9]{10}$/, { message: "Enter a 10-digit phone number" }),
  dob: z.string().nonempty({ message: "Date of birth is required" }),
  gender: z.string().nonempty({ message: "Select a gender" }),
  branch: z.string().nonempty({ message: "Select a branch" }),
  year: z.string().nonempty({ message: "Select a year" }),
  exam: z.string().nonempty({ message: "Select an exam" }),
  address: z.string().trim().nonempty({ message: "Address is required" }).max(300),
  agree: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

type FormState = {
  fullName: string;
  rollNo: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  branch: string;
  year: string;
  exam: string;
  address: string;
  agree: boolean;
};

const initial: FormState = {
  fullName: "",
  rollNo: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  branch: "",
  year: "",
  exam: "",
  address: "",
  agree: false,
};

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fe[i.path[0] as string] = i.message;
      });
      setErrors(fe);
      toast({ title: "Please fix errors", description: "Some fields are invalid.", variant: "destructive" });
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast({ title: "Registration submitted", description: "Proceed to fee payment to complete." });
  };

  const handlePayment = () => {
    toast({ title: "Payment successful", description: "Your registration is confirmed." });
    setTimeout(() => navigate("/"), 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <Card className="max-w-2xl mx-auto shadow-[var(--shadow-elegant)]">
            <CardHeader className="text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">Registration Received</CardTitle>
              <CardDescription>Please complete the fee payment to confirm your slot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border p-4 bg-secondary/40 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium text-foreground">{form.fullName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Roll No</span><span className="font-medium text-foreground">{form.rollNo}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Exam</span><span className="font-medium text-foreground">{form.exam}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Fee</span><span className="font-medium text-foreground">₹ 1,200</span></div>
              </div>
              <Button onClick={handlePayment} className="w-full" size="lg">
                <CreditCard className="h-4 w-4" /> Pay ₹1,200 securely
              </Button>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full">
                Edit details
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Exam Registration Form</h1>
            <p className="text-muted-foreground mt-2">Fill in your details accurately. All fields are required.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Personal Details */}
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><User className="h-5 w-5 text-primary" /> Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="As per ID proof" />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="10-digit number" maxLength={10} />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
                  {errors.dob && <p className="text-xs text-destructive">{errors.dob}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Academic Details */}
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><GraduationCap className="h-5 w-5 text-primary" /> Academic Details</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input id="rollNo" value={form.rollNo} onChange={(e) => set("rollNo", e.target.value.toUpperCase())} placeholder="e.g. 24071A6792" />
                  {errors.rollNo && <p className="text-xs text-destructive">{errors.rollNo}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select value={form.branch} onValueChange={(v) => set("branch", v)}>
                    <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse-ds">CSE - Data Science</SelectItem>
                      <SelectItem value="cse-cys">CSE - Cyber Security</SelectItem>
                      <SelectItem value="ai-ds">AI & DS</SelectItem>
                      <SelectItem value="cse">CSE</SelectItem>
                      <SelectItem value="ece">ECE</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.branch && <p className="text-xs text-destructive">{errors.branch}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Select value={form.year} onValueChange={(v) => set("year", v)}>
                    <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Exam</Label>
                  <Select value={form.exam} onValueChange={(v) => set("exam", v)}>
                    <SelectTrigger><SelectValue placeholder="Select an exam" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Statistical Analysis using Python">Statistical Analysis using Python</SelectItem>
                      <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="Cyber Security Fundamentals">Cyber Security Fundamentals</SelectItem>
                      <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.exam && <p className="text-xs text-destructive">{errors.exam}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Address & Consent */}
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><FileText className="h-5 w-5 text-primary" /> Address & Consent</CardTitle>
                <CardDescription>Communication address for hall ticket dispatch.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    rows={3}
                    maxLength={300}
                    placeholder="House, street, city, state, pincode"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>
                <div className="flex items-start gap-3 rounded-md border border-border bg-secondary/40 p-3">
                  <Checkbox id="agree" checked={form.agree} onCheckedChange={(v) => set("agree", v === true)} />
                  <Label htmlFor="agree" className="text-sm text-muted-foreground leading-snug">
                    I confirm that the details provided are correct and agree to the{" "}
                    <a href="#" className="text-primary hover:underline">terms and conditions</a>.
                  </Label>
                </div>
                {errors.agree && <p className="text-xs text-destructive">{errors.agree}</p>}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setForm(initial)}>Reset</Button>
              <Button type="submit" size="lg">Submit Registration</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;