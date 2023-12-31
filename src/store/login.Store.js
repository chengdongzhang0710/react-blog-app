import { makeAutoObservable } from "mobx";
import { deleteToken, getToken, http, setToken } from "@/utils";

class LoginStore {
  token = getToken() || "";

  constructor() {
    makeAutoObservable(this);
  }

  login = async ({ mobile, code }) => {
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", { mobile, code });
    this.token = res.data.token;
    setToken(res.data.token);
  };

  logout = () => {
    this.token = "";
    deleteToken();
  };
}

export default LoginStore;
