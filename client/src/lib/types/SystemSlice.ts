type SystemSlice = {
  isOpenModalSearch: boolean;
  isOpenModalNotification: boolean;
  isShowAuthDialog: boolean;  
  typeAuth: "signin" | "signup" | "forgot-password";
  isOpenDrawer: boolean;
  windowWidth: number;
  loaded: boolean;
  lastScrollY: number;
  isVisiable: boolean;
};