import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  className?: string;
}

export function ChatBubble({ message, isUser, timestamp, className }: ChatBubbleProps) {
  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
      isUser ? "justify-end" : "justify-start",
      className
    )}>
      {!isUser && (
        <Avatar className="w-8 h-8 border-2 border-primary/20">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[75%] px-4 py-3 rounded-2xl shadow-sm",
        isUser 
          ? "bg-chat-user text-chat-user-foreground rounded-br-lg" 
          : "bg-chat-bot text-chat-bot-foreground border border-border rounded-bl-lg"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-chat-user-foreground" : "text-muted-foreground"
          )}>
            {timestamp}
          </p>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 border-2 border-primary/20">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}