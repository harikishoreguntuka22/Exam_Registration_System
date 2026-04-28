import { Link } from "react-router-dom";
import { Calendar, Clock, IndianRupee, Search } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EXAMS = [
  { id: "se-101", title: "Software Engineering", code: "22PC2DS211", date: "15 Jun 2026", duration: "3 hours", fee: 1200, dept: "CSE-Data Science", status: "Open" },
  { id: "ds-201", title: "Statistical Analysis using Python", code: "22PC2DS210", date: "18 Jun 2026", duration: "3 hours", fee: 1200, dept: "CSE-Data Science", status: "Open" },
  { id: "ai-301", title: "Artificial Intelligence", code: "22PC3AI301", date: "22 Jun 2026", duration: "3 hours", fee: 1500, dept: "AI & DS", status: "Open" },
  { id: "cy-401", title: "Cyber Security Fundamentals", code: "22PC2CYS401", date: "25 Jun 2026", duration: "3 hours", fee: 1500, dept: "Cyber Security", status: "Closing soon" },
  { id: "dm-501", title: "Discrete Mathematics", code: "22BS1MA501", date: "28 Jun 2026", duration: "3 hours", fee: 1000, dept: "All branches", status: "Open" },
  { id: "os-601", title: "Operating Systems", code: "22PC2CS601", date: "02 Jul 2026", duration: "3 hours", fee: 1200, dept: "CSE", status: "Open" },
];

const Exams = () => {
  const [q, setQ] = useState("");
  const filtered = EXAMS.filter((e) =>
    [e.title, e.code, e.dept].some((s) => s.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
          <div className="container py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Available Exams</h1>
            <p className="text-muted-foreground mt-2">Browse and register for upcoming examinations.</p>
            <div className="relative max-w-md mt-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by exam name, code or department"
                className="pl-9"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="container py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exam) => (
              <Card key={exam.id} className="border-border/60 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{exam.code}</p>
                      <h3 className="text-lg font-semibold text-foreground mt-0.5">{exam.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{exam.dept}</p>
                    </div>
                    <Badge variant={exam.status === "Open" ? "default" : "secondary"} className={exam.status === "Open" ? "bg-success text-success-foreground hover:bg-success/90" : ""}>
                      {exam.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex flex-col items-start gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground text-xs">{exam.date}</span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground text-xs">{exam.duration}</span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Fee</span>
                      <span className="font-medium text-foreground text-xs">₹{exam.fee}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to="#">Details</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to="/register">Apply</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No exams match your search.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Exams;