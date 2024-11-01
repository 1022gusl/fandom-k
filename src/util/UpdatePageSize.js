export const updatePageSize = (setCursor, setPageSize) => {
  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setPageSize(16);
    } else if (window.innerWidth <= 1199 && window.innerWidth > 745) {
      setPageSize(10);
    } else if (window.innerWidth <= 744 && window.innerWidth > 411) {
      setPageSize(8);
    } else if (window.innerWidth <= 410 && window.innerWidth > 374) {
      setPageSize(4);
    } else {
      setPageSize(1000);
      setCursor(0);
    }
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
};
