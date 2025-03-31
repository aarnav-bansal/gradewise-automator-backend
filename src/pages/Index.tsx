
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Upload, ChevronRight, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-brand-600" />
            <span className="text-xl font-bold text-brand-600">GradeWise</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-sky-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Grade math tests automatically with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Upload scanned student answer sheets and let our AI do the grading. Save time and ensure fair assessment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                    <Link to="/upload">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/demo">View Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="GradeWise App"
                  className="rounded-lg object-cover border shadow-lg"
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop"
                  width={550}
                  height={410}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl">
                  A simple three-step process to grade math tests automatically
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">1. Upload Tests</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Upload a PDF with multiple student answer sheets and an optional answer key
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
                    <path d="M22 12h-4" />
                    <path d="M6 12H2" />
                    <path d="M12 6V2" />
                    <path d="M12 22v-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">2. AI Processing</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Our AI extracts and analyzes each student's work against your grading criteria
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">3. Review Results</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Review AI-generated scores, adjust if needed, and export final grades
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Educators
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Save hours of grading time with our AI-powered solution
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4">
                <Button asChild size="lg" className="w-full bg-brand-600 hover:bg-brand-700">
                  <Link to="/register">Sign Up Free</Link>
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No credit card required. Start with 25 free scans.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
            © 2023 GradeWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
