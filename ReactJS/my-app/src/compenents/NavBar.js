import React,{Component } from 'react'
import { Layout, Menu} from 'antd';
import MyLogo from './Logo'
import InlineLogin from './InlineLogin'


const {Header} = Layout;

export default class NavBar extends Component{


    render(){
        return (
            <div className="container-fluid">
                <Layout>
                    <Header>
                        <div className="float-left">
                            <MyLogo>
                            </MyLogo>
                        </div>
                        <div className="d-flex">
                            <Menu
                                theme="dark"
                                defaultSelectedKeys={['1']}
                                mode="horizontal"
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">Home</Menu.Item>
                                <Menu.Item key="2">About</Menu.Item>
                                <Menu.Item key="3">Contact</Menu.Item>
                            </Menu>
                            <div className="ml-auto p-1 align-top">
                                <InlineLogin
                                    getConnected={this.props.getConnected}
                                    setRedirect={this.props.setRedirect}
                                    setValues={this.props.setValues}
                                ></InlineLogin>
                            </div>
                        </div>
                    </Header>
                </Layout>
            
            </div>
        )
    }


}