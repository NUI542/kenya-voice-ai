import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  // Check if admin is viewing (from admin dashboard)
  const isAdmin = location.state?.isAdmin || false;

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewDocument = () => {
    navigate(`/learning/${forumId}`);
  };

  const handleViewReport = () => {
    setIsReportOpen(true);
  };

  const handleSubmitOpinion = () => {
    if (!newOpinion.trim()) return;

    const opinion: Opinion = {
      id: Date.now(),
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

  const handleSubmitReply = (parentId: number) => {
    if (!replyText.trim()) return;

    const newReply: Opinion = {
      id: Date.now(),
      author: "You",
      content: replyText,
      upvotes: 0,
      downvotes: 0,
      replies: [],
      timestamp: new Date().toLocaleString(),
    };

    const addReplyToOpinion = (opinions: Opinion[]): Opinion[] => {
      return opinions.map((opinion) => {
        if (opinion.id === parentId) {
          return {
            ...opinion,
            replies: [...opinion.replies, newReply],
          };
        }
        if (opinion.replies.length > 0) {
          return {
            ...opinion,
            replies: addReplyToOpinion(opinion.replies),
          };
        }
        return opinion;
      });
    };

    setOpinions(addReplyToOpinion(opinions));
    setReplyText("");
    setReplyingTo(null);
  };

  const OpinionCard = ({ opinion, isReply = false }: { opinion: Opinion; isReply?: boolean }) => (
    <div className={`py-2 ${isReply ? "ml-4 pl-4 border-l-2 border-border" : ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-sm">{opinion.author}</span>
        <span className="text-xs text-muted-foreground">{opinion.timestamp}</span>
      </div>
      <p className="mb-3">{opinion.content}</p>
      <div className="flex items-center gap-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <ThumbsUp className="h-4 w-4" />
          {opinion.upvotes}
        </Button>
        <Button size="sm" variant="ghost" className="gap-1">
          <ThumbsDown className="h-4 w-4" />
          {opinion.downvotes}
        </Button>
        {!isAdmin && (
          <Button 
            size="sm" 
            variant="ghost" 
            className="gap-1"
            onClick={() => setReplyingTo(opinion.id)}
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
        )}
      </div>
      
      {/* Reply Input */}
      {replyingTo === opinion.id && (
        <div className="mt-3 flex items-center gap-2">
          <Input
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitReply(opinion.id);
              }
              if (e.key === 'Escape') {
                setReplyingTo(null);
                setReplyText("");
              }
            }}
            className="flex-1"
            autoFocus
          />
          <Button onClick={() => handleSubmitReply(opinion.id)} size="icon">
            <Send className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => {
              setReplyingTo(null);
              setReplyText("");
            }} 
            size="sm" 
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Nested Replies */}
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

      {/* Report Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI-Generated Forum Report</DialogTitle>
            <DialogDescription>
              Analysis of opinions and discussions on The Public Finance Management Act, 2012
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <section>
              <h3 className="font-semibold text-lg mb-2">Summary</h3>
              <p className="text-muted-foreground">
                The forum discussion shows strong support for increased accountability measures in public finance management. 
                Participants emphasized the importance of clear implementation guidelines and strict compliance timelines.
              </p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">Key Themes</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Need for clearer implementation guidelines (mentioned by 67% of participants)</li>
                <li>Support for stronger penalties for non-compliance</li>
                <li>Concerns about potential loopholes in Section 7</li>
                <li>Emphasis on fiscal responsibility and transparency</li>
              </ul>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">Sentiment Analysis</h3>
              <p className="text-muted-foreground">
                Overall sentiment: Positive (78% approval). Most participants view this legislation as a significant 
                step forward, though concerns remain about implementation details.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscussionForum;
