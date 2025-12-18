import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import CreateEditBlog from "./pages/CreateEditBlog";
import ViewBlog from "./pages/ViewBlog";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("appPage");
    return saved || "dashboard"; 
  });
  
  const [selectedBlogId, setSelectedBlogId] = useState(() => {
    const saved = localStorage.getItem("selectedBlogId");
    return saved ? parseInt(saved, 10) : null;
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("appPage", page);
  }, [page]);

  useEffect(() => {
    if (selectedBlogId) {
      localStorage.setItem("selectedBlogId", selectedBlogId);
    } else {
      localStorage.removeItem("selectedBlogId");
    }
  }, [selectedBlogId]);

  const handleViewBlog = (blogId) => {
    setSelectedBlogId(blogId);
    setPage("view");
  };

  const handleEditBlog = (blogId) => {
    setSelectedBlogId(blogId);
    setPage("edit");
  };

  const handleCreateBlog = () => {
    setSelectedBlogId(null);
    setPage("create");
  };

  const handleBackToBlog = () => {
    setSelectedBlogId(null);
    setPage("blogs");
  };

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col min-h-screen lg:flex-row bg-gray-50">
      {/* Sidebar - Mobile Modal / Desktop Static */}
      <div className={`
        fixed top-0 left-0 bottom-0 lg:static
        w-3/4 sm:w-1/2 lg:w-64 
        z-50 lg:z-auto
        transform transition-transform duration-300 lg:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        bg-white border-r border-gray-200
      `}>
        <Sidebar setPage={setPage} onNavigate={() => setSidebarOpen(false)} activePage={page} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* FIX APPLIED HERE:
           - pt-16: Adds top padding on mobile (approx height of navbar) so content isn't hidden.
           - lg:pt-0: Removes that padding on Desktop since you mentioned it has enough spacing.
        */}
        <div className="flex-1 overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
          
          {page === "dashboard" && (
            <Dashboard 
              onViewBlog={handleViewBlog} 
              onEditBlog={handleEditBlog} 
              onCreateBlog={handleCreateBlog}
              onNavigate={handleNavigate}
            />
          )}

          {page === "blogs" && (
            <Blogs 
              onViewBlog={handleViewBlog} 
              onEditBlog={handleEditBlog} 
              onCreateBlog={handleCreateBlog} 
            />
          )}

          {page === "create" && (
            <CreateEditBlog 
              setPage={setPage} 
              onBack={handleBackToBlog} 
            />
          )}

          {page === "view" && (
            <ViewBlog 
              blogId={selectedBlogId} 
              onBack={handleBackToBlog} 
            />
          )}

          {page === "edit" && (
            <CreateEditBlog 
              blogId={selectedBlogId} 
              isEdit={true} 
              setPage={setPage} 
              onBack={handleBackToBlog} 
            />
          )}

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}