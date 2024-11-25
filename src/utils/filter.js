import { FilterType } from '../const';
import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => dayjs(point.dateFrom).isAfter(dayjs())),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) =>
      dayjs().isBetween(dayjs(point.dateFrom), dayjs(point.dateTo), null, '[]')
    ),
  [FilterType.PAST]: (points) =>
    points.filter((point) => dayjs(point.dateTo).isBefore(dayjs())),
};


export {filter};
