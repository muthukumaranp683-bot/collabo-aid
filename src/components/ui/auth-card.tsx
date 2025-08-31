import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, className }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-secondary p-4">
      <div className="w-full max-w-md">
        <Card className={cn("shadow-lg border-0", className)}>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}