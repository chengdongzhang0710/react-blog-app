import React from "react";
import LoginStore from "@/store/login.Store";
import UserStore from "@/store/user.Store";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
  }
}

const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
