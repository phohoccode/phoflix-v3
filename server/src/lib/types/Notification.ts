export type GetNotifications = {
  limit: number;
  type: "community" | "individual";
  userId?: string;
  afterTime?: number;
};

export type CreateNotification = {
  senderId: string;
  type: "community" | "individual";
  content: string;
  userId?: string | null;
  href?: string | null;
  image?: string | null;
};

