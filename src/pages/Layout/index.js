import { Layout, Menu, message, Popconfirm } from "antd";
import { DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import "./index.scss";

const { Header, Sider } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const { loginStore, userStore } = useStore();
  const navigate = useNavigate();
  const selectedKey = location.pathname;

  useEffect(() => {
    userStore.syncUserInfo();
  }, [userStore]);

  const onLogout = () => {
    loginStore.logout();
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <div className="user-info">
          <span className="user-name">{ userStore.userInfo.name }</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出?" okText="退出" cancelText="取消" onConfirm={ onLogout }>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width="200" className="site-layout-background">
          <Menu mode="inline" theme="dark" defaultSelectedKeys={ [selectedKey] }
                style={ { height: "100%", borderRight: 0 } }>
            <Menu.Item icon={ <HomeOutlined/> } key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={ <DiffOutlined/> } key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={ <EditOutlined/> } key="/publish">
              <Link to="/publish">文章发布</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={ { padding: 20 } }>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(MainLayout);
