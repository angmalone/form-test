import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

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
      }),
      amazonURL: Form.createFormField({
        ...props.amazonURL,
        value: props.amazonURL.value
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
          rules: [{ required: true, message: "Snack name is required!" }]
        })(<Input />)}
      </FormItem>

      <FormItem label="Requested By">
        {getFieldDecorator("requestedBy", {})(<Input />)}
      </FormItem>

      <FormItem label="Amazon URL">
        {getFieldDecorator("amazonURL", {})(<Input />)}
      </FormItem>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
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
      },
      amazonURL: {
        value: ""
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
