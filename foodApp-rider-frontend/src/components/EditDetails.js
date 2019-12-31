import React from "react";
import {
    Form,
    Input,
    Button,
    message,
} from 'antd';
import axios from "axios";

class EditDetails extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        email: null,
        phone: null
    };

    componentDidMount(): void {
        axios({
            method: 'get',
            url: 'http://localhost:8080/rider/' + localStorage.getItem("uid"),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": localStorage.getItem("jwtToken")
            }
        }).then(
            success => {
                this.setState({
                    email: success.data.result.email,
                    phone: success.data.result.phone
                })
            },
            error => console.log(error)
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios({
                    method: 'put',
                    url: 'http://localhost:8080/rider/' + localStorage.getItem("uid"),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": localStorage.getItem("jwtToken")
                    },
                    data: {
                        id: localStorage.getItem("uid"),
                        email: values["email"],
                        phone: values["phone"]
                    }
                }).then(
                    success => {
                        message.success("Successfully updated the details");
                        console.log(success);
                        this.props.history.pop();
                    },
                    error => console.log(error)
                )
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        initialValue: this.state.email,
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label="Phone Number" value={this.state.phone}>
                    {getFieldDecorator('phone', {
                        initialValue: this.state.phone,
                        rules: [
                            {
                                required: true, message: 'Please input your phone number!'
                            },
                            {
                                pattern: "^[0-9]*$",
                                message: 'Invalid Phone Number! Must have digits'
                            }
                        ],
                    })(<Input style={{width: '100%'}}/>)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{left: "75%"}}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedEditDetailsForm = Form.create({name: 'register'})(EditDetails);

export default WrappedEditDetailsForm;