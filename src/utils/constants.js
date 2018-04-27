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
    { value: 'year', label: 'Year', size: '40px' },
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day', size: '3px' }
];

export const XUNITS_SIZE = { year: '25px', month: '3px', week: '3px', day: '3px' };

export const YEARS = _.range(1998, 2017).map(y => y.toString());

export const COLORS = ['#FFF59D', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#F44336', '#B71C1C'];
