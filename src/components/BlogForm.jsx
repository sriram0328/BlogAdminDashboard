import { useEffect, useState } from "react";
// import { validateImage } from "../utils/imageValidation"; 

export default function BlogForm({ onSubmit, initialData, isEdit }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      category: "",
      author: "",
      status: "Draft",
      publishDate: "",
      image: ""
    }
  );

  const [changed, setChanged] = useState(false);
  const [preview, setPreview] = useState(initialData?.image || "");
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.image || "");
      setChanged(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setChanged(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setImageError("");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError("Only JPG or PNG files are allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      setImageError("Image must be under 1MB");
      return;
    }

    setImageError("");
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setForm({ ...form, image: reader.result });
      setChanged(true);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const warn = (e) => {
      if (changed) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [changed]);

  const submit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(form);
    
    alert("Blog saved successfully!");
    
    if (!isEdit) {
      setTimeout(() => {
        setForm({
          title: "",
          description: "",
          category: "",
          author: "",
          status: "Draft",
          publishDate: "",
          image: ""
        });
        setPreview("");
        setChanged(false);
        setImageError("");
      }, 50);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* REMOVED INTERNAL BACK BUTTON */}

      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
            <input 
              name="title" 
              placeholder="Enter blog title" 
              className={`input md:col-span-2 ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
              required 
              onChange={handleChange}
              value={form.title}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              name="author" 
              placeholder="Author Name" 
              className="input" 
              onChange={handleChange}
              value={form.author}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input 
              name="category" 
              placeholder="e.g. Technology" 
              className="input" 
              onChange={handleChange}
              value={form.category}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            placeholder="Write your content here..." 
            className={`input w-full min-h-32 ${
              errors.description ? "border-red-500 focus:ring-red-500" : ""
            }`}
            required 
            onChange={handleChange}
            value={form.description}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
            <input 
              type="date" 
              name="publishDate" 
              className="input" 
              onChange={handleChange}
              value={form.publishDate}
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              name="status" 
              className="input" 
              onChange={handleChange}
              value={form.status}
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors text-center">
            <label className="cursor-pointer block w-full h-full">
              <input 
                type="file" 
                accept="image/png,image/jpeg" 
                onChange={handleImage}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 <span className="text-blue-600 font-medium hover:underline">Click to upload</span>
                 <span className="text-gray-400 text-xs">PNG or JPG (Max 1MB)</span>
              </div>
            </label>
          </div>
          {imageError && <p className="text-red-500 text-sm mt-2">{imageError}</p>}
        </div>

        {preview && (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-medium text-gray-600">Preview:</p>
            <img src={preview} className="h-40 rounded-lg shadow-md border border-gray-200" alt="Preview" />
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={!form.title || !form.description}
            className={`px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 ${
              form.title && form.description
                ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isEdit ? "Update Blog" : "Save Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}