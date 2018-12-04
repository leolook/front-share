import { Row, Button, Table, Popconfirm, Col } from "antd";
import CollectionCreateForm from "./create";
import React from "react";
import { connect } from "dva";
import { message } from "antd";

const PageSize = 5;

class List extends React.Component {
  state = {
    visible: false,
    loading: false,
    list: [],
    modal: {
      title: "新建"
    },
    pagination: {},
    sorter: {},
    columns: [
      {
        title: "名称",
        dataIndex: "name",
        sorter: true,
        width: "20%"
      },
      {
        title: "ip",
        dataIndex: "ip",
        width: "20%"
      },
      {
        title: "port",
        dataIndex: "port",
        width: "10%"
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: "20%"
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
    ]
  };

  //初始化列表数据
  componentDidMount = () => {
    let obj = {
      pageNo: 1
    };
    this.handlePage(obj);
  };

  showModal = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ visible: true, modal: { title: "新建", key: 0 } });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  //处理表格变化
  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    if (sorter.field === "name" && sorter.order !== "") {
      let obj = {
        pageNo: pagination.current,
        sorter: {
          field: sorter.field,
          order: sorter.order
        }
      };
      this.handlePage(obj);
      this.setState({ sorter: sorter });
    }
  };

  //处理分页数据
  handlePage = obj => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: "db/page",
      payload: { pageNo: obj.pageNo, pageSize: PageSize, sorter: obj.sorter },
      callback: res => {
        // console.log(res);
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
            //重置表单
            form.resetFields();
            this.setState({ visible: false });

            //刷新数据
            let obj = {
              pageNo: this.state.pagination.current
            };
            if (key > 0) {
              obj.current = this.state.pagination.current;
            }
            this.handlePage(obj);
          }
        }
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  //删除
  onDelete = id => {
    let value = {
      ids: [id]
    };
    this.props.dispatch({
      type: "db/del",
      payload: value,
      callback: res => {
        if (res) {
          message.success("删除成功");
          //刷新数据
          let obj = {
            pageNo: this.state.pagination.current,
            sorter: this.state.sorter
          };
          this.handlePage(obj);
        }
      }
    });
  };

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
            columns={this.state.columns}
            dataSource={this.state.list}
            loading={this.state.loading}
            pagination={this.state.pagination}
            onChange={this.handleTableChange}
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
