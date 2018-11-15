import { Row, Button, Select, Form, Col, Input } from "antd";
import React from "react";
import { connect } from "dva";

const FormItem = Form.Item;
const Option = Select.Option;

class DbUtil extends React.Component {
  state = {
    visible: false,
    db: [],
    table: [
      {
        value: 1,
        name: 1
      }
    ],
    connect: {
      disabled: true,
      loading: false
    },
    run: {
      disabled: true,
      loading: false
    }
  };

  componentDidMount = () => {
    this.setState({ connect: { loading: true } });
    this.props.dispatch({
      type: "db/allName",
      payload: {},
      callback: res => {
        this.setState({
          connect: { loading: false, disabled: true }
        });
        console.log(res);
        if (res) {
          this.setState({ db: res });
        }
      }
    });
  };

  render() {
    // function handleChange(value) {
    //   console.log(`selected ${value}`);
    // }

    // const formTailLayout = {
    //   // labelCol: { span: 4 },
    //   // wrapperCol: {  offset: 2 },
    // };

    return (
      <Row gutter={8}>
        <Col span={12}>
          <Form style={{ marginLeft: "30px" }}>
            <FormItem>
              <Col span={8}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择一项"
                  optionFilterProp="children"
                  // onChange={handleChange}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.db.map(d => (
                    <Option value={d.key}>{d.name}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={4}>
                <Input />
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  style={{ marginLeft: 10 }}
                  disabled={this.state.connect.disabled}
                  loading={this.state.connect.loading}
                >
                  连接
                </Button>
              </Col>
            </FormItem>

            <FormItem>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择一项"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.table.map(d => (
                  <Option value={d.value}>{d.name}</Option>
                ))}
              </Select>
            </FormItem>

            <FormItem>
              <Col span={4}>
                <Button
                  type="primary"
                  // loading={this.state.btn.run.loading}
                  disabled={this.state.run.disabled}
                >
                  运行
                </Button>
              </Col>
              <Col span={4}>
                <Button type="primary">清除</Button>
              </Col>
            </FormItem>
          </Form>
        </Col>

        <Col span={12}>
          <p>hhhhhhhhh /n gggggg /n ggggggg /n</p>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    db: state.db
  };
};
export default connect(mapStateToProps)(DbUtil);
