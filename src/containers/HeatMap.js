import React from 'react';
import { Row, Col } from 'antd';

import AxisY from '../components/AxisY';
import Chart from '../components/Chart';

const HeatMap = ({ record, place }) => {
    const { place_measures, measure_ranges } = record;
    const measures = place_measures[place];
    return (
        <Row>
            <Col span={4}>
                <Row>back</Row>
                <Row>
                    <AxisY measures={measures} />
                </Row>
            </Col>
            <Col span={20}>
                <Row>X</Row>
                <Row>
                    <Chart measures={measures} measure_ranges={measure_ranges} />
                </Row>
            </Col>
        </Row>
    );
};

export default HeatMap;
