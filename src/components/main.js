import React from 'react';
import { connect } from 'dva';
import {Layout,Menu} from 'antd';
const {Content,Header } = Layout;

 class Test  extends React.Component{

    render(){
        const { dispatch } = this.props;

        function change(item, key, keyPath){
              dispatch({
                type: 'main/to',
                payload: item.key,
              });
        }

        return (
            <Layout>
                <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                    onClick={change}
                >
                    <Menu.Item key="/main/db" >工具</Menu.Item>
                    <Menu.Item key="/main/list">数据库</Menu.Item>
                </Menu>
                </Header>
                <Content style={{marginTop:'20px',marginLeft:'20px',marginRight:'20px'}}>
                      {this.props.children}
                </Content>
            </Layout>
        );
    }

}

const mapStateToProps = () => {
    return {
         
    }
   };

export default connect(mapStateToProps)(Test);