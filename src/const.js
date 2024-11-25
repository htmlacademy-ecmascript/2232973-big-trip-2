const POINTS_COUNT = 5;
const EVENT_DATE_FORMAT = 'DD MMM';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FilterText = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

export {POINTS_COUNT, EVENT_DATE_FORMAT, DATE_TIME_FORMAT, FilterText, FilterType};
