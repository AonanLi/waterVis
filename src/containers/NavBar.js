import React from 'react';
import { Layout, Menu } from 'antd';

const { Item } = Menu;
const { Header } = Layout;

const NavBar = props => (
    <Header className="header">
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
        >
            <Item key="1">nav 1</Item>
            <Item key="2">nav 2</Item>
            <Item key="3">nav 3</Item>
        </Menu>
    </Header>
);

export default NavBar;
