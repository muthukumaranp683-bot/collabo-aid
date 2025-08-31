import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  LogOut,
  MessageCircle,
  User,
  TrendingUp
} from "lucide-react";
import { mockCurrentUser, mockMarks, mockFees, mockLeaveRequests, mockEvents } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const user = mockCurrentUser;

  const handleLogout = () => {
    navigate('/');
  };

  const upcomingEvents = mockEvents
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const userMarks = mockMarks.filter(m => m.studentId === user.id);
  const userFees = mockFees.filter(f => f.studentId === user.id);
  const userLeaves = mockLeaveRequests.filter(l => l.studentId === user.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Student Portal</h1>
                <p className="text-primary-foreground/80">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm opacity-80">{user.studentId}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="text-primary border-primary-foreground/20 hover:bg-primary-foreground/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageCircle className="w-4 h-4 mr-2" />
              Assistant
            </TabsTrigger>
            <TabsTrigger value="marks">
              <BookOpen className="w-4 h-4 mr-2" />
              Marks
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <User className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="fees">
              <CreditCard className="w-4 h-4 mr-2" />
              Fees
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.attendancePercentage}%</div>
                  <Progress value={user.attendancePercentage} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {user.attendancePercentage >= 75 ? "✅ Eligible for exams" : "⚠️ Below required 75%"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sick Leaves</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.sickLeavesUsed}/2</div>
                  <p className="text-xs text-muted-foreground">Used this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{userFees.filter(f => f.status === 'unpaid').reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {userFees.filter(f => f.status === 'unpaid').length} pending payments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                  <p className="text-xs text-muted-foreground">Events this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Marks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userMarks.slice(0, 3).map((mark) => (
                      <div key={mark.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{mark.subject}</p>
                          <p className="text-sm text-muted-foreground">{mark.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{mark.marks}/{mark.totalMarks}</p>
                          <p className="text-sm text-muted-foreground">
                            {Math.round((mark.marks / mark.totalMarks) * 100)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="h-[600px]">
              <ChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="marks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userMarks.map((mark) => (
                    <div key={mark.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{mark.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {mark.type} • {new Date(mark.examDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{mark.marks}/{mark.totalMarks}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((mark.marks / mark.totalMarks) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Attendance</span>
                    <span className="font-bold text-2xl">{user.attendancePercentage}%</span>
                  </div>
                  <Progress value={user.attendancePercentage} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <p className="text-2xl font-bold text-success">102</p>
                      <p className="text-sm text-muted-foreground">Classes Attended</p>
                    </div>
                    <div className="text-center p-4 bg-destructive/10 rounded-lg">
                      <p className="text-2xl font-bold text-destructive">18</p>
                      <p className="text-sm text-muted-foreground">Classes Missed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userFees.map((fee) => (
                    <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{fee.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-xl font-bold">₹{fee.amount.toLocaleString()}</span>
                        <StatusBadge status={fee.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-sm font-medium mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}