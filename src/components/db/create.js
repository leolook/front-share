import { Modal, Form, Input } from "antd";

import React from "react";

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="新建"
          okText="保存"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form>
            <FormItem label="名称">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请输入名称" }]
              })(<Input />)}
            </FormItem>

            <FormItem label="ip">
              {getFieldDecorator("ip", {
                rules: [{ required: true, message: "请输入ip" }]
              })(<Input />)}
            </FormItem>

            <FormItem label="端口">
              {getFieldDecorator("port", {
                rules: [{ required: true, message: "请输入端口号" }]
              })(<Input type="number" />)}
            </FormItem>

            <FormItem label="用户名">
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input />)}
            </FormItem>

            <FormItem label="密码">
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
