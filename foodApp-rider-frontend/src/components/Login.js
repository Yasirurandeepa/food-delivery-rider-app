import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import '../css/login.css'
// import connection from './backendConnection/connection';
import {
    Link
} from "react-router-dom";
import axios from "axios";

class LoginForm extends React.Component {

    handleSubmit = e => {
        localStorage.clear();
        e.preventDefault();
        localStorage.clear();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }

            axios({
                method: 'post',
                url: 'http://localhost:8080/token/generate-token',
                data: {
                    username: values["username"],
                    password: values["password"]
                },
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then(
                success => {
                    //if user log in success, generate a JWT token for the user with a secret key
                    // jwt.sign(values["username"], 'SecretKeyToGenJWTs',{ expiresIn: 60 * 60 }, (err, token) => {
                    //   if(err) { console.log(err) }
                    //   console.log(token);
                    // });
                    if(success.data.status === 200){
                        message.success("You have successfully Logged In!!!");
                        localStorage.setItem("isUserLoggedIn",true);
                        console.log(success);
                        localStorage.setItem("uid",success.data.result.id);
                        localStorage.setItem("username",success.data.result.username);
                        localStorage.setItem("jwtToken","Bearer "+ success.data.result.token);
                        this.props.history.push('/profile');
                    }else if(success.data.status === 400){
                        message.error("Invalid username or password");
                    }

                },
                error => message.error(error)
            )
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-form-position">
                <h1 className="company-header">Asiri <span className="company-sub-header">Foods</span></h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item style={{width: "250px"}}>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{width: "250px"}}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {/*{getFieldDecorator('remember', {*/}
                        {/*  valuePropName: 'checked',*/}
                        {/*  initialValue: true,*/}
                        {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                        {/*<a className="login-form-forgot" href="">*/}
                        {/*  Forgot password*/}
                        {/*</a>*/}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/register">Register Now!</Link>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);

export default WrappedLoginForm;