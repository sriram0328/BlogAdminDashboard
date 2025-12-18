import BlogForm from "../components/BlogForm";
import useBlogs from "../hooks/useBlogs";

export default function CreateEditBlog({ setPage, blogId, isEdit, onBack }) {
  const { blogs, setBlogs } = useBlogs();
  const existingBlog = blogs.find((b) => b.id === blogId);

  const handleSubmit = (data) => {
    if (isEdit && existingBlog) {
      // Update existing blog
      const updatedBlogs = blogs.map((b) =>
        b.id === blogId
          ? {
              ...b,
              ...data,
              updated: Date.now()
            }
          : b
      );
      setBlogs(updatedBlogs);
      
      if (onBack) setTimeout(onBack, 50);
    } else {
      // Create new blog
      const newBlog = {
        ...data,
        id: Date.now(),
        deleted: false,
        deletedAt: null,
        created: Date.now()
      };
      setBlogs([...blogs, newBlog]);
      
      if (setPage) setTimeout(() => setPage("blogs"), 50);
    }
  };

  return (
    // ADDED PADDING: p-4 for mobile, p-8 for desktop
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      
      {/* NEW BACK BUTTON PLACEMENT */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors w-fit"
      >
        <div className="p-1 rounded-full group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </div>
        <span>Back to Blogs</span>
      </button>

      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          {isEdit ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          {isEdit 
            ? "Update your blog content, change status, or fix typos below."
            : "Share your thoughts with the world. Fill in the details below."
          }
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-gray-50/50 rounded-xl">
        <BlogForm 
          onSubmit={handleSubmit} 
          initialData={isEdit ? existingBlog : null}
          isEdit={isEdit}
          // Note: We don't pass onBack here anymore since we handle it above
        />
      </div>
    </div>
  );
}