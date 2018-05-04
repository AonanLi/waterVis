import _ from 'lodash';

export const LOCATIONS = [
    'Achara',
    'Boonsri',
    'Busarakhan',
    'Chai',
    'Decha',
    'Kannika',
    'Kohsoom',
    'Sakda',
    'Somchair',
    'Tansanee'
];

export const XUNITS = [
    { value: 'year', label: 'Year' },
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' }
];

export const XUNITS_SIZE = { year: 25, month: 30, week: 18, day: 3 };

export const YEARS = _.range(1998, 2017).map(y => y.toString());

export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
];

export const COLORS = [
    '#FED89A',
    '#FEB67C',
    '#FB835F',
    '#F3655C',
    '#D2426F',
    '#A02F7F',
    '#491078',
    '#3B0F70',
    '#000004'
];
