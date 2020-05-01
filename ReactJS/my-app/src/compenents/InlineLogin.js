import {
    Form, Icon, Input, Button,message
} from 'antd';

import axios from 'axios';
import React,{Component} from 'react';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const error = (msg) => {
    message.error(msg, 0.1);
};



class InlineLogin_ extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var params = new URLSearchParams();
                params.append("login", values.userName);
                params.append("password", values.password);
                var request = {
                    params: params
                };
                axios.get('http://localhost:8080/Twitter/login', request)
                    .then(response => {
                        if (response.data.code === -1) {
                            this.props.setValues(response.data)
                            this.props.getConnected()
                        } else {
                            this.setState({ accept: false })
                            return error(response.data.msg)
                        }
                    })
                    .catch(error => {
                        alert(error)
                    });
            }
        });
    }



    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}
                style={{ "border": "0px" }}
            >
                <Form.Item
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                        
                    >
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        disabled={hasErrors(getFieldsError())}
                        onClick={(event) => this.props.setRedirect()}
                    >
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const InlineLogin = Form.create({ name: 'horizontal_login' })(InlineLogin_);
export default InlineLogin