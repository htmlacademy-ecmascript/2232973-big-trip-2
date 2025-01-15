import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
// import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const dataContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const listPresenter = new ListPresenter({
  listContainer: dataContainer,
  pointsModel,
  destinationModel,
  offersModel
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel
});

filterPresenter.init();
listPresenter.init();

