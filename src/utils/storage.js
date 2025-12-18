const KEY = "blogs";

export const getBlogs = () => {
  try {
    const blogs = JSON.parse(localStorage.getItem(KEY)) || [];
    console.log("Retrieved blogs from localStorage:", blogs);
    return blogs;
  } catch (error) {
    console.error("Error getting blogs from localStorage:", error);
    return [];
  }
};

export const saveBlogs = (blogs) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(blogs));
    console.log("Saved blogs to localStorage:", blogs);
  } catch (error) {
    console.error("Error saving blogs to localStorage:", error);
  }
};
