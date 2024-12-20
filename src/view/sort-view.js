import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-day"
        data-sort-type="${SortType.DAY}"
        ${currentSortType === SortType.DAY ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-event"
        data-sort-type="${SortType.EVENT}"
        ${currentSortType === SortType.EVENT ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-time"
        data-sort-type="${SortType.TIME}"
        ${currentSortType === SortType.TIME ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-price"
        data-sort-type="${SortType.PRICE}"
        ${currentSortType === SortType.PRICE ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-offer"
        data-sort-type="${SortType.OFFERS}"
        ${currentSortType === SortType.OFFERS ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
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
