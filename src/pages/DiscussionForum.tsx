import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown, Reply, FileText, BookOpen, Send } from "lucide-react";

interface Opinion {
  id: number;
  author: string;
  content: string;
  upvotes: number;
  downvotes: number;
  replies: Opinion[];
  timestamp: string;
}

const sampleOpinions: Opinion[] = [
  {
    id: 1,
    author: "Jane K.",
    content: "The provisions on accountability are crucial for our democracy. However, I believe Section 7 needs clearer implementation guidelines to prevent loopholes.",
    upvotes: 45,
    downvotes: 3,
    timestamp: "2024-01-10 14:30",
    replies: [
      {
        id: 11,
        author: "John M.",
        content: "I agree. We need more specific timelines for compliance.",
        upvotes: 12,
        downvotes: 1,
        timestamp: "2024-01-10 15:15",
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: "David O.",
    content: "This bill represents a significant step forward in fiscal responsibility. The penalties for non-compliance should serve as a deterrent.",
    upvotes: 67,
    downvotes: 8,
    timestamp: "2024-01-09 11:20",
    replies: [],
  },
];

const DiscussionForum = () => {
  const { forumId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [opinions, setOpinions] = useState<Opinion[]>(sampleOpinions);
  const [newOpinion, setNewOpinion] = useState("");
  
  // Check if admin is viewing (from admin dashboard)
  const isAdmin = location.state?.isAdmin || false;

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewDocument = () => {
    navigate(`/learning/${forumId}`);
  };

  const handleViewReport = () => {
    alert("Opening report viewer");
  };

  const handleSubmitOpinion = () => {
    if (!newOpinion.trim()) return;

    const opinion: Opinion = {
      id: opinions.length + 1,
      author: "You",
      content: newOpinion,
      upvotes: 0,
      downvotes: 0,
      replies: [],
      timestamp: new Date().toLocaleString(),
    };

    setOpinions([opinion, ...opinions]);
    setNewOpinion("");
  };

  const OpinionCard = ({ opinion, isReply = false }: { opinion: Opinion; isReply?: boolean }) => (
    <div className={`rounded-lg border border-border bg-card p-4 ${isReply ? "ml-8 mt-2" : ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">{opinion.author}</span>
        <span className="text-sm text-muted-foreground">{opinion.timestamp}</span>
      </div>
      <p className="mb-3 text-card-foreground">{opinion.content}</p>
      <div className="flex items-center gap-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <ThumbsUp className="h-4 w-4" />
          {opinion.upvotes}
        </Button>
        <Button size="sm" variant="ghost" className="gap-1">
          <ThumbsDown className="h-4 w-4" />
          {opinion.downvotes}
        </Button>
        {!isReply && (
          <Button size="sm" variant="ghost" className="gap-1">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
        )}
      </div>
      {opinion.replies.map((reply) => (
        <OpinionCard key={reply.id} opinion={reply} isReply />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="flex flex-col flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Forum Header */}
        <div className="mb-6 rounded-lg border-2 border-border bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="mb-2 text-2xl font-bold">The Public Finance Management Act, 2012</h1>
              <p className="text-muted-foreground">
                Discussion on transparency and accountability in public finance
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={handleViewDocument}>
                <BookOpen className="mr-2 h-4 w-4" />
                View Document
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  <FileText className="mr-1 h-3 w-3" />
                  Report Available
                </Badge>
              </div>
              <Button size="sm" variant="secondary" onClick={handleViewReport}>
                View Report
              </Button>
            </div>
          </div>
        </div>

        {/* Opinions List */}
        <ScrollArea className="flex-1 mb-6">
          <div className="space-y-4 pr-4">
            {opinions.map((opinion) => (
              <OpinionCard key={opinion.id} opinion={opinion} />
            ))}
          </div>
        </ScrollArea>

        {/* Opinion Input - Only show for non-admin users */}
        {!isAdmin && (
          <div className="sticky bottom-0 bg-background pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Share your opinion on this legislation..."
                value={newOpinion}
                onChange={(e) => setNewOpinion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitOpinion();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSubmitOpinion} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DiscussionForum;
