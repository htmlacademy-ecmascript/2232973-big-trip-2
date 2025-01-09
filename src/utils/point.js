import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DATE_TIME_FORMAT, EVENT_DATE_FORMAT} from '../const';

dayjs.extend(duration);

const convertToISO = (date) => dayjs(date).toISOString();

function calculateDuration(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const diffInMs = end.diff(start);

  const eventDuration = dayjs.duration(diffInMs);

  const days = eventDuration.days();
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  if (days > 0) {
    return `${days}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
}

function formatDateToCustom(date) {
  return dayjs(date).format(DATE_TIME_FORMAT);
}


function getEventDate(date) {
  return dayjs(date).format(EVENT_DATE_FORMAT);
}

export {getEventDate, calculateDuration, formatDateToCustom, convertToISO};
