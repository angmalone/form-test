import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a snack"
          okText="Add!"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Snack Name">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a snack name!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator("description")(<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Test2 extends React.Component {
  state = {
    visible: false
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
      axios.post("http://localhost:3000/api/snacks", {
        values
      });
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New Collection
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default Test2;
