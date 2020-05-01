
import React, { Component } from "react"

import SearchBar from './SearchBar';
import { Row, Col} from 'antd';
import axios from 'axios'


import RightContainer from "./RightContainer"
import LeftContainer from "./LeftContainer"
import CenterContainer from "./CenterContainer"
import PageProfile from './ProfilePage'
import UserPage from './UserPage';
import CommentSearch from './Comment'

var commentS =  null
export default class Mur extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            current:'mur',
            numberOfcomments:0,
            numberOfFollowers: 0,
            friends:[],
            User:null,
            
        }
        this.setCurrentPage = this.setCurrentPage.bind(this)
        this.updateNbComments = this.updateNbComments.bind(this)
        this.updateNbFollowrs = this.updateNbFollowrs.bind(this)
        this.getNumberOfComments = this.getNumberOfComments.bind(this)
        this.getNumberOfFollowrs = this.getNumberOfFollowrs.bind(this)
        this.goToProfile = this.goToProfile.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.deleteFriend = this.deleteFriend.bind(this)
        this.getFriends = this.getFriends.bind(this)
        this.goToCommment = this.goToCommment.bind(this)
    }
    


    
    componentDidMount() {
        var params = new URLSearchParams();
        params.append("key", this.props.getValues().Key);
        var request = {
            params: params
        };
        axios.get('http://localhost:8086/Twitter/listerFriends', request)
            .then(response => {
                if (response.data.code === -1) {
                    const Myfriends = response.data.amis
                    var cms = Myfriends.map((friend) => {
                        return {
                            name: friend.nom + " " + friend.prenom,
                            idFriend: friend.id,
                        }
                    })
                    this.setState({ friends: cms })
                    this.updateNbFollowrs(this.state.friends.length)
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    setCurrentPage(page){
        this.setState({current: page})
    }
    

    updateNbComments(nbComments){
        this.setState({ numberOfcomments: nbComments})
    }

    updateNbFollowrs(nbFollowers) {
        this.setState({ numberOfFollowers: nbFollowers })
    }

    
    getNumberOfFollowrs() {
        return this.state.numberOfFollowers
    }

    getFriends(){
        return this.state.friends
    }

    getNumberOfComments() {
        return this.state.numberOfcomments
    }

    goToProfile(user){
        if (parseInt(user.idUser) === this.props.getValues().ID){
            this.setCurrentPage("ProfilePage")
            return 
        }
        this.setState({ User: user})
        this.setCurrentPage("UserPage")
    }

    goToCommment(comment){
        commentS = comment
        this.setCurrentPage("Comment")
    }

    addFriend(idFriend,name){
        this.setState({ friends: [...this.state.friends, { idFriend: parseInt(idFriend), name: name }] });
        this.updateNbFollowrs(this.state.friends.length+1)
    }
    
    deleteFriend(idFriend) {
        const f = this.state.friends.filter((elem)=> {return elem.idFriend !== idFriend } )  
        this.setState({ friends: f })
        this.updateNbFollowrs(this.state.friends.length)
    }


    renderAffiche(){
        const idFriends = this.state.friends.map((friend) =>  friend.idFriend )
        switch (this.state.current) {
            case "Comment":
                return (
                    <CommentSearch
                        setCurrentPage={this.setCurrentPage}
                        comment={commentS}
                    >
                    </CommentSearch>
                );
            case "ProfilePage":
                return (
                    <PageProfile
                        setCurrentPage={this.setCurrentPage}
                        getValues={this.props.getValues}
                        updateNbComments={this.updateNbComments}
                        deleteFriend={this.deleteFriend}  
                        getFriends={this.getFriends}            
                    >
                    </PageProfile>
                );
            case "UserPage":
            return (
                        <UserPage 
                            setCurrentPage={this.setCurrentPage}
                            getValues={this.props.getValues} 
                            user={this.state.User}
                            addFriend={this.addFriend}
                            afficheButton={idFriends.includes(parseInt(this.state.User.idUser))}
                        />
                    )
            default:
                return (
                    <div className="container-fluid" >
                        <div className="container-fluid">
                            <Row align="top" justify="center">
                                <SearchBar 
                                    goToProfile={this.goToProfile}  
                                    goToCommment={this.goToCommment}
                                    setLogout={this.props.setLogout} 
                                    getValues={this.props.getValues} 
                                    >
                                </SearchBar>
                            </Row>
                            <Row style={{ "padding": "0px" }} type="flex" justify="center" className="container-fluid">
                                <Col span={12} push={6}>
                                    <CenterContainer 
                                        updateNbComments={this.updateNbComments}
                                        userName={this.state.userName}
                                        getValues={this.props.getValues}
                                    >
                                    </CenterContainer>
                                </Col>
                                <Col span={6} push={6}>
                                    <RightContainer
                                        userName={this.props.getValues().prenom +" "+ this.props.getValues().nom}
                                    ></RightContainer>
                                </Col>
                                <Col span={6} pull={18}>
                                    <LeftContainer 
                                        setCurrentPage={this.setCurrentPage}
                                        getNumberOfComments={this.getNumberOfComments}
                                        getNumberOfFollowrs={this.getNumberOfFollowrs}
                                        userName={this.props.getValues().prenom + " " + this.props.getValues().nom}                                        
                                        sex={this.state.sex}                  
                                    >
                                    </LeftContainer>
                                </Col>
                            </Row>

                        </div>
                    </div>
                );
        }
    }
    
    render() {
    return this.renderAffiche()
}

}