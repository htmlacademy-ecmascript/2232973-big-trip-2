import { mockPoints } from '../mock/points.js';
// import { POINTS_COUNT } from '../const.js';

export default class PointsModel {
  #points = mockPoints;

  get points() {
    return this.#points;
  }
}
