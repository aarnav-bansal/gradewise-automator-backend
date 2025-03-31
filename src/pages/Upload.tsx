
import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Upload as UploadIcon, FileText, X, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [assignmentName, setAssignmentName] = useState("");
  const [testFile, setTestFile] = useState<File | null>(null);
  const [answerKeyFile, setAnswerKeyFile] = useState<File | null>(null);
  const [rubric, setRubric] = useState("");
  const [gradingInstructions, setGradingInstructions] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTestFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file",
          duration: 3000,
        });
        return;
      }
      setTestFile(file);
    }
  };

  const handleAnswerKeyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file",
          duration: 3000,
        });
        return;
      }
      setAnswerKeyFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide an assignment name",
        duration: 3000,
      });
      return;
    }

    if (!testFile) {
      toast({
        variant: "destructive",
        title: "Missing file",
        description: "Please upload the test file",
        duration: 3000,
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload and processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: "Your assignment has been uploaded and is now processing",
        duration: 3000,
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <PageContainer
        title="Upload Assignment"
        description="Upload test documents and set grading criteria"
      >
        <Card className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>
                Provide information about the assignment you want to grade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assignmentName">Assignment Name</Label>
                <Input
                  id="assignmentName"
                  placeholder="e.g., Algebra Quiz 4"
                  value={assignmentName}
                  onChange={(e) => setAssignmentName(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>Test Document (PDF)</Label>
                <div className="border rounded-md p-4">
                  {!testFile ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="mb-4 bg-brand-50 rounded-full p-3">
                        <UploadIcon className="h-6 w-6 text-brand-600" />
                      </div>
                      <p className="text-sm text-center text-muted-foreground mb-2">
                        Drag and drop your PDF file here or click to browse
                      </p>
                      <p className="text-xs text-center text-muted-foreground mb-4">
                        Upload a multi-page PDF containing all student answer sheets
                      </p>
                      <Input
                        id="testFile"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleTestFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("testFile")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-brand-600" />
                        <div>
                          <p className="text-sm font-medium">{testFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(testFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setTestFile(null)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Tabs defaultValue="answerKey">
                <TabsList className="w-full">
                  <TabsTrigger value="answerKey" className="flex-1">Answer Key (Optional)</TabsTrigger>
                  <TabsTrigger value="rubric" className="flex-1">Grading Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="answerKey" className="space-y-4 pt-4">
                  <div className="border rounded-md p-4">
                    {!answerKeyFile ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="mb-4 bg-brand-50 rounded-full p-3">
                          <FileText className="h-6 w-6 text-brand-600" />
                        </div>
                        <p className="text-sm text-center text-muted-foreground mb-2">
                          Upload an answer key to improve grading accuracy
                        </p>
                        <Input
                          id="answerKeyFile"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleAnswerKeyFileChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("answerKeyFile")?.click()}
                        >
                          Select File
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-brand-600" />
                          <div>
                            <p className="text-sm font-medium">{answerKeyFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(answerKeyFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setAnswerKeyFile(null)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-muted-foreground">
                      For best results, provide a clear, correctly solved answer key
                    </span>
                  </div>
                </TabsContent>
                <TabsContent value="rubric" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="rubric">Rubric (Optional)</Label>
                    <Textarea
                      id="rubric"
                      placeholder="Enter your grading rubric here (e.g., point values for each question, partial credit rules)"
                      value={rubric}
                      onChange={(e) => setRubric(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradingInstructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="gradingInstructions"
                      placeholder="Any special grading instructions for the AI (e.g., focus areas, common mistakes to look for)"
                      value={gradingInstructions}
                      onChange={(e) => setGradingInstructions(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Upload and Process
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </PageContainer>
    </>
  );
};

export default Upload;
