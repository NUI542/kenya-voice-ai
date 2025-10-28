import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, LogOut } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ isAuthenticated = false, isAdmin = false, onLogout }: NavbarProps) => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">Civic Voice</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to={isAdmin ? "/admin" : "/dashboard"}>
                <Button variant={location.pathname.includes(isAdmin ? "admin" : "dashboard") ? "default" : "ghost"}>
                  {isAdmin ? "Admin Dashboard" : "Dashboard"}
                </Button>
              </Link>
              {!isAdmin && (
                <Link to="/forums">
                  <Button variant={location.pathname.includes("forums") ? "default" : "ghost"}>
                    <Users className="mr-2 h-4 w-4" />
                    Forums
                  </Button>
                </Link>
              )}
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
