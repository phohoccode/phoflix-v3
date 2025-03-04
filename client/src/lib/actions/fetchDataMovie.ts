"use client";

export const fetchSlideShow = async () => {
  try {
    const response = await fetch(
      "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
