import dayjs from 'dayjs';

export function humanizeEventDate(date, format) {
  return (date) ? dayjs(date).format(format) : '';
}
