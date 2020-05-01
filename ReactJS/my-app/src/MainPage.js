import React, { Component } from "react"
import NavigationPannel from './compenents/NavigationPannel';



export default class MainPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            current_page : "connection",
            isConnected  : false
        }


        this.getConnected = this.getConnected.bind(this)
        this.setLogout = this.setLogout.bind(this)

    }

    getConnected(){
        this.setState({current_page : "profile", isConnected : true })
    }
    setLogout() {
        this.setState({ current_page: "connection", isConnected: false })
    }

    afficheNoFound(){
        console.log("affiche")
    }

    render(){
        return(
            <div className="MainNavigatePanel" >
            <div className="MainPage">
                <NavigationPannel  
                    getConnected= {this.getConnected}
                    setLogout  =  {this.setLogout}
                    isConnected = {this.state.isConnected}
                    >
                </NavigationPannel>
            </div>
        </div>
        ) 
    }

}


