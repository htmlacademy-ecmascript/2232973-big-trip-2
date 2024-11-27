import ListView from '../view/list-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();
  #sortComponent = new SortView();
  #noPointsComponent = new NoPointsView();

  #listPoints = [];
  #pointPresenters = new Map();

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    this.#renderList();
  }

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
  };

  #renderSort() {
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(from, to) {
    this.#listPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);

    if (this.#listPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints(0, this.#listPoints.length);
    this.#renderSort();
  }
}
