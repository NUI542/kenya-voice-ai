import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Users } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const LearningPlatform = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm here to help you understand this document. Feel free to ask any questions about the content, and I'll explain it in simple terms.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputMessage,
    };

    const aiResponse: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: "This is a simulated AI response. In the full implementation, this would analyze the document and provide contextual explanations based on your question.",
    };

    setMessages([...messages, newUserMessage, aiResponse]);
    setInputMessage("");
  };

  const handleJoinForum = () => {
    navigate(`/forum/${docId}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Document Viewer */}
        <main className="flex-1 border-r border-border overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="border-b border-border bg-muted/30 p-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">The Public Finance Management Act, 2012</h1>
              <Button onClick={handleJoinForum} variant="secondary">
                <Users className="mr-2 h-4 w-4" />
                Join Forum
              </Button>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="prose prose-sm max-w-none">
                <h2>CHAPTER ONE — PRELIMINARY</h2>
                <h3>1. Short title</h3>
                <p>This Act may be cited as the Public Finance Management Act, 2012.</p>
                
                <h3>2. Interpretation</h3>
                <p>In this Act, unless the context otherwise requires—</p>
                <p>
                  <strong>"accounting officer"</strong> means a person designated as such under section 67;
                </p>
                <p>
                  <strong>"Auditor-General"</strong> means the Auditor-General appointed under Article 229 of the Constitution;
                </p>
                
                <h2>CHAPTER TWO — PRINCIPLES OF PUBLIC FINANCE MANAGEMENT</h2>
                <h3>3. Principles of public finance management</h3>
                <p>The principles of public finance management set out in Article 201 of the Constitution shall guide all financial management in the national and county governments.</p>
                
                <p className="text-muted-foreground italic mt-8">
                  [This is a sample preview. The full document would be displayed here with complete formatting and navigation.]
                </p>
              </div>
            </ScrollArea>
          </div>
        </main>

        {/* Chat Sidebar */}
        <aside className="w-96 bg-muted/30 flex flex-col">
          <div className="border-b border-border bg-background p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI Assistant
            </h2>
            <p className="text-sm text-muted-foreground">Ask questions to understand better</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-4"
                      : "bg-card border border-border mr-4"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border bg-background p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LearningPlatform;
