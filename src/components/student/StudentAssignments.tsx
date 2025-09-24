import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Upload, 
  Calendar, 
  User, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StudentAssignmentsProps {
  studentId: string;
  currentLanguage: string;
}

interface Assignment {
  assignment_id: string;
  title: string;
  description: string | null;
  subject: string;
  due_date: string;
  teacher_name: string;
  assigned_at: string;
  submission_id: string | null;
  submission_status: string | null;
  submission_grade: number | null;
  submission_feedback: string | null;
}

export const StudentAssignments = ({ studentId, currentLanguage }: StudentAssignmentsProps) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const translations = {
    en: {
      title: "My Assignments",
      noAssignments: "No assignments assigned yet",
      assignmentTitle: "Assignment Title",
      subject: "Subject",
      description: "Description",
      dueDate: "Due Date",
      teacher: "Teacher",
      status: "Status",
      grade: "Grade",
      feedback: "Feedback",
      submit: "Submit Assignment",
      uploadFile: "Upload File",
      selectFile: "Select a file to upload",
      submitAssignment: "Submit Assignment",
      submitted: "Submitted",
      pending: "Pending",
      graded: "Graded",
      overdue: "Overdue",
      daysLeft: "days left",
      daysOverdue: "days overdue",
      submissionSuccess: "Assignment submitted successfully!",
      submissionError: "Error submitting assignment. Please try again.",
      noFileSelected: "Please select a file to upload",
      fileUploaded: "File uploaded successfully",
      downloadFile: "Download File"
    },
    hi: {
      title: "मेरे असाइनमेंट",
      noAssignments: "अभी तक कोई असाइनमेंट नहीं दिया गया",
      assignmentTitle: "असाइनमेंट शीर्षक",
      subject: "विषय",
      description: "विवरण",
      dueDate: "समाप्ति तारीख",
      teacher: "शिक्षक",
      status: "स्थिति",
      grade: "ग्रेड",
      feedback: "फीडबैक",
      submit: "असाइनमेंट सबमिट करें",
      uploadFile: "फ़ाइल अपलोड करें",
      selectFile: "अपलोड करने के लिए फ़ाइल चुनें",
      submitAssignment: "असाइनमेंट सबमिट करें",
      submitted: "सबमिट किया गया",
      pending: "लंबित",
      graded: "ग्रेडेड",
      overdue: "समय सीमा समाप्त",
      daysLeft: "दिन बचे",
      daysOverdue: "दिन देर से",
      submissionSuccess: "असाइनमेंट सफलतापूर्वक सबमिट किया गया!",
      submissionError: "असाइनमेंट सबमिट करने में त्रुटि। कृपया पुनः प्रयास करें।",
      noFileSelected: "कृपया अपलोड करने के लिए फ़ाइल चुनें",
      fileUploaded: "फ़ाइल सफलतापूर्वक अपलोड की गई",
      downloadFile: "फ़ाइल डाउनलोड करें"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    loadAssignments();
  }, [studentId]);

  const loadAssignments = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_student_assignments', { p_student_id: studentId });

      if (error) {
        console.error('Error loading assignments:', error);
      } else {
        setAssignments(data || []);
      }
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-US');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (assignment: Assignment) => {
    const daysUntilDue = getDaysUntilDue(assignment.due_date);
    
    if (assignment.submission_id) {
      if (assignment.submission_grade !== null) {
        return <Badge variant="default" className="bg-green-500">{t.graded}</Badge>;
      } else {
        return <Badge variant="secondary">{t.submitted}</Badge>;
      }
    } else if (daysUntilDue < 0) {
      return <Badge variant="destructive">{t.overdue}</Badge>;
    } else {
      return <Badge variant="outline">{t.pending}</Badge>;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmitAssignment = async () => {
    if (!selectedFile || !selectedAssignment) {
      setError(t.noFileSelected);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${selectedAssignment.assignment_id}_${studentId}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('assignment-submissions')
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('assignment-submissions')
        .getPublicUrl(fileName);

      // Create submission record
      const { error: submissionError } = await supabase
        .from('submissions')
        .insert({
          assignment_id: selectedAssignment.assignment_id,
          student_id: studentId,
          file_name: selectedFile.name,
          file_url: urlData.publicUrl,
          file_size: selectedFile.size,
          status: 'submitted'
        });

      if (submissionError) {
        throw submissionError;
      }

      setSuccess(t.submissionSuccess);
      setIsSubmitDialogOpen(false);
      setSelectedFile(null);
      setSelectedAssignment(null);
      
      // Reload assignments
      loadAssignments();
    } catch (error) {
      console.error('Error submitting assignment:', error);
      setError(t.submissionError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Success/Error Messages */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Assignments List */}
      <div className="grid gap-4">
        {assignments.length === 0 ? (
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.noAssignments}</h3>
              <p className="text-muted-foreground">Your teacher will assign tasks here</p>
            </CardContent>
          </Card>
        ) : (
          assignments.map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.due_date);
            const isOverdue = daysUntilDue < 0;
            const isSubmitted = assignment.submission_id !== null;

            return (
              <Card key={assignment.assignment_id} className="border-0 shadow-elegant">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{assignment.title}</h3>
                        {getStatusBadge(assignment)}
                      </div>
                      
                      <p className="text-muted-foreground mb-2">{assignment.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {t.dueDate}: {formatDate(assignment.due_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {t.teacher}: {assignment.teacher_name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{assignment.subject}</Badge>
                        {isOverdue && !isSubmitted && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.abs(daysUntilDue)} {t.daysOverdue}
                          </Badge>
                        )}
                        {!isOverdue && !isSubmitted && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {daysUntilDue} {t.daysLeft}
                          </Badge>
                        )}
                      </div>

                      {assignment.submission_grade !== null && (
                        <div className="mt-2 p-2 bg-muted rounded">
                          <p className="text-sm">
                            <strong>{t.grade}:</strong> {assignment.submission_grade}/100
                          </p>
                          {assignment.submission_feedback && (
                            <p className="text-sm mt-1">
                              <strong>{t.feedback}:</strong> {assignment.submission_feedback}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!isSubmitted && (
                        <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {t.submit}
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      )}
                      {isSubmitted && assignment.submission_id && (
                        <Badge variant="secondary" className="px-3 py-1">
                          {t.submitted}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Submit Assignment Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.submitAssignment}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedAssignment && (
              <div className="p-3 bg-muted rounded">
                <h4 className="font-semibold">{selectedAssignment.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedAssignment.subject}</p>
              </div>
            )}
            
            <div>
              <Label htmlFor="file">{t.uploadFile}</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t.selectFile} (PDF, DOC, DOCX, TXT, JPG, PNG)
              </p>
            </div>

            {selectedFile && (
              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleSubmitAssignment}
                disabled={!selectedFile || submitting}
                className="flex-1"
              >
                {submitting ? "Submitting..." : t.submitAssignment}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitDialogOpen(false);
                  setSelectedFile(null);
                  setSelectedAssignment(null);
                  setError("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


