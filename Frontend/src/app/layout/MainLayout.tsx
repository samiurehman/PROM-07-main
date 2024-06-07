import React, { useEffect, useState } from "react";
import { FileOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { User } from "../models/auth";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const MainLayout = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { getUser } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUserData(data);
    };
    fetchData();
  }, []);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    logouts?: boolean
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      ...(logouts && {
        onClick: () => {
          logout();
        },
      }),
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(<Link to="/">Dashboard</Link>, "1", <HomeOutlined />),
    // getItem(<Link to="/incidents">Incidents</Link>, "2", <FileOutlined />),
    getItem("Incidents", "sub1", <BookOutlined />, [
      getItem(<Link to="/incidents">All Incidents</Link>, "2"),
      getItem(<Link to="/log/create">Create Incident</Link>, "3"),
      // getItem("Bill", "4"),
      // getItem("Alex", "5"),
    ]),

    // getItem("Users", "sub2", <TeamOutlined />, [
    //   getItem(<Link to="/users">All Users</Link>, "4"),
    //   getItem(<Link to="/users/create">Create User</Link>, "5"),
    // ]),
    getItem("Settings", "4", <SettingOutlined />),
    getItem("Logout", "5", <LogoutOutlined />, undefined, true),
  ];

  {
    userData?.role === "Admin" &&
      items.splice(
        1,
        0,
        getItem("Users", "sub2", <TeamOutlined />, [
          getItem(<Link to="/admin/users">All Employees</Link>, "4"),
          getItem(<Link to="/admin/users/create">Create Employee</Link>, "5"),
        ])
      );
  }

  //if (location.pathname === "/login") return <Outlet />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "rgb(240, 240, 240)",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Durham Constabulary ©{new Date().getFullYear()} Created by Team 3
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
