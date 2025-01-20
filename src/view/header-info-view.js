import { EVENT_DATE_FORMAT } from '../const.js';
import { humanizeEventDate } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate({title, dates, totalCost}) {
  const { startDate, endDate } = dates;
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${humanizeEventDate(startDate, EVENT_DATE_FORMAT)}&nbsp;&mdash;&nbsp;${humanizeEventDate(endDate, EVENT_DATE_FORMAT)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
  );
}

export default class HeaderInfoView extends AbstractView {
  #title = null;
  #dates = null;
  #totalCost = null;

  constructor({title, dates, totalCost}) {
    super();

    this.#title = title;
    this.#dates = dates;
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate({
      title: this.#title,
      dates: this.#dates,
      totalCost: this.#totalCost,
    });
  }

  updateData({title, dates, totalCost}) {
    this.#title = title;
    this.#dates = dates;
    this.#totalCost = totalCost;
    this.element.innerHTML = this.template;
  }
}
