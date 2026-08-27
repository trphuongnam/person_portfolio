"use client";
import { useState } from "react";
import { Button, Layout, theme } from "antd";
import AdminNavBar from "@/app/components/layout/admin/navBar";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

const AdminBaseLayout = ({
  childComponent,
}: Readonly<{
  childComponent: React.ReactNode;
}>) => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <AdminNavBar/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {childComponent}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminBaseLayout;