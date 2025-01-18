import {remove, render, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  // Изменить
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;
  // Изменить
  constructor({pointsModel, destinationsModel, offersModel, listContainer, onDataChange, onDestroy}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointListContainer = listContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }
    // Изменить
    this.#pointEditComponent = new EditFormView({
      point: this.#pointsModel.newPoint,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });
    console.log(this.#pointListContainer)
    render(this.#pointEditComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);
    console.log('Rendering EditFormView', this.#pointEditComponent, this.#pointListContainer);


    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    if (!point.destination) {
      this.destroy();
      return;
    }

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: 'new', ...point}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
