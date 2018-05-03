import React from 'react';
import { Layout, Menu } from 'antd';

const { Item } = Menu;
const { Header } = Layout;

const NavBar = ({ page, onChange }) => (
    <Header className="header">
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            onClick={e => onChange('page', e.key)}
            selectedKeys={[page]}
            style={{ lineHeight: '64px' }}
        >
            <Item key="PCA">PCA</Item>
            <Item key="HeatMap">HeatMap</Item>
            <Item key="TODO">TODO</Item>
        </Menu>
    </Header>
);

export default NavBar;
