import HeaderInfoView from '../view/header-info-view';
import { render, remove, RenderPosition } from '../framework/render';

export default class HeaderInfoPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #headerInfoComponent = null;
  #offers = null;

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #getTitle(points) {
    const sortedPoints = [...points].sort((currentPoint, nextPoint) => currentPoint.dateFrom - nextPoint.dateFrom);
    const firstPoint = sortedPoints[0];
    const lastPoint = sortedPoints[sortedPoints.length - 1];

    let routeTitle = '';
    if (sortedPoints.length > 3) {
      const firstName = this.#destinationsModel.getDestinationById(firstPoint.destination);
      const lastName = this.#destinationsModel.getDestinationById(lastPoint.destination);
      routeTitle = `${firstName.name} — ... — ${lastName.name}`;
    } else {
      routeTitle = sortedPoints.map((point) => {
        const destination = this.#destinationsModel.getDestinationById(point.destination);
        return destination ? destination.name : '';
      }).join(' — ');
    }

    return {
      title: routeTitle,
    };
  }

  #getDates(points) {
    const sortedPoints = [...points].sort((currentPoint, nextPoint) => currentPoint.dateFrom - nextPoint.dateFrom);
    if (points.length === 0) {
      return {
        startDate: null,
        endDate: null
      };
    }

    return {
      startDate: sortedPoints[0].dateFrom,
      endDate: sortedPoints[points.length - 1].dateTo
    };
  }

  #getTotalPrice(points) {
    return points.reduce((sum, point) => {
      sum += point.basePrice + this.#getOffersPrice(point.offers, point.type);
      return sum;
    }, 0);
  }

  #getOffersPrice(selectedOffers, type) {
    const offers = this.#offers.find((item) => item.type === type)?.offers || [];
    return offers.reduce((sum, item) => {
      if (selectedOffers.includes(item.id)) {
        sum += item.price;
      }
      return sum;
    }, 0);
  }

  init(points) {
    if (!points || points.length === 0) {
      if (this.#headerInfoComponent) {
        remove(this.#headerInfoComponent);
        this.#headerInfoComponent = null;
      }
      return;
    }

    this.#offers = this.#offersModel.offers;

    if (!this.#headerInfoComponent) {
      this.#headerInfoComponent = new HeaderInfoView({
        title: this.#getTitle(points).title,
        dates: this.#getDates(points),
        totalCost: this.#getTotalPrice(points)
      });
      render(this.#headerInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
    } else {
      this.#headerInfoComponent.updateData({
        title: this.#getTitle(points).title,
        dates: this.#getDates(points),
        totalCost: this.#getTotalPrice(points)
      });
    }
  }

  #handleModelEvent = () => {
    const points = this.#pointsModel.points;

    if (!points || points.length === 0) {
      if (this.#headerInfoComponent) {
        remove(this.#headerInfoComponent);
        this.#headerInfoComponent = null;
      }
      return;
    }

    this.init(points);
  };
}
