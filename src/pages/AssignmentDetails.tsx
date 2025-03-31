
import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { ChevronLeft, Download, FileDown, Edit, Save, AlertTriangle, CheckCircle, HelpCircle, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  status: "graded" | "needs-review" | "pending";
  answers: Array<{
    questionNumber: number;
    score: number;
    maxScore: number;
    aiConfidence: "high" | "medium" | "low";
    feedback: string;
  }>;
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Smith",
    score: 42,
    maxScore: 50,
    status: "graded",
    answers: [
      { questionNumber: 1, score: 10, maxScore: 10, aiConfidence: "high", feedback: "Correct solution with proper work shown." },
      { questionNumber: 2, score: 7, maxScore: 10, aiConfidence: "high", feedback: "Partial credit - algebraic error in final step." },
      { questionNumber: 3, score: 5, maxScore: 10, aiConfidence: "medium", feedback: "Incorrect approach, but some work shown." },
      { questionNumber: 4, score: 10, maxScore: 10, aiConfidence: "high", feedback: "Perfect solution with clear steps." },
      { questionNumber: 5, score: 10, maxScore: 10, aiConfidence: "high", feedback: "All steps correctly shown." },
    ]
  },
  {
    id: 2,
    name: "Jane Doe",
    score: 36,
    maxScore: 50,
    status: "needs-review",
    answers: [
      { questionNumber: 1, score: 8, maxScore: 10, aiConfidence: "medium", feedback: "Correct answer but missing some steps." },
      { questionNumber: 2, score: 5, maxScore: 10, aiConfidence: "low", feedback: "Partially correct approach with calculation errors." },
      { questionNumber: 3, score: 8, maxScore: 10, aiConfidence: "medium", feedback: "Minor error in derivative calculation." },
      { questionNumber: 4, score: 7, maxScore: 10, aiConfidence: "medium", feedback: "Solution mostly correct but error in final answer." },
      { questionNumber: 5, score: 8, maxScore: 10, aiConfidence: "high", feedback: "One small error in substitution." },
    ]
  },
  {
    id: 3,
    name: "Emily Johnson",
    score: 48,
    maxScore: 50,
    status: "graded",
    answers: [
      { questionNumber: 1, score: 10, maxScore: 10, aiConfidence: "high", feedback: "Perfect solution." },
      { questionNumber: 2, score: 9, maxScore: 10, aiConfidence: "high", feedback: "Excellent work with minor notation issue." },
      { questionNumber: 3, score: 9, maxScore: 10, aiConfidence: "high", feedback: "Very well done with tiny arithmetic error." },
      { questionNumber: 4, score: 10, maxScore: 10, aiConfidence: "high", feedback: "Perfectly executed." },
      { questionNumber: 5, score: 10, maxScore: 10, aiConfidence: "high", feedback: "Exceptional work shown." },
    ]
  },
  {
    id: 4,
    name: "Michael Brown",
    score: 31,
    maxScore: 50,
    status: "needs-review",
    answers: [
      { questionNumber: 1, score: 5, maxScore: 10, aiConfidence: "medium", feedback: "Partially correct approach." },
      { questionNumber: 2, score: 7, maxScore: 10, aiConfidence: "medium", feedback: "Good work with some calculation errors." },
      { questionNumber: 3, score: 3, maxScore: 10, aiConfidence: "low", feedback: "Incorrect approach but showed some understanding." },
      { questionNumber: 4, score: 8, maxScore: 10, aiConfidence: "high", feedback: "Minor error in final step." },
      { questionNumber: 5, score: 8, maxScore: 10, aiConfidence: "medium", feedback: "Good approach with calculation error." },
    ]
  },
  {
    id: 5,
    name: "Sarah Wilson",
    score: 44,
    maxScore: 50,
    status: "graded",
    answers: [
      { questionNumber: 1, score: 9, maxScore: 10, aiConfidence: "high", feedback: "Great solution with minor issue." },
      { questionNumber: 2, score: 10, maxScore: 10, aiConfidence: "high", feedback: "Perfect approach and execution." },
      { questionNumber: 3, score: 9, maxScore: 10, aiConfidence: "high", feedback: "Excellent work with tiny notation issue." },
      { questionNumber: 4, score: 8, maxScore: 10, aiConfidence: "high", feedback: "Good solution with minor calculation error." },
      { questionNumber: 5, score: 8, maxScore: 10, aiConfidence: "high", feedback: "Solid work with small error." },
    ]
  },
];

const StatusIcon = ({ status }: { status: Student["status"] }) => {
  switch (status) {
    case "graded":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "needs-review":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "pending":
      return <HelpCircle className="h-4 w-4 text-gray-400" />;
  }
};

const ConfidenceIndicator = ({ confidence }: { confidence: "high" | "medium" | "low" }) => {
  const colors = {
    high: "bg-green-500",
    medium: "bg-amber-500",
    low: "bg-red-500",
  };
  
  return (
    <div className="flex items-center space-x-1">
      <div className={`h-2 w-2 rounded-full ${colors[confidence]}`} />
      <span className="text-xs text-muted-foreground capitalize">{confidence}</span>
    </div>
  );
};

