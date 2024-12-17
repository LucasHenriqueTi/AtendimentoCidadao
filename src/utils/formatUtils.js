export const formatFileName = (url) => {
  const filename = url.split("/").pop();
  return filename.replace(/^\d+_/, "").replace(/_/g, " ").replace(".pdf", "");
};
