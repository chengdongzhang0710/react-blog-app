import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class ArticleStore {
  list = [];
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadList = async params => {
    const res = await http.get("/mp/articles", { params });
    const { results, total_count } = res.data;
    this.list = results;
    this.count = total_count;
  };

  getArticle = async id => {
    return await http.get(`/mp/articles/${ id }`);
  };

  uploadArticle = async params => {
    await http.post("/mp/articles?draft=false", params);
  };

  modifyArticle = async (id, params) => {
    await http.put(`/mp/articles/${ id }?draft=false`, params);
  };

  deleteArticle = async id => {
    await http.delete(`/mp/articles/${ id }`);
  };
}

export default ArticleStore;
