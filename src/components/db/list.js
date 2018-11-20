import { Row, Button, Table, Popconfirm, Col } from "antd";
import CollectionCreateForm from "./create";
import React from "react";
import { connect } from "dva";

const PageSize = 5;
class List extends React.Component {
  state = {
    visible: false,
    loading: false,
    list: [],
    modal: {
      title: "新建"
    },
    pagination: {
      onChange: (pageNo, pageSize) => {
        console.log(pageNo, pageSize);
        this.handlePage(pageNo);
      }
    }
  };

  //初始化列表数据
  componentDidMount = () => {
    this.handlePage(1);
  };

  showModal = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ visible: true, modal: { title: "新建", key: 0 } });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  //处理分页数据
  handlePage = pageNo => {
    console.log("pageNo", pageNo);
    this.setState({ loading: true });
    this.props.dispatch({
      type: "db/page",
      payload: { pageNo: pageNo, pageSize: PageSize },
      callback: res => {
        console.log(res);
        this.setState({ loading: false });
        if (res) {
          this.setState({
            list: res.list,
            pagination: {
              current: res.page.current,
              pageSize: res.page.pageSize,
              total: res.page.total
            }
          });
        }
      }
    });
  };

  //创建或者编辑
  handleCreate = key => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      key = parseInt(key, 10);
      if (key > 0) {
        values.key = key;
      }
      console.log("Received values of form: ", values);
      this.setState({ loading: true });
      this.props.dispatch({
        type: "db/createOrModify",
        payload: values,
        callback: res => {
          console.log(res);
          this.setState({ loading: false });
          if (res) {
            form.resetFields();
            this.setState({ visible: false });
            if (key > 0) {
              this.handlePage(this.state.pagination.current);
            } else {
              this.handlePage(1);
            }
          }
        }
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  onDelete = id => {};

  onEdit = key => {
    let v = this.state.list;
    const form = this.formRef.props.form;
    for (var i = 0; i < v.length; i++) {
      if (v[i].key === key) {
        form.setFieldsValue(v[i]);
        break;
      }
    }
    this.setState({ visible: true, modal: { title: "编辑", key: key } });
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
                <Button type="primary" onClick={() => this.onEdit(record.key)}>
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
            pagination={this.state.pagination}
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
