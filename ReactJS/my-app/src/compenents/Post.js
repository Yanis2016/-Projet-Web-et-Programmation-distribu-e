import React, { Component } from "react"

import {
    Comment, Icon, message, Tooltip, Avatar, List,Form,Button,Input
} from 'antd';
import moment from 'moment';
import axios from 'axios';

const success = (msg) => {
    message.success(msg, 0.5);
};


const Replies = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'Reply' : 'Replies'}`}
        itemLayout="horizontal"
        renderItem={props => <Reply {...props} />}
    />
);


export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: this.props.likes.length,
            listUserLikes:this.props.likes,
            action: this.props.likes > 0 
                && this.props.likes.find(id => id === parseInt(this.props.currentUser.ID)) ? "liked" : null,
            comments: [],
            submitting: false,
            value: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
        const replies = this.props.replies;
        var cms = replies.map((comment) => {
            return {
                author: comment.nom + " " + comment.prenom,
                content: comment.comment, 
                datetime: moment(comment.date, "YYYY/MM/DD HH:mm:ss").fromNow(),    
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            }
        })
        const sorted = cms.sort((a, b) => { return (b.datetime > a.datetime) ? 1 : -1 })
        this.setState({ comments: sorted })
    }


    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            var params = new URLSearchParams();
            params.append("key", this.props.currentUser.Key);
            params.append("text", this.state.value);
            params.append("idComment", this.props.idComment);
            var request = {
                params: params
            };
            axios.get('http://localhost:8091/Twitter/addreply', request)
                .then(response => {
                    if (response.data.code === -1) {
                        this.setState({
                            submitting: false,
                            value: '',
                            comments: [
                                ...this.state.comments,
                                {
                                    author: this.props.currentUser.nom + " " + this.props.currentUser.prenom,
                                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                                    content: <p>{this.state.value}</p>,
                                    datetime: moment(response.data.date, "YYYY/MM/DD HH:mm:ss").fromNow(),
                                },
                            ],
                        });
                        return success("Success for your reply")
                    }
                })
                .catch(error => {
                    alert(error)
                });
        }, 100);
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    like = () => {
        if (this.state.listUserLikes.length > 0 && this.state.listUserLikes.find(id => id === parseInt(this.props.currentUser.ID))) {

            var params = new URLSearchParams();
            params.append("idUser", this.props.currentUser.ID);
            params.append("idComment", this.props.idComment);
            var request = {
                params: params
            };
            axios.get('http://localhost:8094/Twitter/removeLike', request)
                .then(response => {
                    if (response.data.code === -1) {
                        const filtered = this.state.listUserLikes.filter(id => id !== parseInt(this.props.currentUser.ID));
                        this.setState({
                            listUserLikes: filtered,
                            likes: filtered.length,
                            dislikes: 1,
                            action: 'disliked',
                        });
                    }
                })
                .catch(error => {
                    alert(error)
                });
        } else {
            params = new URLSearchParams();
            params.append("idUser", this.props.currentUser.ID);
            params.append("idComment", this.props.idComment);
            request = {
                params: params
            };
            axios.get('http://localhost:8090/Twitter/addLike', request)
                .then(response => {
                    if (response.data.code === -1) {
                        this.setState({
                            listUserLikes: [...this.state.listUserLikes, parseInt(this.props.currentUser.ID)],
                            likes: this.state.listUserLikes.length + 1,
                            dislikes: 0,
                            action: 'liked',
                        })
                    }
                })
                .catch(error => {
                    alert(error)
                });
        }

    }


    render() {
        const { likes,  action } = this.state;
        const { comments, submitting, value } = this.state;

        const actions = [
            <span>
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={action === 'liked' ? 'filled' : 'outlined'}
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {likes}
                </span>
            </span>,
            <TextAreaReply onChange={this.handleChange} onSubmit={this.handleSubmit} submitting={submitting} value={value}></TextAreaReply>,
        ];

        return (
            <Comment
                actions={actions}
                author={<a href="/">{this.props.author}</a>}
                avatar={(<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />)}
                content={this.props.content}
                datetime={(
                    <Tooltip title={this.props.datetime}>
                        <span>{this.props.datetime}</span>
                    </Tooltip>
                )}
            >
            {comments.length > 0 && <Replies comments={comments} />}
            </Comment>
        );
    }
}

class TextAreaReply extends Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,
        }
        this.setOnVisible=this.setOnVisible.bind(this)
        this.onClick  = this.onClick.bind(this)
    }

    onClick(){
        this.props.onSubmit()
        this.setState({visible:false})
    }

    setOnVisible(){
        this.setState({ visible: true })
    }

    render(){
        const TextArea = Input.TextArea;
        
        return(
                <span>
                    {this.state.visible ? (
                        <div>
                            <Form.Item>
                                <TextArea rows={4} onChange={this.props.onChange} value={this.props.value} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    loading={this.props.submitting}
                                    onClick={this.onClick}
                                >
                                    Reply
                                </Button>
                            </Form.Item>
                        </div>
                    ) : (
                        <span onClick={this.setOnVisible} >
                        reply
                        </span>
                    )}
                </span>

        );
    }
    
}

class Reply extends Component{
    state = {
        likes: 0,
        dislikes: 0,
        action: null,
        value: '',
    }

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    }

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    }

    render(){
        const { likes, dislikes, action } = this.state;
      
        const actions = [
            <span>
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={action === 'liked' ? 'filled' : 'outlined'}
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {likes}
                </span>
            </span>,
            <span>
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={action === 'disliked' ? 'filled' : 'outlined'}
                        onClick={this.dislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {dislikes}
                </span>
            </span>,
          ];
        return(
            <Comment
                actions={actions}
                author={<a href="/">{this.props.author}</a>}
                avatar={(
                    <Avatar
                        src={this.props.avatar}
                        alt={this.props.author}
                    />
                )}
                content={this.props.content}
                datetime={(
                    <Tooltip title={this.props.datetime}>
                        <span>{this.props.datetime}</span>
                    </Tooltip>
                )}
            >
            </Comment>
        )
    }
    
    
}