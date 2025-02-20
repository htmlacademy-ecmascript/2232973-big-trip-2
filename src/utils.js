import dayjs from 'dayjs';

export function humanizeEventDate(date, format) {
  return (date) ? dayjs(date).format(format) : '';
}

export const handleEscapeKeyPress = (evt, onEscape) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    onEscape();
  }
};
