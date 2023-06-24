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

  deleteArticle = async id => {
    await http.delete(`/mp/articles/${ id }`);
  };
}

export default ArticleStore;
