import React from "react";
import LoginStore from "@/store/login.Store";
import UserStore from "@/store/user.Store";
import ChannelStore from "@/store/channel.Store";
import ArticleStore from "@/store/article.Store";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.channelStore = new ChannelStore();
    this.articleStore = new ArticleStore();
  }
}

const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
