import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import AddPointView from './view/add-point-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic 123qwassawq321';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const filterContainer = document.querySelector('.trip-main');
const dataContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const listPresenter = new ListPresenter({
  listContainer: dataContainer,
  filterContainer,
  pointsModel,
  destinationModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new AddPointView({
  onClick: handleNewPointClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointClick() {
  newPointButtonComponent.element.disabled = true;
  listPresenter.createPoint();
}

render(newPointButtonComponent, filterContainer);

filterPresenter.init();
listPresenter.init();
pointsModel.init();

