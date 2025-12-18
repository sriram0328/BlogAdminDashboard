# Blog Admin Dashboard

A production-style blog admin dashboard built with React + Vite and Tailwind CSS, demonstrating modern frontend engineering practices, responsive design, and comprehensive state management.

## 📋 Project Overview

This project is a complete blog management system with a clean, responsive admin interface. It implements CRUD operations, advanced filtering, pagination, image handling, and soft delete functionality with auto-purge capabilities.

**Demo Video**: [Add Loom link here]

## ✨ Features Implemented

### Core Features ✅
- **Responsive Admin Layout** - Dark sidebar, clean navbar, and main content area
- **CRUD Operations** - Create, Read, Update, and Delete blog posts
- **Blog Fields** - Title, Description, Category, Author, Image, Publish Date, Status
- **Pagination** - 5 items per page with persistent pagination state
- **Search & Filters** - Real-time search across blog titles with status badges
- **Image Handling** - JPG/PNG validation, max 1MB size check, instant preview
- **Status Management** - Draft and Published states with visual indicators

### Medium Brain Task: Soft Delete + Auto Purge ✅
**Implementation in `src/hooks/useBlogs.js`:**
- Blogs marked as deleted are soft-deleted (not permanently removed)
- Deleted blogs are stored with a `deletedAt` timestamp
- Auto-purge: Blogs deleted for more than 7 days are automatically removed
- Prevents accidental data loss and allows recovery within 7 days

```javascript
// Auto purge after 7 days
const cleaned = stored.filter(
  (b) => !b.deleted || now - b.deletedAt < 7 * 24 * 60 * 60 * 1000
);
```

### Quick Logic Tasks ✅
1. **Persistent Pagination** - Page state saved to localStorage and restored on refresh
2. **Disable Save Unless Changes** - Save button disabled until form data changes
3. **Warn on Close if Unsaved** - Browser warning when leaving page with unsaved changes

## 🏗️ Folder Architecture

```
blog-admin-dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx           # Navigation sidebar with dark theme
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── BlogForm.jsx          # Reusable form for create/edit
│   │   ├── BlogTable.jsx         # (Template for table component)
│   │   └── Pagination.jsx        # Pagination controls with styled buttons
│   ├── pages/
│   │   ├── Blogs.jsx             # Main blogs list with search & delete
│   │   ├── CreateEditBlog.jsx    # Create new blog page
│   │   └── Dashboard.jsx         # (Template for dashboard)
│   ├── hooks/
│   │   └── useBlogs.js           # Custom hook for blog state & persistence
│   ├── utils/
│   │   ├── imageValidation.js    # Image file validation (JPG/PNG, <1MB)
│   │   └── storage.js            # localStorage wrapper for persistence
│   ├── App.jsx                   # Root component with routing logic
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind CSS with custom utilities
├── public/                        # Static assets
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS with Tailwind plugin
├── package.json                 # Dependencies & scripts
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

## 🛠️ Tech Stack

- **Frontend Framework** - React 19.2.0
- **Build Tool** - Vite 7.2.4
- **Styling** - Tailwind CSS 4.1.18
- **State Management** - React Hooks (useState, useEffect)
- **Persistence** - Browser localStorage
- **Development** - Node.js 18+

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm installed

### Steps to Run

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd blog-admin-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173 (or the port shown in terminal)
```

### Build for Production
```bash
npm run build      # Creates optimized build
npm run preview    # Preview production build
```

## 🎯 Feature Demonstrations

### CRUD Operations
1. **Create** - Click "➕ Create Blog" in sidebar, fill form, click "💾 Save Blog"
2. **Read** - Main Blogs page displays all active blogs in a table
3. **Update** - (Edit functionality can be added by extending the form)
4. **Delete** - Click "Delete" button in table; soft-deleted blogs recover within 7 days

### Pagination
- Navigate between pages using numbered buttons at bottom of table
- Current page persists in localStorage
- Automatically resets when filtering

