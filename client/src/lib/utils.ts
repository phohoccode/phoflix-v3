export const generateUrlImage = (url: string) => {
  if (url?.includes("https://phimimg.com")) {
    return url;
  } else {
    return `https://phimimg.com/${url}`;
  }
};

export const getPositionElement = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };
};

export const updateSearchParams = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key); // Xóa nếu rỗng
    }
  });

  return searchParams.toString(); // Trả về chuỗi query mới
};
