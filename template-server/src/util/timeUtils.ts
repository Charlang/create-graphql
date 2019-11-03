import Moment, { MomentInput } from 'moment';
import printf from 'printf';

export const getSla = (start: MomentInput) => {
  const duration = Moment.duration(Moment.utc(new Date()).diff(start));
  // const years = duration.years();
  const days = duration.days();
  const hrs = duration.hours();
  const mins = duration.minutes();
  const secs = duration.seconds();
  return `${printf('%02d', days)}d ${printf('%02d', hrs)}h:${printf('%02d', mins)}m:${printf('%02d', secs)}s`;
};

// Use GTM + 8 format all date
export const formatDate = (date: MomentInput) =>
  Moment.utc(date)
    .add(8, 'hours')
    .format('YYYY-MM-DD HH:mm:ss');

export const formatStringDate = (date: string) =>
  Moment.utc(date, 'YYYY/MM/DD HH:mm:ss')
    .add(8, 'hours')
    .format('YYYY-MM-DD HH:mm:ss');
