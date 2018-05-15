import React, { Component } from 'react';
import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import moment from 'moment';
import _ from 'lodash';

import { measure_ranges, getItem } from '../utils/query';
import { YEARS, COLORS, XUNITS_SIZE, MONTHS } from '../utils/constants';

const getInRangeColor = (measure, value) => {
    if (_.isUndefined(value)) {
        return '#FFF';
    }
    const { min, max } = measure_ranges(measure);
    const index = parseInt((value - min) / max * 8, 10);
    return COLORS[index];
};

const getSize = record => XUNITS_SIZE[record.xUnit];

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

const getText = (record, index) => {
    const { xUnit } = record;
    if (xUnit === 'year') {
        return YEARS[index];
    }
    if (xUnit === 'month') {
        return MONTHS[index];
    }
    if (xUnit === 'day') {
        if (index % 30 === 0) {
            return MONTHS[index / 30];
        }
        return false;
    }
    return index;
};

class HeatMap extends Component {
    shouldComponentUpdate(nextProps) {
        const { record } = this.props;
        const { xUnit, year, locations, measures } = record;
        if (
            nextProps.record.xUnit === xUnit &&
            nextProps.record.year === year &&
            nextProps.record.locations === locations &&
            nextProps.record.measures === measures
        ) {
            return false;
        }
        return true;
    }

    render() {
        const { record, onChange } = this.props;
        const { measures, locations } = record;
        const size = getSize(record);
        const squaresNumber = getSquaresNumber(record);
        const border = size + (record.xUnit === 'day' ? 0.5 : 2);
        const elementHeight = Math.max(border, 20);
        const textHeight = locations.length * elementHeight + 20;
        const height = elementHeight + measures.length * textHeight;
        return (
            <Stage width={1920} height={height}>
                <Layer>
                    <Group>
                        <Text text="Measure-Locations" fill="rgba(0, 0, 0, 0.65)" x={0} y={0} />
                        {_.times(squaresNumber).map((s, j) => {
                            return (
                                <Text
                                    key={j}
                                    text={getText(record, s)}
                                    fill="rgba(0, 0, 0, 0.65)"
                                    fontSize={10}
                                    x={180 + j * border}
                                    y={0}
                                />
                            );
                        })}
                        {measures.map((measure, i) => (
                            <Group key={measure}>
                                {locations.map((location, j) => (
                                    <Group key={location}>
                                        <Text
                                            text={`${measure}-${location}`}
                                            fill="rgba(0, 0, 0, 0.65)"
                                            x={0}
                                            y={20 + i * textHeight + j * elementHeight}
                                        />
                                        {_.times(squaresNumber).map((s, k) => {
                                            const item = getItem(
                                                { ...record, location, measure },
                                                s
                                            );
                                            const value = _.isUndefined(item)
                                                ? undefined
                                                : _.meanBy(item, f => f.value);
                                            return (
                                                <Rect
                                                    key={k}
                                                    x={180 + k * border}
                                                    y={20 + i * textHeight + j * elementHeight}
                                                    width={size}
                                                    height={size}
                                                    fill={getInRangeColor(measure, value)}
                                                    onClick={() => onChange('selected', item)}
                                                />
                                            );
                                        })}
                                    </Group>
                                ))}
                            </Group>
                        ))}
                    </Group>
                </Layer>
            </Stage>
        );
    }
}

export default HeatMap;
