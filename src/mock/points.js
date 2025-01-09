// import { getRandomArrayElement } from '../utils/common.js';

export const mockPoints = [
  {
    id: 'point1',
    basePrice: 300,
    dateFrom: '2024-11-22T08:00:00.000Z',
    dateTo: '2024-11-22T11:30:00.000Z',
    destination: 'pa',
    isFavorite: true,
    offers: [
      'f1',
      'f2'
    ],
    type: 'flight',
  },
  {
    id: 'point2',
    basePrice: 260,
    dateFrom: '2024-12-23T14:00:00.000Z',
    dateTo: '2024-12-23T14:30:00.000Z',
    destination: 'lo',
    isFavorite: false,
    offers: [
      't1',
      't2'
    ],
    type: 'taxi',
  },
  {
    id: 'point3',
    basePrice: 200,
    dateFrom: '2024-12-26T08:00:00.000Z',
    dateTo: '2024-12-27T22:00:00.000Z',
    destination: 'am',
    isFavorite: true,
    offers: [],
    type: 'check-in',
  }
];

// function getOffersByType(type) {
//   return mockOffers.find((offer) => offer.type === type).offers;
// }

// function getRandomDestination() {
//   return getRandomArrayElement(mockDestinations);
// }

// function getRandomPoint() {
//   return getRandomArrayElement(mockPoints);
// }


