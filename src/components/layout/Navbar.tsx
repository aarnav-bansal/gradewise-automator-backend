
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { BookOpen, FileText, Upload, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-brand-600" />
          <Link to="/" className="text-xl font-bold text-brand-600">
            GradeWise
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Button asChild variant="ghost">
            <Link to="/dashboard">
              <FileText className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Link>
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
