import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListPresenter from './presenter/list-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({
  listContainer: sortContainer,
  pointsModel
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), filterContainer);
render(new SortView(), sortContainer);

listPresenter.init();

