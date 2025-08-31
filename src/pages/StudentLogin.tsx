import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Lock, User } from "lucide-react";

export default function StudentLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (credentials.username === 'john_doe' && credentials.password === 'password') {
        toast({
          title: "Login Successful",
          description: "Welcome back, John!",
        });
        navigate('/student-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try username: john_doe, password: password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthCard
      title="Student Portal"
      description="Access your academic information and chat with our assistant"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
          <GraduationCap className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Demo credentials:</p>
        <p className="font-mono text-xs mt-1">john_doe / password</p>
      </div>
    </AuthCard>
  );
}