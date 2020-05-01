import React, { Component } from "react"
import {
    message,Form, Input, Checkbox, DatePicker, Button} from 'antd';


import Style from 'style-it'
import { Radio } from 'antd';
import axios from 'axios';

const RadioGroup = Radio.Group;

const error = (msg) => {
    message.error(msg, 1);
};

const success = (msg) => {
    message.success(msg, 0.5);    
};

class Sign_Up extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    login(parametres){
        var params = new URLSearchParams();
        params.append("login", parametres.email);
        params.append("password", parametres.password);
        var request = {
            params: params
        };
        axios.get('http://localhost:8083/Twitter/login', request)
            .then(response => {
                if (response.data.code === -1) {
                    this.props.setValues(response.data)
                    this.props.getConnected()
                    this.props.setRedirectToFalse()
                    return success("user added")
                } else {
                    this.setState({ accept: false })
                    return error(response.data.msg)
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const fieldsValue = {
                    ...values,
                    'date': values['birth_date'].format('DD/MM/YYYY'),
                }

                var params = new URLSearchParams();
                params.append("nom", fieldsValue.LastName);
                params.append("prenom", fieldsValue.Name);
                params.append("login", fieldsValue.email);
                params.append("password", fieldsValue.password);
                params.append("sex", fieldsValue.gender);
                params.append("birth_date", fieldsValue.date);

                var request = {
                    params: params
                };
                axios.get('http://localhost:8081/Twitter/createUser', request)
                    .then(response => {
                        if (response.data.code === -1) {
                            this.login(fieldsValue)
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

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }



    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }


   


    render() {
        const { getFieldDecorator } = this.props.form;
        
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
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
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (
            <div className="container">
            <Style>
                {
                    `   
                        #title {
                            color : red;
                            text-align: center;
                        }
                        .ant-form-item-label ant-col-xs-24 ant-col-sm-8{
                            width : 0.2 %;
                        }

                    `
                }
            </Style>
                <h1 className="container" id="title"> Sign Up </h1>
                <div className="container">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="Name">
                            {
                                getFieldDecorator('Name', {
                                    rules: [{ required: true, message: 'Please input your Name!' }
                                    ],
                                })(
                                    <Input />)
                            }
                        </Form.Item>
                        <Form.Item label="LastName">
                            {
                                getFieldDecorator('LastName', {
                                    rules: [{ required: true, message: 'Please input your LastName!' }
                                    ],
                                })(
                                    <Input />)
                            }
                        </Form.Item>
                        <Form.Item label="birth_date">

                            {getFieldDecorator('birth_date', config)(
                                
                                    <DatePicker />
                                )}

                        </Form.Item>
                        <Form.Item label="Gender">
                                
                                {getFieldDecorator('gender', {
                                    rules: [{ required: true, message: 'Please select your gender!' }],
                                })(
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio value={-1}>Female</Radio>
                                        <Radio value={1}>Male</Radio>
                                    </RadioGroup>
                                )}
                        </Form.Item>
                        <Form.Item label = "E-mail">
                            {
                                getFieldDecorator('email',{
                                    rules: [{ type: 'email', message:'The input is not valid E-mail!'},
                                            { required: true, message: 'Please input your E-mail!'}
                                           ],})(
                                    <Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="Password">
                             {
                                 getFieldDecorator('password',{
                                     rules: [{required : true , message : "please input your password"},
                                         { validator: this.validateToNextPassword },],
                                 })(<Input.Password type ="password"/>)
                             }
                        </Form.Item>
                                <Form.Item label="confirm">
                                {
                                    getFieldDecorator('confirm', {
                                        rules: [{ required: true, message: "please confirm your password" },
                                        { validator: this.compareToFirstPassword },],
                                    })(<Input.Password type="password" />)
                                }
                                </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                })(
                                <Checkbox>I have read the <a href="google.com">agreement</a></Checkbox>
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Register</Button>
                                <Button type="danger"onClick={(event) => this.props.setRedirectToFalse()} >Cancel</Button>
                            </Form.Item>
                        </Form>
                </div>
            </div>
            );
    }

}

const SignUp = Form.create({ name: 'register' })(Sign_Up);
export default SignUp