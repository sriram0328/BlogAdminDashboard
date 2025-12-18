export default function Sidebar({ setPage, onNavigate, activePage }) {
  
  const handleNavigate = (page) => {
    setPage(page);
    if (onNavigate) onNavigate();
  };

  // FIX: Removed "create" from here so "Blogs" doesn't light up when "Create New" is active
  const isBlogsActive = ["blogs", "view", "edit"].includes(activePage);

  return (
    <div className="h-full flex flex-col p-4 lg:p-6">
      
      {/* Header */}
      <div className="mb-8 flex items-center gap-2 px-2">
       <div>
           <h1 className="text-xl font-bold text-gray-900">BlogHub</h1>
           <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1 overflow-y-auto"> 
        
        {/* DASHBOARD BUTTON */}
        <button 
          onClick={() => handleNavigate("dashboard")} 
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-base flex items-center gap-3 ${
            activePage === "dashboard"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span>Dashboard</span>
        </button>

        {/* BLOGS BUTTON (Active for List, View, Edit) */}
        <button 
          onClick={() => handleNavigate("blogs")} 
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-base flex items-center gap-3 ${
            isBlogsActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          <span>All Blogs</span>
        </button>

        {/* CREATE NEW BUTTON (Active only for Create) */}
        <button 
          onClick={() => handleNavigate("create")} 
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-base flex items-center gap-3 ${
            activePage === "create"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>Create New</span>
        </button>

      </nav>

     
    </div>
  );
}