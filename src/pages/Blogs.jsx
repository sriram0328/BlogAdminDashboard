import { useEffect, useState, useRef } from "react";
import useBlogs from "../hooks/useBlogs";
import Pagination from "../components/Pagination";
import BlogTable from "../components/BlogTable";

export default function Blogs({ onViewBlog, onEditBlog, onCreateBlog }) {
  const { blogs, setBlogs } = useBlogs();
  const [search, setSearch] = useState("");
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All"); 

  // Dropdown States & Refs
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  const categoryRef = useRef(null);
  const statusRef = useRef(null);

  const [perPage, setPerPage] = useState(() => {
    const saved = localStorage.getItem("perPage");
    return saved ? parseInt(saved, 10) : 5;
  });
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("page");
    return saved ? parseInt(saved, 10) : 1;
  });

  const categories = ["All", ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const statusOptions = [
    { label: "All Status", value: "All" },
    { label: "Published", value: "Published" },
    { label: "Draft", value: "Draft" }
  ];

  useEffect(() => { localStorage.setItem("page", page); }, [page]);
  useEffect(() => { 
    localStorage.setItem("perPage", perPage); 
    setPage(1); 
  }, [perPage]);
  useEffect(() => { setPage(1); }, [blogs.length]);

  // Click outside handler for both dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = blogs.filter(
    (b) =>
      !b.deleted &&
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "All" || b.category === selectedCategory) &&
      (selectedStatus === "All" || b.status === selectedStatus)
  );

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const deleteBlog = (id) => {
    if(window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(
        blogs.map((b) =>
          b.id === id ? { ...b, deleted: true, deletedAt: Date.now() } : b
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
        <div>
           <h2 className="text-xl md:text-3xl font-bold text-gray-900">All Blogs</h2>
           <p className="hidden sm:block text-gray-500 text-sm mt-1">Manage content</p>
        </div>
        <button 
  onClick={onCreateBlog} 
  className="flex items-center gap-1 text-xs md:text-base px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm whitespace-nowrap bg-white border border-blue-900 text-blue-900 hover:bg-blue-50 active:scale-95"
>  <span>New Post</span>
</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        
        {/* === FILTERS SECTION (Top on Mobile, Sidebar on Desktop) === */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-3 lg:space-y-6">
          
          {/* Search Box */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200">
             <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 md:mb-2 block">Search</label>
             <div className="relative">
                <input
                  placeholder="Find a blog..."
                  className="w-full pl-8 md:pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
          </div>

          {/* MOBILE: Row for Status & Categories */}
          <div className="grid grid-cols-2 gap-3 lg:block lg:space-y-6">
            
            {/* Status Filter */}
            <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 md:mb-2 block">Status</label>
              
              <div className="relative" ref={statusRef}>
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-700 font-medium text-left flex items-center justify-between"
                >
                  <span className="truncate">
                      {statusOptions.find(opt => opt.value === selectedStatus)?.label || selectedStatus}
                  </span>
                  <svg className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isStatusOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[120px]">
                    <ul className="py-1">
                      {statusOptions.map((opt) => (
                        <li key={opt.value}>
                          <button
                            onClick={() => { setSelectedStatus(opt.value); setIsStatusOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs md:text-sm hover:bg-gray-50 ${selectedStatus === opt.value ? "text-blue-600 font-medium" : "text-gray-700"}`}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-1 md:mb-3">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Category</label>
              </div>
              
              <div className="relative" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-700 font-medium text-left flex items-center justify-between"
                >
                  <span className="truncate">{selectedCategory}</span>
                  <svg className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCategoryOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-48 overflow-y-auto min-w-[120px]">
                    <ul className="py-1">
                      {categories.map(cat => (
                        <li key={cat}>
                          <button
                            onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs md:text-sm hover:bg-gray-50 ${selectedCategory === cat ? "text-blue-600 font-medium" : "text-gray-700"}`}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <div className="flex-1 min-w-0">
          
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <BlogTable 
              blogs={paginated} 
              onView={onViewBlog} 
              onEdit={onEditBlog} 
              onDelete={deleteBlog}
            />
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
             {paginated.map((b) => (
                <div key={b.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                   <div className="flex justify-between items-start mb-1">
                     <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2">{b.title}</h3>
                     <span className={`flex-shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                       b.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                     }`}>
                       {b.status}
                     </span>
                   </div>
                   
                   <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                      {b.author || "Unknown"}
                   </p>

                   <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                      <button onClick={() => onViewBlog(b.id)} className="py-1 rounded border border-blue-200 text-blue-600 bg-blue-50 text-xs font-medium">View</button>
                      <button onClick={() => onEditBlog(b.id)} className="py-1 rounded border border-yellow-200 text-yellow-600 bg-yellow-50 text-xs font-medium">Edit</button>
                      <button onClick={() => deleteBlog(b.id)} className="py-1 rounded border border-red-200 text-red-600 bg-red-50 text-xs font-medium">Delete</button>
                   </div>
                </div>
             ))}
          </div>

          {totalPages > 1 && <Pagination page={page} setPage={setPage} total={totalPages} />}
          
          {filtered.length === 0 && (
             <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No blogs found.</p>
                <button onClick={() => {setSearch(""); setSelectedCategory("All"); setSelectedStatus("All");}} className="text-blue-500 text-xs mt-2 hover:underline">Clear Filters</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}