import { Container, Grid } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";

import { Content } from "antd/es/layout/layout";

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
          <Grid item xs={12}>
            <Layout>
              <Sider width={200} style={{ background: colorBgContainer }}>
                <NavLink
                  end
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "flex flex-col justify-between items-center text-[#FFFFFF]  bg-[#1677ff]  p-[10px] rounded-md"
                      : "flex flex-col justify-between items-center p-[10px] rounded-md"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  end
                  to="/log/create"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "flex flex-col justify-between items-center text-[#FFFFFF]  bg-[#1677ff]  p-[10px] rounded-md"
                      : "flex flex-col justify-between items-center p-[10px] rounded-md"
                  }
                >
                  Log Incident
                </NavLink>
                <NavLink
                  end
                  to="/settings"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ""
                      : isActive
                      ? "flex flex-col justify-between items-center text-[#FFFFFF]  bg-[#1677ff]  p-[10px] rounded-md"
                      : "flex flex-col justify-between items-center p-[10px] rounded-md"
                  }
                >
                  Settings
                </NavLink>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Outlet />
                </Content>
              </Layout>
            </Layout>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AppLayout;
