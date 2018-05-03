import React from 'react';
import { Tooltip } from 'antd';
import _ from 'lodash';

import TooltipCard from './TooltipCard';

import { measure_ranges } from '../utils/query';
import { COLORS, XUNITS_SIZE } from '../utils/constants';

const getInRangeColor = (measure, value) => {
    if (_.isUndefined(value)) {
        return '#FFF';
    }
    const { min, max } = measure_ranges(measure);
    const index = parseInt((value - min) / max * 8, 10);
    return COLORS[index];
};

const getSize = xUnit => XUNITS_SIZE[xUnit];

const Square = ({ xUnit, measure, item }) => {
    const size = getSize(xUnit);
    const value = _.isUndefined(item) ? undefined : _.meanBy(item, f => f.value);
    return (
        <Tooltip placement="topLeft" title={value ? <TooltipCard item={item} /> : undefined}>
            <div
                style={{
                    backgroundColor: getInRangeColor(measure, value),
                    width: size,
                    height: size,
                    display: 'inline-block',
                    border: xUnit === 'day' ? 'none' : '1px solid #FFF'
                }}
            />
        </Tooltip>
    );
};

export default Square;
