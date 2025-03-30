export const createReportMovie = async ({
  userId,
  movieSlug,
  description,
  title,
  movieName,
}: {
  userId: string;
  movieSlug: string;
  description: string;
  title: string;
  movieName: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reportMovie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieSlug,
          description,
          title,
          movieName,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating report:", error);
    return null;
  }
};
