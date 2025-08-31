import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Shield, BookOpen, MessageCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "Student Portal",
      description: "Access your academic information, check attendance, view marks, and chat with our AI assistant",
      icon: GraduationCap,
      path: "/student-login",
      color: "text-primary"
    },
    {
      title: "Staff Portal", 
      description: "Manage student records, update attendance, and handle academic data",
      icon: Users,
      path: "/staff-login",
      color: "text-success"
    },
    {
      title: "Super Admin",
      description: "Complete system access with full administrative controls and analytics",
      icon: Shield,
      path: "/superadmin-login", 
      color: "text-warning"
    }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "Get instant answers about attendance, marks, fees, and leave requests"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track academic performance and attendance with detailed insights"
    },
    {
      icon: BookOpen,
      title: "Academic Management",
      description: "Complete student lifecycle management from admission to graduation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Portal System</h1>
                <p className="text-muted-foreground">Comprehensive academic management platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Your Academic Hub
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access your student information, chat with our AI assistant, and manage your academic journey 
            with our comprehensive portal system.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {userTypes.map((userType) => {
            const IconComponent = userType.icon;
            return (
              <Card key={userType.path} className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-secondary flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-8 h-8 ${userType.color}`} />
                  </div>
                  <CardTitle className="text-xl">{userType.title}</CardTitle>
                  <CardDescription className="text-base">{userType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(userType.path)}
                    className="w-full"
                  >
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Platform Features</h3>
          <p className="text-muted-foreground">Everything you need for modern academic management</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Demo Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-md bg-muted/30">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-3">Demo Credentials</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-primary">Student</p>
                  <p className="font-mono">john_doe / password</p>
                </div>
                <div>
                  <p className="font-medium text-success">Staff</p>
                  <p className="font-mono">staff_admin / staff123</p>
                </div>
                <div>
                  <p className="font-medium text-warning">Super Admin</p>
                  <p className="font-mono">superadmin / admin123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
