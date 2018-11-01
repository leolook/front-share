import { Row, Button, Table, Popconfirm, Col } from "antd";
import CollectionCreateForm from "./create";
import React from "react";
import { connect } from "dva";

class List extends React.Component {
  state = {
    visible: false,
    loading: false,
    list: [
      {
        key: 1,
        name: "db1",
        ip: "192.168.1.230",
        port: "2030",
        userName: "root"
      }
    ],
    modal: {
      title: "新建"
    }
  };

  showModal = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ visible: true, modal: { title: "新建", key: 0 } });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = key => {
    console.log(key);

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
            res.key = tmp.length + 1;
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

  onDelete = id => {};

  onEdit = () => {
    let v = this.state.list;
    const form = this.formRef.props.form;
    form.setFieldsValue(v[0]);
    this.setState({ visible: true, modal: { title: "编辑", key: 1 } });
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
        render: (text, record) => {
          return (
            <Row gutter={8}>
              <Col span={5}>
                <Button type="primary" onClick={this.onEdit}>
                  编辑
                </Button>
              </Col>
              <Col span={5}>
                <Popconfirm
                  title="确认删除?"
                  onConfirm={() => this.onDelete(record.key)}
                >
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </Col>
            </Row>
          );
        }
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
            data={this.state.modal}
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
