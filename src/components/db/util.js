import { Row, Button, Select, Form, Col, Input, Card } from "antd";
import React from "react";
import { connect } from "dva";
import { node } from "prop-types";

const Option = Select.Option;
const FormItem = Form.Item;

let tableName = "";

const UtilFrom = Form.create()(
  class extends React.Component {
    state = {
      connect: {
        disabled: true,
        loading: false
      },
      run: {
        disabled: true
      },
      clear: {
        disabled: true
      },
      db: [],
      table: {
        key: "",
        model: []
      },
      content: "demo"
    };

    componentDidMount = () => {
      this.setState({
        connect: { loading: true, disabled: true }
      });
      this.props.dispatch({
        type: "db/allName",
        payload: {},
        callback: res => {
          this.setState({
            connect: { loading: false, disabled: false }
          });
          if (res) {
            this.setState({ db: res });
          }
        }
      });
    };

    //连接
    handelConnect = () => {
      const form = this.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log(values);
        this.setState({
          connect: { loading: true, disabled: true }
        });
        this.props.dispatch({
          type: "db/connect",
          payload: values,
          callback: res => {
            this.setState({
              connect: { loading: false, disabled: false }
            });
            if (res) {
              this.setState({
                table: res
              });
            }
          }
        });
      });
    };

    //运行
    handelRun = () => {
      let values = {
        key: this.state.table.key,
        name: tableName
      };
      this.setState({
        run: { loading: true, disabled: true }
      });
      this.props.dispatch({
        type: "db/tableModel",
        payload: values,
        callback: res => {
          this.setState({
            run: { loading: false, disabled: false }
          });
          if (res) {
            this.setState({ content: res });
          }
        }
      });
    };

    //清除
    handelClear = () => {
      this.setState({ content: "" });
    };

    //表
    handelChange = (value, option) => {
      tableName = value;
      this.setState({
        run: { disabled: false },
        clear: { disabled: false }
      });
    };
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Row>
          <Col span={3}>
            <Form>
              <FormItem>
                {getFieldDecorator("id", {
                  rules: [{ required: true, message: "请选择一项" }]
                })(
                  <Select placeholder="请选择一项">
                    {this.state.db.map(d => (
                      <Option value={d.id}>{d.name}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("dbName", {
                  rules: [{ required: true, message: "请输入名称" }]
                })(<Input />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handelConnect}
                  disabled={this.state.connect.disabled}
                  loading={this.state.connect.loading}
                >
                  连接
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={1} />
          <Col span={3}>
            <Form>
              <FormItem>
                <Select placeholder="请选择一项" onChange={this.handelChange}>
                  {this.state.table.model.map(d => (
                    <Option value={d.name}>{d.name}</Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  disabled={this.state.run.disabled}
                  onClick={this.handelRun}
                >
                  运行
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  disabled={this.state.clear.disabled}
                  onClick={this.handelClear}
                >
                  清除
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={2} />
          <Col span={14}>
            <div style={{ background: "#ECECEC", padding: "30px" }}>
              <Card title="表模型" bordered={false} style={{ width: "auto" }}>
                <textarea
                  style={{ border: "none" }}
                  rows="15"
                  cols="70"
                  value={this.state.content}
                />
              </Card>
            </div>
          </Col>
        </Row>
      );
    }
  }
);

const mapStateToProps = state => {
  return {
    db: state.db
  };
};
export default connect(mapStateToProps)(UtilFrom);
