import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, User } from "lucide-react";

export default function SuperAdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (credentials.username === 'superadmin' && credentials.password === 'admin123') {
        toast({
          title: "Login Successful",
          description: "Welcome to Super Admin Portal!",
        });
        navigate('/admin-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try username: superadmin, password: admin123",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthCard
      title="Super Admin Portal"
      description="Full system access and administrative controls"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Admin Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter admin username"
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
            placeholder="Enter admin password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
          <Shield className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Demo credentials:</p>
        <p className="font-mono text-xs mt-1">superadmin / admin123</p>
      </div>
    </AuthCard>
  );
}