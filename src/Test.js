import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import axios from "axios";

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

      <Button type="submit" htmlType="submit">
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
  submitForm = this.submitForm.bind(this);

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  submitForm(e) {
    e.preventDefault();
    console.log("hi");
    axios.post("http://localhost:3000/api/snacks", {
      name: this.state.name,
      requestedBy: this.state.requestedBy,
      amazonURL: this.state.amazonURL
    });
  }

  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm
          {...fields}
          onChange={this.handleFormChange}
          onSubmit={this.submitForm}
        />
        <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
      </div>
    );
  }
}

export default Test;
