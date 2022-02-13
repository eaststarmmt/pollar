import { compareAsc, format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  // return format(new Date(date), 'dd/MM/yyyy hh:mm p');
  return format(new Date(date), 'yyyy/MM/dd p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

/**
 *
 * @param {date} expire date of the Poll
 * @returns true: 만료된 투표 / false: 투표가능한 투표
 */
export function checkExpired(date) {
  return compareAsc(new Date(date), new Date()) === -1;
}
