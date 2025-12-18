export const validateImage = (file) => {
  if (!file) return false;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    alert("Only JPG or PNG allowed");
    return false;
  }

  if (file.size > 1024 * 1024) {
    alert("Image must be under 1MB");
    return false;
  }

  return true;
};
