import React from "react";
import { connect } from "dva";
import { Layout, Menu } from "antd";

const { Content, Header } = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { url: "/main/db", name: "工具" },
        { url: "/main/list", name: "数据库" }
      ],
      currentUrl: ""
    };
  }

  //菜单切换事件
  onChange = (item, key, keyPath) => {
    this.props.dispatch({
      type: "main/to",
      payload: item.key
    });
  };

  render() {
    let current = window.location.href;
    let menu = this.state.menu;
    for (let i = 0; i < menu.length; i++) {
      if (current.indexOf(menu[i].url) !== -1) {
        current = menu[i].url;
        break;
      }
    }

    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[`${current}`]}
            style={{ lineHeight: "64px" }}
            onClick={this.onChange}
          >
            {this.state.menu.map(d => (
              <Menu.Item key={d.url}>{d.name} </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content
          style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
        >
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Main);
