import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar, Users, Trash2, FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AssignmentManagerProps {
  students: any[];
  subjects: string[];
  currentLanguage: string;
  teacherId: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  due_date: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

interface Submission {
  submission_id: string;
  assignment_title: string;
  student_name: string;
  student_username: string;
  file_name: string;
  file_url: string;
  submitted_at: string;
  status: string;
  grade: number | null;
  feedback: string | null;
}

export const AssignmentManager = ({ students, subjects, currentLanguage, teacherId }: AssignmentManagerProps) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    assignedStudents: [] as string[],
    grade: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmissionsDialogOpen, setIsSubmissionsDialogOpen] = useState(false);

  // Load assignments and submissions on component mount
  useEffect(() => {
    loadAssignments();
    loadSubmissions();
  }, [teacherId]);

  const loadAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading assignments:', error);
      } else {
        setAssignments(data || []);
      }
    } catch (error) {
      console.error('Error loading assignments:', error);
    }
  };

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_teacher_submissions', { p_teacher_id: teacherId });

      if (error) {
        console.error('Error loading submissions:', error);
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title: "Assignment Manager",
      createNew: "Create New Assignment",
      viewSubmissions: "View Submissions",
      assignments: "Active Assignments",
      assignmentTitle: "Assignment Title",
      subject: "Subject",
      description: "Description",
      dueDate: "Due Date",
      assignTo: "Assign to Students",
      create: "Create Assignment",
      edit: "Edit",
      delete: "Delete",
      students: "students",
      due: "Due",
      selectSubject: "Select Subject",
      selectStudents: "Select students to assign this to",
      active: "Active",
      completed: "Completed",
      draft: "Draft",
      submissions: "Student Submissions",
      studentName: "Student Name",
      fileName: "File Name",
      submittedAt: "Submitted At",
      status: "Status",
      grade: "Grade",
      feedback: "Feedback",
      download: "Download",
      noSubmissions: "No submissions yet",
      noAssignments: "No assignments created yet"
    },
    hi: {
      title: "असाइनमेंट प्रबंधक",
      createNew: "नया असाइनमेंट बनाएं",
      viewSubmissions: "सबमिशन देखें",
      assignments: "सक्रिय असाइनमेंट",
      assignmentTitle: "असाइनमेंट शीर्षक",
      subject: "विषय",
      description: "विवरण",
      dueDate: "समाप्ति तारीख",
      assignTo: "छात्रों को सौंपें",
      create: "असाइनमेंट बनाएं",
      edit: "संपादित करें",
      delete: "हटाएं",
      students: "छात्र",
      due: "समाप्ति",
      selectSubject: "विषय चुनें",
      selectStudents: "इसे सौंपने के लिए छात्रों का चयन करें",
      active: "सक्रिय",
      completed: "पूर्ण",
      draft: "मसौदा",
      submissions: "छात्र सबमिशन",
      studentName: "छात्र का नाम",
      fileName: "फ़ाइल का नाम",
      submittedAt: "सबमिट की गई",
      status: "स्थिति",
      grade: "ग्रेड",
      feedback: "फीडबैक",
      download: "डाउनलोड",
      noSubmissions: "अभी तक कोई सबमिशन नहीं",
      noAssignments: "अभी तक कोई असाइनमेंट नहीं बनाया गया"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const handleCreateAssignment = async () => {
    const hasBasics = Boolean(newAssignment.title && newAssignment.subject && newAssignment.dueDate);
    const targetingIsValid = Boolean(newAssignment.grade || (newAssignment.assignedStudents && newAssignment.assignedStudents.length > 0));
    if (!hasBasics || !targetingIsValid) return;

    try {
      let error;
      if (newAssignment.grade) {
        const resp = await supabase.rpc('create_assignment_by_class', {
          p_title: newAssignment.title,
          p_description: newAssignment.description || null,
          p_subject: newAssignment.subject,
          p_due_date: newAssignment.dueDate,
          p_teacher_id: teacherId,
          p_grade: parseInt(newAssignment.grade, 10)
        });
        error = resp.error;
      } else {
        const resp = await supabase.rpc('create_assignment', {
          p_title: newAssignment.title,
          p_description: newAssignment.description || null,
          p_subject: newAssignment.subject,
          p_due_date: newAssignment.dueDate,
          p_teacher_id: teacherId,
          p_student_ids: newAssignment.assignedStudents
        });
        error = resp.error;
      }

      if (error) {
        console.error('Error creating assignment:', error);
        return;
      }

      // Reset form
      setNewAssignment({
        title: "",
        subject: "",
        description: "",
        dueDate: "",
        assignedStudents: [],
        grade: ""
      });
      setIsDialogOpen(false);

      // Reload assignments
      loadAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setNewAssignment(prev => ({
      ...prev,
      assignedStudents: prev.assignedStudents.includes(studentId)
        ? prev.assignedStudents.filter(id => id !== studentId)
        : [...prev.assignedStudents, studentId]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-US');
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

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      // Delete the assignment; cascades remove assignment_students and submissions
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', assignmentId);

      if (error) {
        console.error('Error deleting assignment:', error);
        return;
      }

      // Refresh lists
      loadAssignments();
      loadSubmissions();
    } catch (e) {
      console.error('Error deleting assignment:', e);
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
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {t.title}
            </CardTitle>
            <div className="flex gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    {t.createNew}
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Dialog open={isSubmissionsDialogOpen} onOpenChange={setIsSubmissionsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    {t.viewSubmissions}
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Create Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.createNew}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">{t.assignmentTitle}</Label>
              <Input
                id="title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t.assignmentTitle}
              />
            </div>

            <div>
              <Label>{t.subject}</Label>
              <Select
                value={newAssignment.subject}
                onValueChange={(value) => setNewAssignment(prev => ({ ...prev, subject: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSubject} />
                </SelectTrigger>
                <SelectContent>
                  {(subjects || ['Math', 'Science', 'Technology', 'Engineering']).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Class (optional)</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {[6,7,8,9,10,11,12].map(g => (
                  <Button
                    key={g}
                    type="button"
                    variant={newAssignment.grade === String(g) ? "default" : "outline"}
                    className="justify-center"
                    onClick={() => setNewAssignment(prev => ({ ...prev, grade: String(g) }))}
                  >
                    {g}
                  </Button>
                ))}
                {newAssignment.grade && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="justify-center col-span-6 text-xs text-muted-foreground"
                    onClick={() => setNewAssignment(prev => ({ ...prev, grade: "" }))}
                  >
                    Clear class selection
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Select a class to auto-assign to all students in that class; leave empty to pick specific students.</p>
            </div>

            <div>
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t.description}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="dueDate">{t.dueDate}</Label>
              <Input
                id="dueDate"
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>

            {!newAssignment.grade && (
            <div>
              <Label>{t.assignTo}</Label>
              <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                {(students || []).map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={student.id}
                      checked={newAssignment.assignedStudents.includes(student.id)}
                      onCheckedChange={() => handleStudentToggle(student.id)}
                    />
                    <Label htmlFor={student.id} className="text-sm">
                      {student.username} - Grade {student.grade}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            )}

            <Button onClick={handleCreateAssignment} className="w-full">
              {t.create}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submissions Dialog */}
      <Dialog open={isSubmissionsDialogOpen} onOpenChange={setIsSubmissionsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.submissions}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t.noSubmissions}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.submission_id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{submission.assignment_title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t.studentName}: {submission.student_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t.fileName}: {submission.file_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t.submittedAt}: {formatDate(submission.submitted_at)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{submission.status}</Badge>
                            {submission.grade !== null && (
                              <Badge variant="default">{t.grade}: {submission.grade}</Badge>
                            )}
                          </div>
                          {submission.feedback && (
                            <p className="text-sm mt-2 p-2 bg-muted rounded">
                              {t.feedback}: {submission.feedback}
                            </p>
                          )}
                          {/* Grading Form for ungraded submissions */}
                          {submission.grade === null && (
                            <form
                              className="mt-4 p-3 bg-muted rounded flex flex-col gap-2"
                              onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const grade = formData.get('grade');
                                const feedback = formData.get('feedback');
                                if (!grade) return;
                                // Update submission record in DB
                                const { error } = await supabase
                                  .from('submissions')
                                  .update({ 
                                    grade: Number(grade), 
                                    feedback: String(feedback),
                                    status: 'graded'
                                  })
                                  .eq('id', submission.submission_id);
                                
                                if (error) {
                                  console.error('Error submitting grade:', error);
                                  return;
                                }
                                
                                // Award points to the student based on grade
                                try {
                                  const { data: subRow, error: subErr } = await supabase
                                    .from('submissions')
                                    .select('student_id')
                                    .eq('id', submission.submission_id)
                                    .single();
                                  if (!subErr && subRow?.student_id) {
                                    const studentId = subRow.student_id as string;
                                    const { data: studentRow, error: stuErr } = await supabase
                                      .from('students')
                                      .select('current_score')
                                      .eq('id', studentId)
                                      .single();
                                    if (!stuErr && typeof studentRow?.current_score === 'number') {
                                      const newScore = (studentRow.current_score || 0) + Number(grade);
                                      const { error: updErr } = await supabase
                                        .from('students')
                                        .update({ current_score: newScore })
                                        .eq('id', studentId);
                                      if (updErr) {
                                        console.error('Failed to award points to student:', updErr);
                                      }
                                    }
                                  }
                                } catch (awardErr) {
                                  console.error('Error while awarding points:', awardErr);
                                }
                                
                                // Reload submissions to show updated grades
                                loadSubmissions();
                                
                                // Show success message
                                alert(currentLanguage === 'hi' ? 'ग्रेड सफलतापूर्वक सबमिट किया गया!' : 'Grade submitted successfully!');
                              }}
                            >
                              <div className="flex gap-2 items-center">
                                <Label htmlFor={`grade-${submission.submission_id}`}>{t.grade}</Label>
                                <Input
                                  id={`grade-${submission.submission_id}`}
                                  name="grade"
                                  type="number"
                                  min={0}
                                  max={100}
                                  required
                                  className="w-20"
                                  placeholder="0-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`feedback-${submission.submission_id}`}>{t.feedback}</Label>
                                <Textarea
                                  id={`feedback-${submission.submission_id}`}
                                  name="feedback"
                                  rows={2}
                                  placeholder="Feedback (optional)"
                                />
                              </div>
                              <Button type="submit" className="mt-2 w-full">
                                {currentLanguage === 'hi' ? 'ग्रेड सबमिट करें' : 'Submit Grade'}
                              </Button>
                            </form>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadFile(submission.file_url, submission.file_name)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {t.download}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Assignments List */}
      <div className="grid gap-4">
        {assignments.length === 0 ? (
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-8 text-center">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.noAssignments}</h3>
              <p className="text-muted-foreground">Create your first assignment to get started</p>
            </CardContent>
          </Card>
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment.id} className="border-0 shadow-elegant">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{assignment.title}</h3>
                      <Badge variant="outline">{assignment.subject}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">{assignment.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {t.due}: {formatDate(assignment.due_date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {students.filter(s => s.teacher_allocated === teacherId).length} {t.students}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};