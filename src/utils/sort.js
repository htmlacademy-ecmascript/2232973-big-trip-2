import dayjs from 'dayjs';

function sortByPrice(FirstElem, SecondElem) {
  return SecondElem.basePrice - FirstElem.basePrice;
}

function sortByTime(FirstElem, SecondElem) {
  const durationFirst = dayjs(FirstElem.dateTo).diff(dayjs(FirstElem.dateFrom));
  const durationSecond = dayjs(SecondElem.dateTo).diff(dayjs(SecondElem.dateFrom));
  return durationSecond - durationFirst;
}

function sortByDay(FirstElem, SecondElem) {
  return dayjs(FirstElem.dateFrom).diff(dayjs(SecondElem.dateFrom));
}

export { sortByPrice, sortByTime, sortByDay };
