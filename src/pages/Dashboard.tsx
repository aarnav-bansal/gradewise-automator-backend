import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Plus, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface AssignmentCardProps {
  title: string;
  date: string;
  status: "complete" | "processing" | "pending";
  students: number;
}

const AssignmentCard = ({ title, date, status, students }: AssignmentCardProps) => {
  const statusIcons = {
    complete: <CheckCircle className="h-5 w-5 text-green-500" />,
    processing: <Clock className="h-5 w-5 text-amber-500" />,
    pending: <AlertTriangle className="h-5 w-5 text-gray-400" />,
  };

  const statusText = {
    complete: "Graded",
    processing: "Processing",
    pending: "Not Started",
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {statusIcons[status]}
            <span className="text-sm font-medium">{statusText[status]}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {students} student{students !== 1 ? "s" : ""}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/assignments/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  const recentAssignments = [
    { title: "Algebra Quiz 3", date: "Nov 15, 2023", status: "complete" as const, students: 28 },
    { title: "Calculus Midterm", date: "Nov 10, 2023", status: "complete" as const, students: 24 },
    { title: "Geometry Test", date: "Nov 5, 2023", status: "complete" as const, students: 26 },
  ];

  const inProgressAssignments = [
    { title: "Algebra Final", date: "Dec 1, 2023", status: "processing" as const, students: 28 },
  ];

  return (
    <>
      <Navbar />
      <PageContainer 
        title="Dashboard" 
        description="Manage and track your graded assignments"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="stats flex flex-wrap gap-4 mb-4 md:mb-0">
            <Card className="p-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">
                  <span className="text-2xl font-bold mr-2">4</span>
                  Total Assignments
                </p>
              </div>
            </Card>
            <Card className="p-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">
                  <span className="text-2xl font-bold mr-2">78</span>
                  Students Graded
                </p>
              </div>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button asChild className="w-full md:w-auto bg-brand-600 hover:bg-brand-700">
              <Link to="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Assignment
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="all">All Assignments</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentAssignments.map((assignment, index) => (
                <AssignmentCard key={index} {...assignment} />
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <Button asChild variant="ghost" className="h-20 w-20 rounded-full">
                  <Link to="/upload">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                    <span className="sr-only">New assignment</span>
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">Start new assignment</p>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="in-progress">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inProgressAssignments.map((assignment, index) => (
                <AssignmentCard key={index} {...assignment} />
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <Button asChild variant="ghost" className="h-20 w-20 rounded-full">
                  <Link to="/upload">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                    <span className="sr-only">New assignment</span>
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">Start new assignment</p>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...recentAssignments, ...inProgressAssignments].map((assignment, index) => (
                <AssignmentCard key={index} {...assignment} />
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <Button asChild variant="ghost" className="h-20 w-20 rounded-full">
                  <Link to="/upload">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                    <span className="sr-only">New assignment</span>
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">Start new assignment</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </>
  );
};

export default Dashboard;
