import React, { Component } from 'react'
import {
    List, Avatar,  Tooltip,Alert
} from 'antd';

import axios from 'axios'
import moment from 'moment';

const MyCommentsList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'Post' : 'Posts'}`}
        itemLayout="horizontal"
        renderItem={item => (
            <List.Item key={item.id}>
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.author}
                    description={item.content}
                />
                <Tooltip title={item.datetime}>
                    <span>{item.datetime}</span>
                </Tooltip>
            </List.Item>
        )}
    />
);

export default class CommentsListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
        }
    }
    

    componentDidMount() {
        var params = new URLSearchParams();
        params.append("idAuthor", this.props.user.idUser);
        var request = {
            params: params
        };
        axios.get('http://localhost:8080/Twitter/CommentsAuthor', request)
            .then(response => {
                if (response.data.code === -1) {
                    const comentaires = response.data.comments
                    var cms = comentaires.map((comment) => { 
                        return { author: comment.nom + " " + comment.prenom, 
                            content: comment.comment, 
                            idComment: comment.id,
                            datetime: moment(comment.date, "YYYY/MM/DD HH:mm:ss").fromNow() } })

                    const sorted = cms.sort((a, b) => { return (b.datetime > a.datetime) ? -1 : 1 })
                    this.setState({ comments: sorted })
                }
            })
            .catch(error => {
                alert('erreur')
            });   
    }

    render() {
        const { comments } = this.state
        return (
            <div className="container-fluid">
                <div className="row align-middle">
                    <div className="col-lg-8 ml-auto mr-auto align-bottom">
                        {comments.length > 0
                            ? <MyCommentsList comments={comments} onDelete={this.onDelete} />
                            : (<Alert
                                message="List Empty"
                                description="Your Comments list is empty"
                                type="info"
                            />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

