import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {Outlet, useNavigate} from "react-router-dom";

import "./layout.css"

const {Header, Sider, Content} = Layout;


export const LayoutPage = () => {

    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "100vh" }}>
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined/>} onClick={() => navigate("/contact")}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined/>} onClick={() => navigate("/contact/create")}>
                        Create Contact
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};