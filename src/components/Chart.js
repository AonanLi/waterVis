import React from 'react';
import _ from 'lodash';

import Square from './Square';

const Chart = ({ measures, measure_ranges }) =>
    measures.map((measure, i) => (
        <div key={i}>
            {_.times(54).map((a, i) => (
                <Square key={i} ranges={measure_ranges[measure]} value={0} />
            ))}
        </div>
    ));

export default Chart;
