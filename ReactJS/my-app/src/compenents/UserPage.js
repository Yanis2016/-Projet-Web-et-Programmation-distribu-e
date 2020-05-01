import React, { Component } from 'react'
import axios from 'axios'


import Woman from '../assets/images/woman.png'
import Men from '../assets/images/man.png'

import { Card, Avatar, message, PageHeader, Row, Button , Col, Divider } from 'antd';

import FriendsListsUser from './FriendsListsUser';
import CommentsListUser from './CommentsListUser';



const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
    </p>
        {content}
    </div>
);


const success = () => {
    message.success('friend added',0.5);
};

const tabListNoTitle = [{
    key: 'Profile',
    tab: 'Profile',
}, {
    key: 'Friends',
    tab: 'Friends',
}, {
    key: 'Comments',
    tab: 'Comments',
}];

var user = '';

export default class UserPage extends Component {
    contentListNoTitle = {
        Profile: 
            <div className="container-fluid">
                <Row align="middle" type="flex" justify="space-between" >
                    <Col span={4} order={3}></Col>
                    <Col span={16} order={2}>
                        <div className="row align-middle">
                            <Avatar className="col-lg-5 ml-auto mr-auto align-bottom "
                                src={this.props.user.Sex === "M" ? Men : Woman}
                                style={{ width: 50, height: 50, display: 'block', margin: 'auto', position: 'relative' }}
                            />
                        </div>
                    </Col>
                    <Col span={4} order={1}></Col>
                </Row>
                <Divider type="horizontal" />
                <Row>
                    <Col span={12}><DescriptionItem title="LastName" content={this.props.user.nom} /></Col>
                    <Col span={12}><DescriptionItem title="Name" content={this.props.user.prenom} /></Col>
                    <Col span={12}><DescriptionItem title="Birth Day" content={this.props.user.DateNaiss} /></Col>
                    <Col span={12}><DescriptionItem title="Since" content={this.props.user.Depuis} /></Col>
                    <Col span={12}><DescriptionItem title="Sex" content={this.props.user.Sex} /></Col>
                </Row>
            </div>
        ,
        Friends:  <FriendsListsUser user={this.props.user}></FriendsListsUser>,
        Comments: <CommentsListUser user={this.props.user}></CommentsListUser>,
    };
    constructor(props) {
        super(props)
        this.state = {
            u:null,
            noTitleKey: 'Profile',
        }
        this.addFriend = this.addFriend.bind(this)
    }
    

    addFriend(){
        this.props.addFriend(user.idUser,user.nom+" "+user.prenom)
        var params = new URLSearchParams();
        params.append("key", this.props.getValues().Key);
        params.append("id_friend", user.idUser);

        var request = {
            params: params
        };
        axios.get('http://localhost:8085/Twitter/addFriend', request)
        .then(response => {
            if (response.data.code === -1) {
                return success
            }
            })
            .catch(error => {
                alert('erreur')
            });
    }

    componentDidMount(){
        user = this.props.user
        this.setState({u:user})
    }
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }



    render() {
        const extras = this.props.afficheButton ? [] : [<Button key="1" type="primary" icon="user-add" onClick={(event) => this.addFriend()}>Add</Button>]  
        return (
            <div>
                <PageHeader
                    onBack={() => this.props.setCurrentPage('mur')}
                    title={this.props.user.nom + " " + this.props.user.prenom}
                    subTitle="Page Profile"
                    extra={extras}
                />
                <Card
                    style={{ width: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                >
                    {this.contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        );
    }
}