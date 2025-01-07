import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDateToCustom} from '../utils/point.js';

const createDestinationItemTemplate = (destinations) =>
  destinations.map(({name}) =>
    `<option value="${name}"></option>`
  ).join('');

// const createEventItemTemplate = (offers, checkedType) =>
//   offers.map(({type}) =>
//     `<div class="event__type-item">
//       <input id="event-type-${type}-1" class="event__type-input  visually-hidden"  type="radio" name="event-type" value="${type}" ${checkedType === type ? 'checked' : ''}>
//       <label class="event__type-label  event__type-label--${type}"  for="event-type-${type}-1">${type}</label>
//     </div>`
//   ).join('');

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
          name="event-offer-${type}-${id}"
          ${isChecked}
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

  if (!offersByType.offers.length) {
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

function createEditFormTemplate(point, destinations, offers) {
  const {type, basePrice, dateFrom, dateTo} = point;
  const destination = destinations.find((currentDestination) =>
    currentDestination.id === point.destination);
  const {
    name,
    description,
    photos
  } = destination;

  const customStartDate = formatDateToCustom(dateFrom);
  const customEndDate = formatDateToCustom(dateTo);
  const photosTemplate = photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('');

  return `            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationItemTemplate(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${customStartDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${customEndDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
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

  constructor({point, destinations, offers, onFormSubmit}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#changeDestinationHandler);

  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parsePointToState(this._state));
  };

  #changeTypeHandler = (evt) => {
    if (evt.target.closest('input')) {
      this.updateElement({
        point: {...this._state.point}, type: evt.target.value
      });
    }
  };

  #changeDestinationHandler = (evt) => {
    this.updateElement({
      point: {...this._state.point}, destination: evt.target.value
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}

