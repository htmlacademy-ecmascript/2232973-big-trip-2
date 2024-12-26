import { getRandomPoint } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { POINTS_COUNT } from '../const.js';

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, () => getRandomPoint());
  #offers = mockOffers;
  #destinations = mockDestinations;
  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getOffersByType(type) {
    const allOffers = this.#offers;
    return allOffers.filter((offer) => offer.type === type);
  }

  getOfferById(id) {
    return this.#offers.find((offer) => offer.id === id);
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
