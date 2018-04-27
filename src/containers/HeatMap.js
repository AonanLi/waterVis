import React from 'react';
import { Row, Col } from 'antd';

import Chart from '../components/Chart';

import { location_measures } from '../utils/query';

const HeatMap = ({ record, location }) => {
    const measures = location_measures(location);
    return (
        <div>
            <Row style={{ marginBottom: '8px' }}>
                <Col span={4}>{location}</Col>
                <Col span={20}>TODO</Col>
            </Row>
            {measures.map((measure, i) => (
                <Chart key={i} measure={measure} location={location} record={record} />
            ))}
        </div>
    );
};

export default HeatMap;
