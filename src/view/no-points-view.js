import AbstractView from '../framework/view/abstract-view';
import { FilterText } from '../const';

function createNoPointsTemplate(filterType) {
  return `<p class="trip-events__msg">
  ${FilterText[filterType.toUpperCase()]}</p>`;
}

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
