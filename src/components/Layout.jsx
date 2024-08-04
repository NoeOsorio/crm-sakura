import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const navItems = [
  {
    key: "/clientes",
    icon: <UserOutlined />,
    label: "Clientes",
  },
  {
    key: "/productos",
    icon: <VideoCameraOutlined />,
    label: "Productos",
    //   disabled: true,
  },
  {
    key: "/ventas",
    icon: <UploadOutlined />,
    label: "Ventas",
    //   disabled: true,
  },
];

const LayoutPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const item = navItems.find((item) => item.key === location.pathname);
    console.log(item);
    if (item) {
      setSelectedTitle(item.label);
    }else{
        setSelectedTitle(navItems[0].label);
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    navigate(key); // Cambiar la URL al seleccionar un item
  };
  //   const [selectedItem, setSelectedItem] = useState("1");
  //   console.log(selectedItem);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h2 style={{ color: "white", textAlign: "center" }}>Sakura CRM</h2>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]} // Sincronizar el item seleccionado con la URL
          items={navItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h1 style={{ color:"red", marginLeft: 16 }}>{selectedTitle}</h1>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
