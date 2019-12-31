import React from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
    Icon,
    message
} from 'antd';
import {
    Link
} from "react-router-dom";
import '../css/register.css';
import axios from 'axios';

const {Option} = Select;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values["status"] = "available";
                console.log('Received values of form: ', values);
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/rider/register',
                    data: values,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(
                    success => {
                        if(success.data.status === 200){
                            message.success(success.data.message);
                        }else if(success.data.status === 400){
                            message.error(success.data.message);
                        }
                    },
                    error => message.error(error)
                )
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 17},
                sm: {span: 9},
            },
            wrapperCol: {
                xs: {span: 20},
                sm: {span: 15},
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

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');

        return (
            <div className="register-form-position">
                <h1 className="company-header">Asiri <span className="company-sub-header">Foods</span></h1>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Username" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(<Input/>,)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
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
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>

                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                },
                                {
                                    pattern: "^[0-9]*$",
                                    message: 'Invalid Phone Number! Must have digits'
                                }
                            ],
                        })(<Input style={{width: '100%'}}/>)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Register
                        </Button>
                        <Button type="primary" className="register-form-button">
                            <Link to="/login">Login</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default WrappedRegistrationForm;