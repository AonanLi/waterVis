import React from 'react';
import { Card } from 'antd';
import _ from 'lodash';

const TooltipCard = ({ item }) => (
    <div>{_.map(item, (c, i) => <p key={i}>{`${c.value} ${c.sampleDate}`}</p>)}</div>
);

export default TooltipCard;
