import React from 'react';

const COLORS = ['#FFF59D', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#F44336', '#B71C1C'];

const getInRangeColor = ({ ranges, value }) => {
    const { min, max } = ranges;
    const index = parseInt((value - min) / max * 7, 10);
    return COLORS[index];
};

const Square = props => (
    <div
        style={{
            backgroundColor: getInRangeColor(props),
            width: '8px',
            height: '8px',
            display: 'inline-block'
        }}
    />
);

export default Square;
