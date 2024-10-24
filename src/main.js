import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListPresenter from './presenter/list-presenter.js';
import {render} from './render.js';
import PointsModel from './model/points-model.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

// const listPresenter = new ListPresenter({listContainer: sortContainer});

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({
  listContainer: sortContainer,
  pointsModel
});

render(new FilterView(), filterContainer);
render(new SortView(), sortContainer);

listPresenter.init();

