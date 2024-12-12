import dayjs from 'dayjs';

function sortByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function sortByTime(a, b) {
  const durationA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
  const durationB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
  return durationA - durationB;
}

function sortByDay(a, b) {
  return dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
}

export { sortByPrice, sortByTime, sortByDay };
