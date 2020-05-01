import React, { Component } from 'react'
import { Avatar, PageHeader, Comment , Tooltip} from 'antd'

export default class CommentSearch extends Component {

    
    

    render(){
        return(
            <div>
                <PageHeader
                    onBack={() => this.props.setCurrentPage('mur')}
                    title={"Comment"}
                >

                </PageHeader>
                <Comment
                    author={<a href="/">{this.props.comment.author}</a>}
                    avatar={(<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />)}
                    content={this.props.comment.content}
                    datetime={(
                        <Tooltip title={this.props.comment.datetime}>
                            <span>{this.props.comment.datetime}</span>
                        </Tooltip>
                    )}
                >
                </Comment>
            </div>
        )
    }
}