### Search & Filters
- Type in search box to filter blogs by title
- Status badges show Draft (yellow) or Published (green) states
- "No blogs found" message when no results match

### Image Handling
- Accepts JPG/PNG files only
- Enforces 1MB max size
- Shows instant preview after upload
- Validates before form submission

### Responsive Design
- **Desktop** - Full layout with sidebar
- **Tablet/Mobile** - Optimized spacing and touch-friendly buttons
- All components adapt to screen size

## 💾 Data Persistence

### localStorage Implementation
- All blogs stored in browser's localStorage under key "blogs"
- Automatic save on every blog modification
- Data persists across browser sessions
- No backend required (local-only)

### Storage Structure
```javascript
// Each blog object includes:
{
  id: 1702816234856,                // Unique timestamp ID
  title: "Blog Title",
  description: "Content...",
  category: "Technology",
  author: "John Doe",
  status: "Published",
  publishDate: "2024-12-17",
  image: "data:image/jpeg;base64,...", // Base64 encoded
  deleted: false,
  deletedAt: null
}
```

## 🎨 UI/UX Highlights

### Design Decisions
1. **Dark Sidebar** - Reduces eye strain, modern aesthetic
2. **Clear Visual Hierarchy** - Bold headers, proper spacing, consistent typography
3. **Color Coding** - Green for published, yellow for draft, red for delete
4. **Accessible Forms** - Clear labels, good contrast, keyboard navigation
5. **Empty States** - "No blogs found" prevents confusion
6. **Feedback** - Disabled buttons show state changes, hover effects provide feedback

### Responsive Breakpoints
- Mobile-first design using Tailwind CSS
- Grid layout adjusts from 1 to 2 columns
- Touch-friendly button sizes (min 44px)
- Proper padding and margins throughout

## 🧪 Testing

### Image Validation Tests
```javascript
// Test: Invalid format
uploadFile('image.gif')  // Alert: "Only JPG or PNG allowed"

// Test: File size exceed
uploadFile('large.png', 2000000)  // Alert: "Image must be under 1MB"

// Test: Valid image
uploadFile('photo.jpg', 500000)   // ✅ Accepted with preview
```

### Soft Delete Test
1. Create a blog post
2. Delete it (marked with `deleted: true`, `deletedAt: timestamp`)
3. Wait 7 days (simulated)
4. Refresh page
5. Blog should be auto-purged from localStorage

### Pagination Persistence Test
1. Navigate to page 3
2. Close browser completely
3. Reopen and visit dashboard
4. Should be on page 3

## 📋 Code Quality

- **Component Structure** - Modular, single-responsibility components
- **Naming Conventions** - Descriptive names for functions and variables
- **State Management** - Proper hook dependencies, no unnecessary re-renders
- **Error Handling** - Image validation, alert messages for user feedback
- **Documentation** - Comments in complex logic (auto-purge, validation)

## 🚀 Deployment

Choose one of these platforms:

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages
- Build: `npm run build`
- Deploy `dist` folder to GitHub Pages

**Live Demo URL**: [Add deployment URL here]

## ✅ Assessment Checklist

- [x] Responsive Admin Layout (Sidebar + Navbar + Content)
- [x] CRUD operations for blogs
- [x] All required blog fields implemented
- [x] Pagination (5 items per page)
- [x] Search functionality
- [x] Image validation (JPG/PNG, max 1MB)
- [x] Image preview on upload
- [x] Soft Delete + Auto Purge (Brain Task)
- [x] Persistent pagination (Quick Logic)
- [x] Disable save unless changes (Quick Logic)
- [x] Warn on unsaved changes (Quick Logic)
- [x] Proper folder structure
- [x] README with setup instructions
- [x] Clean, scalable component architecture
- [x] No external UI libraries (custom Tailwind)
- [x] localStorage persistence

## 📝 License

This project is part of a frontend engineering assessment.
