import { mockOffers } from '../mock/offers.js';

export default class OffersModel {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    const allOffers = this.#offers;
    return allOffers.filter((offer) => offer.type === type);
  }

  getOfferById(id) {
    return this.#offers.find((offer) => offer.id === id);
  }
}
