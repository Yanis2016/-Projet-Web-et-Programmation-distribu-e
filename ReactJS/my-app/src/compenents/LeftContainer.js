import React, { Component } from "react"
import { Card, Statistic, Icon, Avatar, Row, Col } from 'antd';

const { Meta } = Card;
export default class LeftContainer extends Component {
    constructor(props) {
        super(props)
        this.state={
            tweetsNumber:0,
            followrs:0,
        }   
    }
    
    
    
    render() {
        var nbComments = this.props.getNumberOfComments()
        var nbFollowers = this.props.getNumberOfFollowrs()
        return (
            <div className="container-fluid">
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Card
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        actions={[<Icon type="home" onClick={(event) => this.props.setCurrentPage("ProfilePage")}/>,]}
                    >
                    <Meta
                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} src="user" />}
                            title={this.props.userName}
                            description="This is the description"
                    />
                    <p>sex : {this.props.sex}</p>
                    <Row gutter={16}>
                        <Col span={12}>
                                <Statistic title="Tweets" value={nbComments} />
                        </Col> <Col span={12}>
                                <Statistic title="Followers" value={nbFollowers}/>
                        </Col>
                    </Row>
                    </Card>
                </div>
            </div>
        )
    }

}