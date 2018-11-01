import { Row, Button, Table } from "antd";
import CollectionCreateForm from "./create";
import React from "react";
import { connect } from "dva";

class List extends React.Component {
  state = {
    visible: false,
    loading: false,
    list: [
      {
        name: "db1",
        ip: "192.168.1.230",
        port: "2030",
        userName: "root"
      }
    ]
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);

      this.setState({ loading: true });
      this.props.dispatch({
        type: "db/create",
        payload: values,
        callback: res => {
          this.setState({ loading: false });
          if (res) {
            console.log("res", res);
            let tmp = this.state.list;
            tmp.push(res);
            this.setState({ list: tmp });
          }
        }
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const columns = [
      {
        title: "名称",
        dataIndex: "name"
      },
      {
        title: "ip",
        dataIndex: "ip"
      },
      {
        title: "port",
        dataIndex: "port"
      },
      {
        title: "用户名",
        dataIndex: "userName"
      },
      {
        title: "操作",
        key: "action",
        render: () => <a href="javascript:;">删除</a>
      }
    ];

    return (
      <div>
        <Row>
          <Button type="primary" onClick={this.showModal}>
            新增
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Table
            columns={columns}
            dataSource={this.state.list}
            loading={this.state.loading}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    db: state.db
  };
};
export default connect(mapStateToProps)(List);
