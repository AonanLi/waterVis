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
                [k]: _.groupBy(v, val => {
                    const date = moment(val.sampleDate);
                    return `${date.year()}-${date.month() + 1}`;
                })
            }),
            {}
        )
    }),
    {}
);

const searchWeek = _.reduce(
    groupLocation,
    (result, value, key) => ({
        ...result,
        [key]: _.reduce(
            _.groupBy(value, v => v.measure),
            (r, v, k) => ({
                ...r,
                [k]: _.groupBy(v, val => {
                    const date = moment(val.sampleDate);
                    return `${date.year()}-${date.week()}`;
                })
            }),
            {}
        )
    }),
    {}
);

export const getMeasures = ({ locations, xUnit, year }) => {
    return _.uniq(
        _.filter(
            data,
            d => _.includes(locations, d.location) && isIncluded(xUnit, year, d.sampleDate)
        ).map(v => v.measure)
    );
};

const isIncluded = (xUnit, year, sampleDate) => {
    const date = moment(sampleDate);
    return xUnit === 'year' ? true : date.year().toString() === year ? true : false;
};

export const measure_ranges = measure => {
    const values = _.filter(data, d => d.measure === measure).map(v => v.value);
    return { max: _.max(values), min: _.min(values) };
};

export const getItem = (record, index) => {
    const { location, measure, xUnit, year } = record;
    if (xUnit === 'day') {
        const date = moment([year])
            .dayOfYear(index + 1)
            .format('DD-MMM-YY');
        return _.get(searchDate, [location, measure, date]);
    }
    if (xUnit === 'year') {
        return _.get(searchYear, [location, measure, YEARS[index]]);
    }
    if (xUnit === 'month') {
        return _.get(searchMonth, [location, measure, `${year}-${index + 1}`]);
    }
    return _.get(searchWeek, [location, measure, `${year}-${index + 1}`]);
};
