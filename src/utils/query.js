import moment from 'moment';
import _ from 'lodash';

import json from './data.json';
import { YEARS } from './constants';

const data = json.results.map(r =>
    _.mapKeys(r, (value, i) => (i === 'sample date' ? 'sampleDate' : i))
);

const groupLocation = _.groupBy(data, r => r.location);

const searchDate = _.reduce(
    groupLocation,
    (result, value, key) => ({
        ...result,
        [key]: _.reduce(
            _.groupBy(value, v => v.measure),
            (r, v, k) => ({
                ...r,
                [k]: _.groupBy(v, val => val.sampleDate)
            }),
            {}
        )
    }),
    {}
);

const searchYear = _.reduce(
    groupLocation,
    (result, value, key) => ({
        ...result,
        [key]: _.reduce(
            _.groupBy(value, v => v.measure),
            (r, v, k) => ({
                ...r,
                [k]: _.groupBy(v, val => moment(val.sampleDate).year())
            }),
            {}
        )
    }),
    {}
);

const searchMonth = _.reduce(
    groupLocation,
    (result, value, key) => ({
        ...result,
        [key]: _.reduce(
            _.groupBy(value, v => v.measure),
            (r, v, k) => ({
                ...r,
                [k]: _.groupBy(v, val => moment(val.sampleDate).format('MM-YY'))
            }),
            {}
        )
    }),
    {}
);

export const location_measures = location => {
    return _.uniq(_.filter(data, d => d.location === location).map(v => v.measure));
};

export const measure_ranges = measure => {
    const values = _.filter(data, d => d.measure === measure).map(v => v.value);
    return { max: _.max(values), min: _.min(values) };
};

export const getItem = (record, index) => {
    const { location, measure, xUnit, year } = record;
    if (xUnit === 'day') {
        const date = moment([year])
            .dayOfYear(index)
            .format('DD-MMM-YY');
        return _.get(searchDate, `[${location}][${measure}][${date}]`);
    }
    if (xUnit === 'year') {
        return _.get(searchYear, `[${location}][${measure}][${YEARS[index]}]`);
    }
    if (xUnit === 'month') {
        return _.get(searchMonth, `[${location}][${measure}][${index}-${year.substring(2, 4)}]`);
    }
};
