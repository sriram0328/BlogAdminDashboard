Here is the updated and detailed `README.md` file, tailored to match your specific project structure and the features we implemented.

```markdown
# 📋 Blog Admin Dashboard

This project is a complete blog management system featuring a clean, responsive admin interface. It implements full CRUD operations, advanced filtering, persistent pagination, image handling, and a soft-delete mechanism with auto-purge capabilities.

---

## ✨ Features Implemented

### Core Features ✅
* **Responsive Admin Layout:** Custom-built Sidebar (mobile drawer + desktop static), sticky Navbar with glassmorphism, and a responsive main content area.
* **CRUD Operations:** Fully functional Create, Read, Update, and Delete flows for blog posts.
* **Blog Fields:** Support for Title, Description, Category, Author, Cover Image, Publish Date, and Status.
* **Pagination:** Custom pagination component (5 items per page) that persists state across reloads.
* **Search & Filters:** Real-time search by title, plus dedicated filters for **Category** and **Status** (Published/Draft).
* **Image Handling:** Drag-and-drop support, JPG/PNG validation, max 1MB size enforcement, and instant preview.
* **Dashboard Overview:** Visual statistics for Total Posts, Published, and Drafts, plus a "Recent Activity" feed.

### Medium Brain Task: Soft Delete + Auto Purge ✅
* **Implementation:** Located in `src/hooks/useBlogs.js`.
* **Logic:** Blogs marked as deleted are hidden from the main view but stored with a `deletedAt` timestamp.
* **Auto-purge:** On initialization, the app checks for blogs deleted more than 7 days ago and permanently removes them from `localStorage`.
    ```javascript
    // Auto purge logic in useBlogs.js
    const cleaned = stored.filter(
      (b) => !b.deleted || now - b.deletedAt < 7 * 24 * 60 * 60 * 1000
    );
    ```

### Quick Logic Tasks ✅
* **Persistent State:** Pagination page number and "rows per page" preferences are saved to `localStorage`.
* **Form Safety:** "Save Blog" button is disabled until changes are detected.
* **Navigation Safety:** Browser warning prompt if trying to close/reload the page with unsaved form changes.

---

## 🏗️ Folder Architecture

```bash
blog-admin-dashboard/
├── src/
│   ├── assets/               # Static assets (images, icons)
│   ├── components/
│   │   ├── BlogForm.jsx      # Reusable form for Creating and Editing blogs
│   │   ├── BlogTable.jsx     # Reusable table component (Desktop view)
│   │   ├── Navbar.jsx        # Top navigation with profile and mobile toggle
│   │   ├── Pagination.jsx    # Pagination controls
│   │   └── Sidebar.jsx       # Responsive navigation sidebar
│   ├── hooks/
│   │   └── useBlogs.js       # Custom hook for centralized blog state & persistence
│   ├── pages/
│   │   ├── Blogs.jsx         # Main listing page with Search, Filters & Mobile Cards
│   │   ├── CreateEditBlog.jsx # Shared page for creating new or editing existing posts
│   │   ├── Dashboard.jsx     # Analytics overview and recent activity feed
│   │   └── ViewBlog.jsx      # Read-only detail view for a specific blog
│   ├── utils/
│   │   ├── imageValidation.js # Helper for validating file type/size
│   │   └── storage.js        # Wrappers for localStorage operations
│   ├── App.jsx               # Main router and layout orchestrator
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind imports and custom utility classes
├── public/                   # Public static files
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite build configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation

```

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18+
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (Mobile-first responsive design)
* **Icons:** Heroicons (SVG)
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`, custom hooks)
* **Persistence:** Browser `localStorage` (No backend required)

---

## 📦 Installation & Setup

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn

### Steps to Run

1. **Clone the repository**
```bash
git clone [https://github.com/sriram0328/BlogAdminDashboard.git](https://github.com/sriram0328/BlogAdminDashboard.git)
cd BlogAdminDashboard

```


2. **Install dependencies**
```bash
npm install

```


3. **Start the development server**
```bash
npm run dev

```


4. **Open in browser**
Navigate to `http://localhost:5173` to view the app.

---

## 🎯 Feature Demonstrations

### 1. Dashboard

* **Overview:** Shows cards for Total, Published, and Draft posts.
* **Responsive:** Stacks cards vertically on mobile, expands to 3 columns on desktop.
* **Recent Activity:** Shows the 5 most recent posts (Table view on Desktop, Card stack on Mobile).

### 2. Blog Management (CRUD)

* **Create:** Accessible via sidebar or "New Post" button. Validates inputs before saving.
* **Read:** "All Blogs" page features a responsive table for desktop and a card layout for mobile devices.
* **Update:** Edit existing blogs with pre-filled data.
* **Delete:** Soft-delete functionality with confirmation dialog.

### 3. Advanced Filtering

* **Search:** Instant text search across blog titles.
* **Category Filter:** Dropdown to filter by specific categories (e.g., Technology, Lifestyle).
* **Status Filter:** Filter by "Published" or "Draft" status.
* **Mobile Optimized:** Filters collapse into a neat UI on smaller screens to save space.

### 4. Data Persistence

* **Mechanism:** All data is serialized and stored in `localStorage` under the key `"blogs"`.
* **Structure:**
```javascript
{
  id: 1702816234856,
  title: "Future of AI",
  category: "Technology",
  status: "Published",
  deleted: false,
  // ... other fields
}

```



---

## 🎨 UI/UX Highlights

* **Glassmorphism Navbar:** Sticky top navbar with backdrop blur effect.
* **Mobile-First Design:** * Hidden sidebar with hamburger menu.
* Tables transform into card layouts on small screens.
* Touch-friendly buttons and inputs (min-height 44px).


* **Visual Feedback:** * Hover effects on rows and buttons.
* Color-coded status badges (Green for Published, Yellow for Draft).
* Empty states with helpful illustrations/icons.



---

## 🧪 Testing

### Image Validation

1. Try uploading a `.gif` file → Alert: "Only JPG or PNG allowed".
2. Try uploading a file > 1MB → Alert: "Image must be under 1MB".
3. Upload a valid JPG → Preview appears instantly.

### Soft Delete & Recovery

1. Delete a blog post.
2. Check `localStorage` → `deleted` flag is set to `true`.
3. (Simulation) Manually adjust `deletedAt` in storage to 8 days ago and refresh → Blog is permanently removed.

---

## 🚀 Deployment

To build for production:

```bash
npm run build

```

The output will be in the `dist/` folder, ready to be deployed to Vercel, Netlify, or GitHub Pages.

---

## 📝 License

This project is open-source and available for personal and educational use.

```

```
