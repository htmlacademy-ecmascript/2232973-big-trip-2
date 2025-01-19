// import { getRandomArrayElement } from '../utils/common.js';

export const mockPoints = [
  {
    id: 'point1',
    basePrice: 300,
    dateFrom: '2025-01-10T08:00:00.000Z',
    dateTo: '2025-01-11T11:30:00.000Z',
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
    dateFrom: '2025-01-14T14:00:00.000Z',
    dateTo: '2025-01-20T14:30:00.000Z',
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
    dateFrom: '2025-01-26T08:00:00.000Z',
    dateTo: '2025-01-27T22:00:00.000Z',
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


