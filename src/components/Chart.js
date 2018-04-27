import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import Square from './Square';

import { getItem } from '../utils/query';
import { YEARS } from '../utils/constants';

const getSquaresNumber = record => {
    const { xUnit, year } = record;
    if (xUnit === 'year') {
        return YEARS.length;
    }
    if (xUnit === 'month') {
        return 12;
    }
    if (xUnit === 'day') {
        return moment([year]).isLeapYear() ? 366 : 365;
    }
    return moment([year]).weeksInYear();
};

const Chart = ({ measure, location, record }) => {
    const squaresNumber = getSquaresNumber(record);
    return (
        <Row>
            <Col span={4}>{measure}</Col>
            <Col span={20}>
                {_.times(squaresNumber).map(j => (
                    <Square
                        key={j}
                        measure={measure}
                        xUnit={record.xUnit}
                        item={getItem({ ...record, location, measure }, j)}
                    />
                ))}
            </Col>
        </Row>
    );
};

export default Chart;
