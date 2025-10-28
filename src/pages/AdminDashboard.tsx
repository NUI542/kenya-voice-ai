import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Scale, Upload, Users, MessageSquare, TrendingUp, Sparkles } from "lucide-react";
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

const documentCategories = [
  { id: "acts", name: "Acts in Force", icon: Scale },
  { id: "bills-tabled", name: "Tabled Bills", icon: FileText },
  { id: "bills-drafted", name: "Bills Drafted", icon: FileText },
  { id: "constitution", name: "Constitution", icon: BookOpen },
  { id: "upload", name: "Upload Documents", icon: Upload },
  { id: "forums", name: "Forum Reports", icon: Users },
];

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("upload");
  const [uploadCategory, setUploadCategory] = useState("");
  const [forums, setForums] = useState<Forum[]>(forumsData);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate("/");
  };

  const handleUpload = () => {
    if (!uploadCategory) {
      toast({
        title: "Category required",
        description: "Please select a document category",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Document uploaded",
      description: "The document has been uploaded and is being processed",
    });
  };

  const handleGenerateReport = (forumId: number) => {
    toast({
      title: "Generating report",
      description: "The AI is analyzing community discussions and generating a comprehensive report...",
    });

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
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-muted/30">
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Admin Panel</h2>
            <nav className="space-y-1">
              {documentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="p-6 h-full">
            {selectedCategory === "upload" ? (
              <div className="max-w-2xl">
                <h1 className="mb-6 text-2xl font-bold">Upload Documents</h1>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="category">Document Category</Label>
                        <Select value={uploadCategory} onValueChange={setUploadCategory}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="acts">Acts in Force</SelectItem>
                            <SelectItem value="bills-tabled">Tabled Bills</SelectItem>
                            <SelectItem value="bills-drafted">Bills Drafted</SelectItem>
                            <SelectItem value="constitution">Constitution</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Document File</Label>
                        <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
                          <div>
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Drag and drop your file here, or click to browse
                            </p>
                            <Button variant="secondary" className="mt-4">
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleUpload} className="w-full">
                        Upload Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : selectedCategory === "forums" ? (
              <div>
                <div className="mb-8">
                  <h1 className="mb-2 text-2xl font-bold">Forum Reports Management</h1>
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
              </div>
            ) : (
              <div>
                <h1 className="mb-6 text-2xl font-bold">
                  {documentCategories.find(c => c.id === selectedCategory)?.name}
                </h1>
                <p className="text-muted-foreground">
                  Document management interface would be displayed here
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
