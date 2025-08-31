import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { chatbot } from "@/lib/chatbot";
import { ChatMessage } from "@/types";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hi! I'm your student assistant. I can help you check attendance, marks, fees, leave requests, and upcoming events. What would you like to know?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const botResponse = await chatbot.sendMessage(userMessage.message);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "Sorry, I'm having trouble processing your request. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What's my attendance?",
    "Show my marks",
    "Check fee status",
    "Upcoming events",
    "Apply for leave"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b bg-gradient-primary text-primary-foreground">
        <h3 className="font-semibold text-lg">Student Assistant</h3>
        <p className="text-sm opacity-90">Ask me about attendance, marks, fees, and more!</p>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.message}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-chat-bot text-chat-bot-foreground px-4 py-3 rounded-2xl rounded-bl-lg border border-border">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-secondary/50">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickQuestions.map((question) => (
            <Button
              key={question}
              variant="outline"
              size="sm"
              onClick={() => handleQuickQuestion(question)}
              className="text-xs"
            >
              {question}
            </Button>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}