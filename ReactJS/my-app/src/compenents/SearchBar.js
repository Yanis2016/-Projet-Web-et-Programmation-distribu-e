import React, { Component } from "react"
import { Layout, Mention, Avatar} from 'antd'
import axios from 'axios'
import moment from 'moment';

import Logout from './Logout';
import MyLogo from './Logo'


const { Header } = Layout;


const Nav = Mention.Nav;


var users = []
var comments = []
export default class SearchBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
        }
        this.goTo = this.goTo.bind(this)
        this.searchComments = this.searchComments.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    }
    
    componentDidMount(){
        axios.get('http://localhost:8082/Twitter/getuserslist')
            .then(response => {
                if (response.data.code === -1) {
                    users = response.data.Users.map((user) => { return { 
                        nom: user.nom , 
                        prenom: user.prenom,
                        type: user.Sex === 'M' ? 'Man' : 'Woman', 
                        icon: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        idUser:user.id,
                        login:user.login,
                        DateNaiss: user.DateNaiss,
                        Sex:user.Sex,
                        Depuis: user.Depuis
                    }})
                } 
            })
            .catch(error => {
                alert(error)
            });
    }

    onSearchChange = async (value) => {
        const searchValue = value.toLowerCase();
        const filtered = users.filter(item => (item.nom + " " + item.prenom).toLowerCase().indexOf(searchValue) !== -1);
        if(filtered.length === 0){
            await this.searchComments(value)
            const suggestions = comments.map((comment) => (
                <Nav
                    value={comment.idComment}
                    data={comment}
                    disabled={comment.disabled}
                >
                    {comment.author} - {comment.type}-{comment.datetime}
                </Nav>

            ));
            this.setState({ suggestions });
        }else{
            const suggestions = filtered.map(suggestion => (
                <Nav
                    value={suggestion.idUser}
                    data={suggestion}
                    disabled={suggestion.disabled}
                >
                    <Avatar
                        src={suggestion.icon}
                        size="small"
                        style={{
                            width: 14, height: 14, marginRight: 8, top: -1, position: 'relative',
                        }}
                    />
                    {suggestion.nom + " " + suggestion.prenom} - {suggestion.type}
                </Nav>
            ));
            this.setState({ suggestions });
        }
    }

    goTo(id){
        const user = users.find((user) => {return user.idUser === id;})
        if (user !== undefined){
            this.props.goToProfile(user)
        }else{
            const comment = comments.find((c) => { return c.idComment === id; })
            if (comment !== undefined) {
                this.props.goToCommment(comment)
            }
        }
    }

    async searchComments(value){
        var params = new URLSearchParams();
        params.append("key", this.props.getValues().Key);
        params.append("word", value);
        var request = {
            params: params
        };
        await axios.get('http://localhost:8096/Twitter/search', request)
            .then(response => {
                if (response.data.code === -1) {                        
                    comments = response.data.comments.map((comment) => {
                    return {
                            author: comment.nom + " " + comment.prenom,
                            content: comment.comment,
                            datetime: moment(comment.date, "YYYY/MM/DD HH:mm:ss").fromNow(),
                            idComment: comment.id,
                            type: "Post",
                        }
                    })
                }
            })
            .catch(error => {
                alert(error)
        });
        
    }

render(){
return (
    <div className="container-fluid" style={{"marginTop":"1%"}}>
        <Layout className="layout" >
            <Header style={{ "background": "rgb(0, 21, 41)" }}>
                <div className="row align-middle">    
                    <div className="logo-search-bar">
                        <MyLogo/>
                    </div>
                    <Mention
                        prefix=''
                        className="col-lg-4 ml-auto mr-auto align-bottom "
                        placeholder="search"
                        style={{ height: 25 , "marginTop": "0.6%"}}
                        suggestions={this.state.suggestions}
                        onSearchChange={this.onSearchChange}
                        onSelect={this.goTo}
                        loading={true}  
                    />
                    <div>
                        <Logout getValues={this.props.getValues} setLogout={this.props.setLogout} ></Logout>
                    </div>
                </div>
            </Header>
        </Layout>
    </div>
);
}
} 