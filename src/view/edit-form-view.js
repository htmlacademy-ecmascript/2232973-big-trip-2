import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDateToCustom, convertToISO} from '../utils/point.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const createDestinationItemTemplate = (destinations) =>
  destinations.map(({name}) =>
    `<option value="${name}"></option>`
  ).join('');

const createOfferItemTemplate = (offersByType, point, type) =>
  offersByType.offers.map(({id, title, price}) => {
    const isChecked = point.offers.includes(id)
      ? 'checked'
      : '';

    return (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          data-offer-id="${id}"
          type="checkbox"
          name="event-offer-${type}-${id}
          value="${id}"
          ${isChecked}
          ${point.isDisabled ? 'disabled' : ''}
        />
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join('');

const createOffersContainerTemplate = (offers, point, type) => {
  const offersByType = offers.find((offer) => offer.type === type);

  if (!offersByType) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOfferItemTemplate(offersByType, point, type)}
      </div>
    </section>`
  );
};

function createEditFormTemplate(point, destinations, offers, isCreating) {
  const {type, basePrice, dateFrom, dateTo, isDisabled, isSaving, isDeleting} = point;
  const destination = destinations.find((currentDestination) =>
    currentDestination.id === point.destination);

  const {
    name = '',
    description = '',
    pictures = []
  } = destination || {};


  const customStartDate = formatDateToCustom(dateFrom);
  const customEndDate = formatDateToCustom(dateTo);
  const photosTemplate = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

  const getEventTypeTemplate = (eventType) => {
    const isChecked = type === eventType ? 'checked' : '';
    return `
      <div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${isChecked}>
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
      </div>
    `;
  };
  const eventTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const eventTypeTemplates = eventTypes.map(getEventTypeTemplate).join('');

  let resetButtonText;
  if (isDeleting) {
    resetButtonText = 'Deleting...';
  } else if (isCreating) {
    resetButtonText = 'Cancel';
  } else {
    resetButtonText = 'Delete';
  }


  return `            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden"
                    id="event-type-toggle-1"
                    type="checkbox"
                    ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypeTemplates}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination"
                    id="event-destination-1"
                    type="text"
                    name="event-destination"
                    value="${name}"
                    list="destination-list-1"
                    ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1">
                      ${createDestinationItemTemplate(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time"
                    id="event-start-time-1"
                    type="text"
                    name="event-start-time"
                    value="${isCreating ? '' : customStartDate}"
                    ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time"
                    id="event-end-time-1"
                    type="text"
                    name="event-end-time"
                    value="${isCreating ? '' : customEndDate}"
                    ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price"
                    id="event-price-1"
                    type="number"
                    name="event-price"
                    value="${he.encode(String(basePrice))}"
                    ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue"
                  type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn"
                  type="reset" ${isDisabled ? 'disabled' : ''}>${resetButtonText}</button>
                  ${!isCreating ? `
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>` : ''}
                </header>
                <section class="event__details">
                  ${createOffersContainerTemplate(offers, point, type)}

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                      <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosTemplate}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class EditFormView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleDiscardChanges = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #isCreating = false;

  constructor({point, destinations, offers, isCreating, onFormSubmit, onDiscardChanges, onDeleteClick}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isCreating = isCreating;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDiscardChanges = onDiscardChanges;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#destinations, this.#offers, this.#isCreating);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  _restoreHandlers() {
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#handleDiscardChanges);
    }
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#changePriceHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    if (this.element.querySelector('.event__section--offers')) {
      this.element.querySelector('.event__section--offers')
        .addEventListener('change', this.#offerChangeHandler);
    }

    this.#setDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #changeTypeHandler = (evt) => {
    if (evt.target.closest('input')) {
      this.updateElement({
        type: evt.target.value
      });
    }
  };

  #changeDestinationHandler = (evt) => {
    const currentDestination = this.#destinations
      .find((destination) => destination.name === evt.target.value);

    if (!currentDestination) {
      return;
    }

    this.updateElement({
      destination: currentDestination.id
    });
  };

  #setDatepicker() {
    const [dateFromEl, dateToEl] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromEl,
      {
        ...commonConfig,
        defaultDate: this.#isCreating ? '' : this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo || ''
      }
    );

    this.#datepickerTo = flatpickr(
      dateToEl,
      {
        ...commonConfig,
        defaultDate: this.#isCreating ? '' : this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom || ''
      }
    );
  }

  #dateFromCloseHandler = ([userDate]) => {
    const isoDate = convertToISO(userDate);
    this._setState({ dateFrom: isoDate });
    this.#datepickerTo.set('minDate', isoDate);
  };

  #dateToCloseHandler = ([userDate]) => {
    const isoDate = convertToISO(userDate);
    this._setState({ dateTo: isoDate });
    this.#datepickerFrom.set('maxDate', isoDate);
  };

  #offerChangeHandler = (evt) => {
    const currentOffer = evt.target.dataset.offerId;

    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, currentOffer]
      });
    } else {
      this._setState({
        offers: this._state.offers.filter((offer) => offer !== currentOffer)
      });
    }
  };


  #changePriceHandler = (evt) => {
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}

