import React from 'react';
import { Menu, Layout } from 'antd';
import { LikeOutlined, PlayCircleOutlined, LogoutOutlined } from '@ant-design/icons';

interface SiderProps {
  onLogOut: () => void;
  onMenuClick: (page: string) => void;
}

export class Sider extends React.Component<SiderProps> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { onLogOut, onMenuClick } = this.props;

    return (
      <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item
            key="1"
            icon={<PlayCircleOutlined />}
            style={{ marginTop: '18px' }}
            onClick={() => onMenuClick('movies')}
          >
            Movies
          </Menu.Item>
          <Menu.Item key="2" icon={<LikeOutlined />} onClick={() => onMenuClick('saved-movies')}>
            Saved Movies
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<LogoutOutlined />}
            style={{ marginTop: '80vh' }}
            onClick={onLogOut}
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}
