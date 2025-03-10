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

// Hàm này sẽ trả về một phần tử ngẫu nhiên từ mảng đầu vào
// Ví dụ: getRandomItem([1, 2, 3, 4, 5]) => 3
export function getRandomItem<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Mảng không được rỗng.");
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const formatStringForURL = (str: string, result: string) => {
  return str.replace(/\s+/g, result);
};
