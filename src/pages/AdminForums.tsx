import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, TrendingUp, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Forum {
  id: number;
  title: string;
  description: string;
  participants: number;
  opinions: number;
  votes: number;
  hasReport: boolean;
}

const forumsData: Forum[] = [
  {
    id: 1,
    title: "The Public Finance Management Act, 2012",
    description: "Discussion on transparency and accountability in public finance",
    participants: 234,
    opinions: 456,
    votes: 1203,
    hasReport: true,
  },
  {
    id: 2,
    title: "The Finance Bill, 2024",
    description: "Analyzing proposed tax reforms and their impact on citizens",
    participants: 567,
    opinions: 892,
    votes: 2341,
    hasReport: true,
  },
  {
    id: 3,
    title: "The Digital Health Bill, 2024",
    description: "Digital health infrastructure and data privacy concerns",
    participants: 123,
    opinions: 234,
    votes: 567,
    hasReport: false,
  },
];

const AdminForums = () => {
  const [forums, setForums] = useState<Forum[]>(forumsData);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate("/");
  };

  const handleGenerateReport = (forumId: number) => {
    toast({
      title: "Generating report",
      description: "The AI is analyzing community discussions and generating a comprehensive report...",
    });

    // Simulate report generation
    setTimeout(() => {
      setForums(forums.map(f => 
        f.id === forumId ? { ...f, hasReport: true } : f
      ));
      
      toast({
        title: "Report generated successfully",
        description: "The report is now available for viewing and download",
      });
    }, 2000);
  };

  const handleViewReport = (forumId: number) => {
    alert(`Viewing report for forum ${forumId}`);
  };

  const handleViewForum = (forumId: number) => {
    navigate(`/forum/${forumId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated isAdmin onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Forum Reports Management</h1>
          <p className="text-muted-foreground">
            Generate AI-powered reports from community discussions
          </p>
        </div>

        <div className="space-y-4">
          {forums.map((forum) => (
            <Card
              key={forum.id}
              className="border-2 hover:shadow-[var(--shadow-medium)] transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="mb-2 text-xl font-semibold">{forum.title}</h2>
                    <p className="mb-4 text-muted-foreground">{forum.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{forum.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{forum.opinions} opinions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{forum.votes} total votes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {forum.hasReport ? (
                      <>
                        <Badge variant="secondary" className="mb-2">
                          <FileText className="mr-1 h-3 w-3" />
                          Report Available
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewReport(forum.id)}
                        >
                          View Report
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="mb-2">No Report Yet</Badge>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleGenerateReport(forum.id)}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewForum(forum.id)}
                    >
                      View Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminForums;
