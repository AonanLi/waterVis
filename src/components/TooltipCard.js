import React from 'react';
import { Card } from 'antd';

const Title = ({ selected }) => {
    if (selected[0]) {
        const { location, measure } = selected[0];
        return `${measure}-${location}`;
    }
    return false;
};

const TooltipCard = ({ selected }) => {
    return (
        <Card style={{ width: '80%', marginLeft: '20px' }}>
            <Title selected={selected} />
            {selected.map((s, i) => <p key={i}>{`${s.value} ${s.sampleDate}`}</p>)}
        </Card>
    );
};

TooltipCard.defaultProps = {
    selected: []
};

export default TooltipCard;
