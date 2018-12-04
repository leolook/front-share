import { Modal, Form, Input, InputNumber } from "antd";

import React from "react";

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      const { visible, onCancel, onCreate, form, data } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      };

      return (
        <Modal
          visible={visible}
          title={data.title}
          okText="确认"
          onCancel={onCancel}
          onOk={() => onCreate(data.key)}
        >
          <Form>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入名称" }]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="ip" help="例如:47.95.96.124">
              {getFieldDecorator("ip", {
                rules: [{ required: true, message: "请输入ip" }]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="端口" help="(1~65535)">
              {getFieldDecorator("port", {
                rules: [{ required: true, message: "请输入端口号" }]
              })(<InputNumber min={1} max={65535} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(<Input type="password" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default CollectionCreateForm;
