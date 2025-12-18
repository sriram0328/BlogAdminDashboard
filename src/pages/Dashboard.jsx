import React from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogTable from '../components/BlogTable';

export default function Dashboard({ onViewBlog, onEditBlog, onCreateBlog, onNavigate }) {
  const { blogs } = useBlogs();

  const activeBlogs = blogs.filter(b => !b.deleted);
  const totalBlogs = activeBlogs.length;
  const publishedCount = activeBlogs.filter(b => b.status === "Published").length;
  const draftCount = activeBlogs.filter(b => b.status === "Draft").length;

  const recentBlogs = [...activeBlogs]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  // Compact Stat Card (Optimized for 3-in-a-row on mobile)
  const StatCard = ({ title, count, colorClass, icon }) => (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center h-full">
      <div className={`mb-2 p-2 rounded-full ${colorClass.replace('text-', 'bg-').replace('600', '50')} ${colorClass} md:hidden`}>
         {/* Smaller icon for mobile */}
         {React.cloneElement(icon, { className: "w-4 h-4" })}
      </div>
      <div className={`hidden md:block mb-0 p-3 rounded-full ${colorClass.replace('text-', 'bg-').replace('600', '50')} ${colorClass} absolute top-3 right-3`}>
         {icon}
      </div>
      
      <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className={`text-xl md:text-3xl font-bold mt-0.5 md:mt-2 ${colorClass}`}>{count}</p>
    </div>
  );

  return (
    // Reduced padding on mobile (p-4) to fix "too much space" issue
    <main className="p-4 md:p-8 pb-20">
      
      <div className="grid gap-4 md:gap-6">
        
        {/* Header Section - Fixed Alignment */}
        <div className="flex flex-row items-center justify-between gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-xs md:text-sm text-gray-500">Overview</p>
          </div>
          
          <button 
  onClick={onCreateBlog} 
  className="flex items-center gap-1 text-xs md:text-base px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm whitespace-nowrap bg-white border border-blue-900 text-blue-900 hover:bg-blue-50 active:scale-95"
>
  <span>New Post</span>
</button>
        </div>

        {/* Stats Cards - Forced 3 Columns on Mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <StatCard 
            title="Total" 
            count={totalBlogs} 
            colorClass="text-blue-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
          />
          <StatCard 
            title="Published" 
            count={publishedCount} 
            colorClass="text-green-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatCard 
            title="Drafts" 
            count={draftCount} 
            colorClass="text-yellow-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-sm md:text-base">Recent Activity</h3>
            <button 
               onClick={() => onNavigate && onNavigate('blogs')} 
               className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <BlogTable 
                blogs={recentBlogs} 
                onView={onViewBlog} 
                onEdit={onEditBlog}
              />
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {recentBlogs.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {recentBlogs.map((b) => (
                    <div key={b.id} className="p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{b.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          b.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-2 gap-2">
                        <span>{b.author || "Unknown"}</span>
                        <span>•</span>
                        <span>{new Date(b.created || Date.now()).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => onViewBlog(b.id)} 
                          className="flex-1 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => onEditBlog(b.id)} 
                          className="flex-1 py-1 text-xs font-medium text-yellow-600 bg-yellow-50 border border-yellow-100 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400 text-sm">
                  No recent activity found.
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}