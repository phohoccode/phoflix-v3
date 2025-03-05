export const generateUrlImage = (url: string) => {
  if (url.includes("https://phimimg.com")) {
    return url;
  } else {
    return `https://phimimg.com/${url}`;
  }
};
