import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, MessageSquare, TrendingUp, FileText } from "lucide-react";

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
  {
    id: 4,
    title: "Constitution of Kenya - Chapter 4: Bill of Rights",
    description: "Understanding and protecting fundamental rights and freedoms",
    participants: 345,
    opinions: 678,
    votes: 1456,
    hasReport: true,
  },
];

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleForumClick = (forumId: number) => {
    navigate(`/forum/${forumId}`);
  };

  const handleViewReport = (forumId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Open report modal - would be implemented with actual report viewing
    alert(`Viewing report for forum ${forumId}`);
  };

  const filteredForums = forumsData.filter((forum) =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Community Forums</h1>
          <p className="text-muted-foreground">
            Join discussions and share your views on Kenya's legislation
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search forums by document title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredForums.map((forum) => (
            <Card
              key={forum.id}
              className="cursor-pointer hover:shadow-[var(--shadow-medium)] transition-shadow border-2"
              onClick={() => handleForumClick(forum.id)}
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
                          onClick={(e) => handleViewReport(forum.id, e)}
                        >
                          View Report
                        </Button>
                      </>
                    ) : (
                      <Badge variant="outline">No Report Yet</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredForums.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No forums found matching your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Forums;
