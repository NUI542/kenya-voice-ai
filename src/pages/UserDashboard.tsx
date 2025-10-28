import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, FileText, Scale, MessageSquare, Search } from "lucide-react";

const documentCategories = [
  { id: "acts", name: "Acts in Force", icon: Scale, count: 45 },
  { id: "bills-tabled", name: "Tabled Bills", icon: FileText, count: 12 },
  { id: "bills-drafted", name: "Bills Drafted", icon: FileText, count: 8 },
  { id: "constitution", name: "Constitution", icon: BookOpen, count: 1 },
  { id: "chats", name: "My Chats", icon: MessageSquare, count: 5 },
];

const sampleDocuments = {
  acts: [
    { id: 1, title: "The Public Finance Management Act, 2012", date: "2012-01-15" },
    { id: 2, title: "The Kenya Citizenship and Immigration Act, 2011", date: "2011-08-08" },
    { id: 3, title: "The National Police Service Act, 2011", date: "2011-10-24" },
  ],
  "bills-tabled": [
    { id: 4, title: "The Finance Bill, 2024", date: "2024-05-10" },
    { id: 5, title: "The Digital Health Bill, 2024", date: "2024-03-22" },
  ],
  "bills-drafted": [
    { id: 6, title: "The Climate Change Bill, 2024", date: "2024-02-15" },
  ],
  constitution: [
    { id: 7, title: "Constitution of Kenya, 2010", date: "2010-08-27" },
  ],
  chats: [
    { id: 8, title: "Chat: Public Finance Management Act", date: "2024-01-10" },
    { id: 9, title: "Chat: Constitution Chapter 4", date: "2024-01-08" },
  ],
};

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("acts");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleDocumentClick = (docId: number) => {
    navigate(`/learning/${docId}`);
  };

  const filteredDocuments = sampleDocuments[selectedCategory as keyof typeof sampleDocuments].filter(
    doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-muted/30">
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Document Library</h2>
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
                    <span className="text-xs">{category.count}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="p-6 h-full flex flex-col">
            <div className="mb-6">
              <h1 className="mb-2 text-2xl font-bold">
                {documentCategories.find(c => c.id === selectedCategory)?.name}
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-3">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDocumentClick(doc.id)}
                      className="w-full text-left rounded-lg border border-border bg-card p-4 hover:shadow-[var(--shadow-soft)] transition-shadow"
                    >
                      <h3 className="font-semibold text-card-foreground">{doc.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Last updated: {new Date(doc.date).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No documents found matching your search
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
