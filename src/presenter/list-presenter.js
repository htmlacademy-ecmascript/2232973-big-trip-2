import ListView from '../view/list-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import HeaderInfoPresenter from './header-info-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 250,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {
  #listContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #filterModel = null;

  #listComponent = new ListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noPointsComponent = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #headerInfoPresenter = null;
  #currentSortType = SortType.DAY;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({listContainer, filterContainer, pointsModel, destinationModel, offersModel, filterModel, onNewPointDestroy}) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationModel,
      offersModel: this.#offersModel,
      listContainer: this.#listComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#headerInfoPresenter = new HeaderInfoPresenter({
      container: this.#filterContainer,
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationModel,
      offersModel: this.#offersModel
    });

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

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#headerInfoPresenter.init(this.#pointsModel.points);
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
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);
    remove(this.#loadingComponent);
    remove(this.#listComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterModel.filter
    });

    render(this.#noPointsComponent, this.#listContainer);
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
  }
}
