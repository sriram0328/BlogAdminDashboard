import { useEffect, useState, useRef } from "react";
import { getBlogs, saveBlogs } from "../utils/storage";

export default function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const isInitializedRef = useRef(false);

  // Load blogs from localStorage on mount
  useEffect(() => {
    const loadBlogs = () => {
      const stored = getBlogs();
      const now = Date.now();

      // auto purge after 7 days
      const cleaned = stored.filter(
        (b) => !b.deleted || now - b.deletedAt < 7 * 24 * 60 * 60 * 1000
      );

      console.log("Initialized blogs from storage:", cleaned);
      setBlogs(cleaned);
      isInitializedRef.current = true;
    };

    if (!isInitializedRef.current) {
      loadBlogs();
    }

    // Also listen for storage changes (from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === "blogs") {
        console.log("Storage changed from another source");
        loadBlogs();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save blogs to localStorage whenever they change (but only after initialization)
  useEffect(() => {
    if (isInitializedRef.current) {
      console.log("Saving blogs to localStorage:", blogs);
      saveBlogs(blogs);
    }
  }, [blogs]);

  return { blogs, setBlogs };
}

