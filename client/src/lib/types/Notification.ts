type NotificationSlice = {
  data: {
    conmunity: any[];
    individual: any[];
  };
  activeTab: "community" | "individual";
  loading: boolean;
  error: boolean;
};
