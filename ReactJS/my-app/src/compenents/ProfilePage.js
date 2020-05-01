import React, { Component } from 'react'
import Woman from '../assets/images/woman.png'
import Men from '../assets/images/man.png'

import { Card, Avatar, PageHeader, Row, Col, Divider} from 'antd';

import FriendsLists from './FriendsList';
import CommentsList from './CommentsList';

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

export default class PageProfile extends Component {
    
    contentListNoTitle = {
        Profile:   
            <div className="container-fluid">
                <Row align="middle" type="flex" justify="space-between" >
                    <Col span={4} order={3}></Col>
                    <Col span={16} order={2}>
                        <div className="row align-middle">
                            <Avatar className="col-lg-5 ml-auto mr-auto align-bottom " 
                                src={this.props.getValues().Sex === "M" ? Men : Woman }
                                style={{ width: 50, height: 50, display: 'block', margin: 'auto', position: 'relative' }} 
                            />
                        </div>
                    </Col>
                    <Col span={4} order={1}></Col>
                </Row>
                <Divider type="horizontal" />
                <Row>
                    <Col span={12}><DescriptionItem title="LastName"  content={this.props.getValues().nom} /></Col>
                    <Col span={12}><DescriptionItem title="Name" content={this.props.getValues().prenom} /></Col>
                    <Col span={12}><DescriptionItem title="Birth Day" content={this.props.getValues().DateNaiss} /></Col>
                    <Col span={12}><DescriptionItem title="Since" content={this.props.getValues().Depuis} /></Col>
                    <Col span={12}><DescriptionItem title="Sex" content={this.props.getValues().Sex} /></Col>
                </Row>
            </div>,  
        Friends:    <FriendsLists 
                        deleteFriend={this.props.deleteFriend} 
                        getValues={this.props.getValues} 
                        getFriends={this.props.getFriends}
                    >
                    </FriendsLists>,
        Comments:   <CommentsList 
                        updateNbComments={this.props.updateNbComments} 
                        getValues={this.props.getValues}
                    ></CommentsList>,
    };
    state = {
        noTitleKey: 'Profile',
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    render() {
        return (
            <div>
                <PageHeader
                    onBack={() => this.props.setCurrentPage('mur')}
                    title={this.props.getValues().prenom + " " + this.props.getValues().nom}
                    subTitle={this.state.noTitleKey}
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
