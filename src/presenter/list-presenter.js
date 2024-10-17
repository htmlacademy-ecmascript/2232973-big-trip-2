import ListView from '../view/list-view.js';
import CreateFormView from '../view/create-form-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.listComponent, this.listContainer);
    render(new CreateFormView(), this.listComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new DestinationPointView(), this.listComponent.getElement());
    }
  }
}
