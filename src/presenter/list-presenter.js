import ListView from '../view/list-view.js';
import CreateFormView from '../view/create-form-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];
    render(this.listComponent, this.listContainer);
    render(new CreateFormView({point: this.listPoints[0]}), this.listComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new DestinationPointView({point: this.listPoints[i]}), this.listComponent.getElement());
    }
  }
}
