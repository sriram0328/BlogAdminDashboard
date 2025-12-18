import useBlogs from "../hooks/useBlogs";

export default function ViewBlog({ blogId, onBack }) {
  const { blogs } = useBlogs();
  const blog = blogs.find((b) => b.id === blogId);

  // Icons component helpers
  const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Blog post not found</h3>
        <p className="text-gray-500 mb-6">The blog you are looking for might have been deleted.</p>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <ArrowLeftIcon />
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Navigation & Status Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white"
        >
          <div className="group-hover:-translate-x-1 transition-transform duration-200">
            <ArrowLeftIcon />
          </div>
          Back to list
        </button>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            blog.status === "Published"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-yellow-50 text-yellow-700 border-yellow-200"
          }`}>
            {blog.status}
          </span>
        </div>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Hero Image Section */}
        {blog.image ? (
          <div className="relative w-full h-64 md:h-96 bg-gray-100">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
          </div>
        ) : (
           /* Fallback Pattern if no image */
          <div className="w-full h-32 md:h-48 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex items-center justify-center">
            <span className="text-blue-200/50 text-6xl font-bold uppercase tracking-widest select-none">
              Blog
            </span>
          </div>
        )}

        {/* Content Container */}
        <div className="px-6 py-8 md:px-12 md:py-10">
          
          {/* Header Info */}
          <div className="mb-8 border-b border-gray-100 pb-8">
            {blog.category && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-md">
                {blog.category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm md:text-base">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gray-100 rounded-full">
                    <UserIcon />
                  </div>
                  <span className="font-medium text-gray-900">{blog.author}</span>
                </div>
              )}
              
              {blog.publishDate && (
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-gray-100 rounded-full">
                    <CalendarIcon />
                  </div>
                  <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Body Text */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {blog.description}
          </div>

        </div>

        {/* Footer Meta */}
        <div className="bg-gray-50 px-6 py-4 md:px-12 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
          <span>ID: {blog.id}</span>
          <span>Last Updated: {new Date().toLocaleDateString()}</span>
        </div>

      </article>
    </div>
  );
}