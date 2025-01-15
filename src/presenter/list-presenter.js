import ListView from '../view/list-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort.js';
import {filter} from '../utils/filter.js';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #filterModel = null;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({listContainer, pointsModel, destinationModel, offersModel, filterModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return this.filteredPoints;
  }

  init() {
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearList();

    this.#clearSortComponent();
    this.#renderList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearSortComponent() {
    if (this.#sortComponent) {
      this.#sortComponent.element.remove();
      this.#sortComponent = null;
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      pointsModel: this.#pointsModel,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearList({resetSortType = false} = {}) {
    // const pointsCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);
    remove(this.#listComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);

    const points = this.points;
    const taskCount = points.length;

    if (taskCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
    //тут было много кода в примере
  }
}
