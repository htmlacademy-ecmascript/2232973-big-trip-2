import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import { generateFilter } from './mock/filter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const dataContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();

const listPresenter = new ListPresenter({
  listContainer: dataContainer,
  pointsModel,
  destinationModel,
  offersModel
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), filterContainer);

listPresenter.init();

