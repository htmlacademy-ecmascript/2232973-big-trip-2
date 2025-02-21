import { UpdateType } from '../const';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #pointsApiService = null;
  #offers = [];
  #hasError = false;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  get hasError() {
    return this.#hasError;
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type)?.offers || [];
  }

  getOffersById(id) {
    return this.#offers.find((offer) => offer.id === id);
  }
}
