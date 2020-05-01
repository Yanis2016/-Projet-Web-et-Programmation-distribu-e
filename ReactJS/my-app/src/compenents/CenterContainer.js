import React, { Component } from "react"
import { Input, Comment, message , Avatar, Form,Button, List} from 'antd'
import moment from 'moment';
import axios from 'axios';

import Post from './Post'



const TextArea = Input.TextArea;

const CommentList = ({ comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'Post' : 'Posts'}`}
        itemLayout="horizontal"
        renderItem={props => <Post {...props} />}
    />
);

const Editor = ({onChange, onSubmit, submitting, value,}) => (
        <div>
            <Form.Item>
            <TextArea  autosize={{ minRows: 2, maxRows: 6 }} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    Add Comment
                </Button>
            </Form.Item>
        </div>
);


const success = () => {
    message.success('success for your comment',0.5);
};


export default class CenterContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        }
    }
    

    componentDidMount(){
        var params = new URLSearchParams();
        params.append("key", this.props.getValues().Key);
        var request = {
            params: params
        };
        axios.get('http://localhost:8080/Twitter/userComments', request)
            .then(response => {
                if (response.data.code === -1) {
                    const comentaires = response.data.Comments
                    var cms = comentaires.map((comment) => { 
                        return { 
                            author: comment.nom + " " + comment.prenom, 
                            content: comment.comment, datetime: moment(comment.date, "YYYY/MM/DD HH:mm:ss").fromNow(), 
                            replies: comment.replies, 
                            idComment: comment.id,
                            likes: comment.likes,
                            currentUser: this.props.getValues(),
                        }})
                    this.props.updateNbComments(cms.length)
                    
                    axios.get('http://localhost:8092/Twitter/friendsComments', request)
                        .then(response => {
                            if (response.data.code === -1) {
                                const friendsComments = response.data.FriendsComments
                                const fc = friendsComments.map((comment) => {
                                    return {
                                        author: comment.nom + " " + comment.prenom,
                                        content: comment.comment,
                                        datetime: moment(comment.date, "YYYY/MM/DD HH:mm:ss").fromNow(),
                                        replies: comment.replies,
                                        likes: comment.likes,
                                        idComment:comment.id,
                                        currentUser: this.props.getValues(),
                                        }})
                                cms = cms.concat(fc)
                                const sorted = cms.sort((a, b) => { return (b.datetime > a.datetime) ? -1 : 1 })
                                this.setState({ comments: sorted })
                            }else{
                                const sorted = cms.sort((a, b) => { return (b.datetime > a.datetime) ? -1 : 1 })
                                this.setState({ comments: sorted })
                            }
                        })
                        .catch(error => {
                            alert(error)
                        });   
                    
                }
            })
            .catch(error => {
                alert('erreur')
        });   
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
            params.append("key", this.props.getValues().Key);
            params.append("text", this.state.value);
            var request = {
                params: params
            };
            axios.get('http://localhost:8089/Twitter/addComment', request)
                .then(response => {
                    if (response.data.code === -1) {
                        this.setState({
                            submitting: false,
                            value: '',
                            comments: [
                                {
                                    author: this.props.getValues().prenom + " " + this.props.getValues().nom,
                                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                                    content: <p>{this.state.value}</p>,
                                    datetime: moment(response.data.date, "YYYY/MM/DD HH:mm:ss").fromNow(),
                                    idComment: response.data.idComment,
                                    replies: [],
                                    likes: [],
                                    currentUser: this.props.getValues(),
                                },
                                ...this.state.comments,
                            ],
                        });
                        this.props.updateNbComments(this.state.comments.length)
                        return success();
                    }   
                })
                .catch(error => {
                    alert(error)
                });   
        }, 500);
        
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { comments, submitting, value } = this.state;
        return (
            <div className="container-fluid">
                <div className="row align-middle">
                    <div className="col-lg-8 ml-auto mr-auto align-bottom">
                        <Comment
                            avatar={(<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />)}
                            content={(
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            )}
                        />
                        {comments.length > 0 && <CommentList comments={comments} />}
                    </div>
                </div>
            </div>
        )
    }

}


