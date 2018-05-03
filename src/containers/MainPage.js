import React, { Component } from 'react';
import { Layout } from 'antd';

import Side from './Side';
import NavBar from './NavBar';
import ContentPage from './ContentPage';

const { Content, Sider } = Layout;

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'HeatMap',
            locations: ['Boonsri'],
            xUnit: 'week',
            year: '2015'
        };
    }

    onChange = (prop, value) => this.setState({ [prop]: value });

    render() {
        const { state, onChange } = this;
        return (
            <Layout>
                <NavBar page={state.page} onChange={onChange} />
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff', borderRight: '0.3px solid' }}>
                        <Side record={state} onChange={onChange} />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <ContentPage record={state} onChange={onChange} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPage;
