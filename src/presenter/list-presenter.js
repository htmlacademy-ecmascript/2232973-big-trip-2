import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view.js';
import DestinationPointView from '../view/destination-point-view.js';
import {render, replace} from '../framework/render.js';

export default class ListPresenter {
  #listComponent = new ListView();

  #listContainer = null;
  #pointsModel = null;
  #listPoints = [];
  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#renderList();
  }

  #renderList() {
    this.#listPoints = [...this.#pointsModel.points];
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }

  #renderPoint(point) {
    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };
    const pointComponent = new DestinationPointView({
      point,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeydownHandler);
      }
    });
    const pointEditComponent = new EditFormView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
