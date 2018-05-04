import React from 'react';
import { Card } from 'antd';

const TooltipCard = ({ selected }) => {
    return (
        <Card style={{ width: '80%', marginLeft: '20px' }}>
            {selected.map((s, i) => <p key={i}>{`${s.value} ${s.sampleDate}`}</p>)}
        </Card>
    );
};

TooltipCard.defaultProps = {
    selected: []
};

export default TooltipCard;
