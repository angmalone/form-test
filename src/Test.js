import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input } from "antd";

const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value
      }),
      requestedBy: Form.createFormField({
        ...props.requestedBy,
        value: props.requestedBy.value
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="Name">
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Username is required!" }]
        })(<Input />)}
      </FormItem>

      <FormItem label="Requested By">
        {getFieldDecorator("requestedBy", {
          rules: [{ required: true, message: "Username is required!" }]
        })(<Input />)}
      </FormItem>
    </Form>
  );
});

class Test extends React.Component {
  state = {
    fields: {
      name: {
        value: "skinny pop"
      },
      requestedBy: {
        value: "angela"
      }
    }
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
      </div>
    );
  }
}

export default Test;
