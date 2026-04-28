import { Link, NavLink, useLocation } from "react-router-dom";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const isAuthed = location.pathname === "/exams" || location.pathname === "/register";

  const linkBase =
    "px-3 py-2 text-sm font-medium rounded-md transition-colors";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-elegant)]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-foreground">ExamReg</span>
            <span className="text-[10px] text-muted-foreground">Online Exam Registration</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => cn(linkBase, isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground")}>Home</NavLink>
          <NavLink to="/exams" className={({ isActive }) => cn(linkBase, isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground")}>Exams</NavLink>
          <NavLink to="/register" className={({ isActive }) => cn(linkBase, isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground")}>Register</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthed ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login"><LogIn className="h-4 w-4" /> Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup"><UserPlus className="h-4 w-4" /> Sign up</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Logout</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;