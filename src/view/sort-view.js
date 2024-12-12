import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


function createSortItemTemplate(sort, currentSortType) {

  return (
    `<div class="trip-sort__item  trip-sort__item--${sort}">
        <input id="sort-${sort}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sort}"
        data-sort-type="${sort}"
        ${currentSortType === sort ? 'checked' : ''}
        ${sort === SortType.OFFERS || sort === SortType.EVENT ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
      </div>`
  );
}

function createSortTemplate(currentSortType) {
  const sortItemsTemplate = Object.values(SortType)
    .map((sort) => createSortItemTemplate(sort, currentSortType))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${sortItemsTemplate}
      </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;

    this.element
      .querySelectorAll('.trip-sort__input')
      .forEach((input) => (input.checked = false));

    evt.target.checked = true;

    this.#handleSortTypeChange(sortType);
  };
}
