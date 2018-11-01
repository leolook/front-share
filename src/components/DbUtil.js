import { Row, Button, Select, Form, Col } from "antd";
import React from "react";

const FormItem = Form.Item;
const Option = Select.Option;

export default class App extends React.Component {
  state = {
    visible: false,
    db: [
      {
        value: 1,
        name: 1
      },
      {
        value: 2,
        name: 2
      },
      {
        value: 3,
        name: 3
      }
    ],
    table: [
      {
        value: 1,
        name: 1
      },
      {
        value: 2,
        name: 2
      },
      {
        value: 3,
        name: 3
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
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    const formTailLayout = {
      // labelCol: { span: 4 },
      // wrapperCol: {  offset: 2 },
    };

    return (
      <Row gutter={8}>
        <Col span={12}>
          <Form style={{ marginLeft: "30px" }}>
            <FormItem {...formTailLayout}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择一项"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.db.map(d => (
                  <Option value={d.value}>{d.name}</Option>
                ))}
              </Select>
            </FormItem>

            <FormItem {...formTailLayout}>
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

            <FormItem {...formTailLayout}>
              <Col span={4}>
                <Button type="primary">运行</Button>
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
