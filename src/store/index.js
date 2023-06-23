import LoginStore from "@/store/login.Store";
import React from "react";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
  }
}

const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