const AssignmentDetails = () => {
  const { assignmentId } = useParams();
  const [displayName, setDisplayName] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState<Student["answers"]>([]);

  useEffect(() => {
    // Convert assignmentId (kebab case) to display name
    if (assignmentId) {
      const name = assignmentId
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setDisplayName(name);
    }

    // Load mock students
    setStudents(mockStudents);
  }, [assignmentId]);

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setCurrentAnswers([...student.answers]);
    setEditMode(false);
  };

  const handleScoreChange = (questionIndex: number, newScore: string) => {
    const score = parseInt(newScore);
    if (isNaN(score) || score < 0) return;
    
    const maxScore = currentAnswers[questionIndex].maxScore;
    if (score > maxScore) return;
    
    const updatedAnswers = [...currentAnswers];
    updatedAnswers[questionIndex] = {
      ...updatedAnswers[questionIndex],
      score
    };
    setCurrentAnswers(updatedAnswers);
  };

  const handleFeedbackChange = (questionIndex: number, newFeedback: string) => {
    const updatedAnswers = [...currentAnswers];
    updatedAnswers[questionIndex] = {
      ...updatedAnswers[questionIndex],
      feedback: newFeedback
    };
    setCurrentAnswers(updatedAnswers);
  };

  const calculateTotalScore = (answers: Student["answers"]) => {
    return answers.reduce((sum, answer) => sum + answer.score, 0);
  };

  const calculateMaxScore = (answers: Student["answers"]) => {
    return answers.reduce((sum, answer) => sum + answer.maxScore, 0);
  };

  const saveChanges = () => {
    if (!selectedStudent) return;
    
    const totalScore = calculateTotalScore(currentAnswers);
    const maxScore = calculateMaxScore(currentAnswers);

    const updatedStudent = {
      ...selectedStudent,
      score: totalScore,
      maxScore,
      answers: currentAnswers,
      status: "graded" as const
    };

    const updatedStudents = students.map(student => 
      student.id === selectedStudent.id ? updatedStudent : student
    );

    setStudents(updatedStudents);
    setSelectedStudent(updatedStudent);
    setEditMode(false);
  };

  const exportGrades = () => {
    // Mock export functionality
    alert("Grades exported successfully!");
  };

  return (
    <>
      <Navbar />
      <PageContainer
        title={displayName}
        description="Review and finalize student grades"
      >
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-wrap gap-2">
            <Button onClick={exportGrades} variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export Grades
            </Button>
            <Button onClick={exportGrades} className="bg-brand-600 hover:bg-brand-700" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left side - Student list */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Students</CardTitle>
              <CardDescription>
                {students.length} students • {students.filter(s => s.status === "graded").length} graded
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {students.map((student) => (
                  <button
                    key={student.id}
                    className={`w-full text-left p-4 border-b flex items-center justify-between hover:bg-muted/50 transition-colors ${
                      selectedStudent?.id === student.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="flex items-center space-x-3">
                      <StatusIcon status={student.status} />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Score: {student.score}/{student.maxScore}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Progress value={(student.score / student.maxScore) * 100} className="h-2 w-16" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right side - Student details */}
          <div className="md:col-span-8">
            {selectedStudent ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl">{selectedStudent.name}</CardTitle>
                    <CardDescription>
                      Total Score: {editMode ? calculateTotalScore(currentAnswers) : selectedStudent.score}/
                      {selectedStudent.maxScore} ({Math.round((selectedStudent.score / selectedStudent.maxScore) * 100)}%)
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (editMode) {
                        saveChanges();
                      } else {
                        setEditMode(true);
                      }
                    }}
                  >
                    {editMode ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="questions">
                    <TabsList className="mb-4">
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                      <TabsTrigger value="preview">Test Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="questions">
                      <div className="space-y-6">
                        {(editMode ? currentAnswers : selectedStudent.answers).map((answer, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">Question {answer.questionNumber}</h3>
                                <div className="flex items-center space-x-4 mt-1">
                                  <p className="text-sm">
                                    Score: 
                                    {editMode ? (
                                      <Input
                                        type="number"
                                        value={answer.score}
                                        onChange={(e) => handleScoreChange(index, e.target.value)}
                                        className="w-16 h-6 ml-2 inline-flex"
                                        min={0}
                                        max={answer.maxScore}
                                      />
                                    ) : (
                                      <span className="ml-1">{answer.score}</span>
                                    )}
                                    /{answer.maxScore}
                                  </p>
                                  {!editMode && <ConfidenceIndicator confidence={answer.aiConfidence} />}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <Label className="text-sm font-medium mb-1 block">Feedback</Label>
                              {editMode ? (
                                <Input
                                  value={answer.feedback}
                                  onChange={(e) => handleFeedbackChange(index, e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                <p className="text-sm text-muted-foreground p-2 bg-muted/50 rounded">
                                  {answer.feedback}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="preview">
                      <div className="border rounded-md p-4 flex items-center justify-center min-h-[400px] bg-muted/30">
                        <div className="text-center">
                          <p className="text-muted-foreground">Preview not available in this demo</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            In the full version, you would see a scan of the student's test here
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                    Close
                  </Button>
                  
                  {selectedStudent.status === "needs-review" && !editMode && (
                    <div className="flex items-center text-amber-500 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Needs review
                    </div>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[300px]">
                <CardContent className="text-center py-10">
                  <div className="mx-auto rounded-full bg-muted/50 p-6 mb-4 w-16 h-16 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Select a Student</h3>
                  <p className="text-muted-foreground">
                    Choose a student from the list to view and edit their grades
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default AssignmentDetails;
