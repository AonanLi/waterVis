import React, { Component } from 'react';
import { Layout } from 'antd';
import _ from 'lodash';

import Side from './Side';
import NavBar from './NavBar';
import ContentPage from './ContentPage';

import json from '../util/data.json';

const { Content, Sider } = Layout;

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            place_measures: undefined,
            measure_ranges: undefined,
            places: ['Achara'],
            yUnit: 'year',
            date: 2017
        };
    }

    componentDidMount() {
        const formatted = json.results.map(r =>
            _.mapKeys(r, (value, i) => (i === 'sample date' ? 'sampleDate' : i))
        );
        const groupLocation = _.groupBy(formatted, r => r.location);
        const data = _.reduce(
            groupLocation,
            (result, value, key) => ({
                ...result,
                [key]: _.reduce(
                    _.groupBy(value, v => v.sampleDate),
                    (r, v, k) => ({
                        ...r,
                        [k]: _.groupBy(v, val => val.measure)
                    }),
                    {}
                )
            }),
            {}
        );
        const place_measures = _.reduce(
            groupLocation,
            (result, value, key) => ({
                ...result,
                [key]: _.reduce(_.groupBy(value, v => v.measure), (r, v, k) => r.concat(k), [])
            }),
            {}
        );
        const measure_ranges = _.reduce(
            _.groupBy(formatted, r => r.measure),
            (result, value, key) => ({
                ...result,
                [key]: {
                    max: _.maxBy(value, v => v.value).value,
                    min: _.minBy(value, v => v.value).value
                }
            }),
            {}
        );
        this.setState({ data, place_measures, measure_ranges });
    }

    onChange = (prop, value) => this.setState({ [prop]: value });

    render() {
        const { allPlace, data, place_measures, measure_ranges } = this.state;
        if (!data || !place_measures || !measure_ranges) {
            return false;
        }
        return (
            <Layout>
                <NavBar />
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff', borderRight: '0.3px solid' }}>
                        <Side record={this.state} onChange={this.onChange} />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <ContentPage record={this.state} onChange={this.onChange} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPage;
