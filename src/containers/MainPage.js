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
            locations: ['Achara'],
            xUnit: 'year',
            year: 2015
        };
    }

    onChange = (prop, value) => this.setState({ [prop]: value });

    render() {
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
