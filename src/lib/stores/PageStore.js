import { action, toJS, observable } from "mobx";

export default class PageStore {
  /**
   * The current page
   * 
   */
  @observable page = "home";

  @action
  setPage = (page) => {
    this.page = page;
  }
}
