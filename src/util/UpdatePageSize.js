export const updatePageSize = (setCursor, setPageSize) => {
  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setPageSize(16);
    } else if (window.innerWidth >= 745) {
      setPageSize(8);
    } else {
      setPageSize(1000);
      setCursor(0);
    }
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
};
