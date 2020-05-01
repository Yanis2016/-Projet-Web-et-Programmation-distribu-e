import React, { Component } from "react"

import Login from './Login'
import MyLogo from './Logo'
import SignUp from './SignUp';
import Mur from "./Mur"
import NavBar from './NavBar'



class NavigationPannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            key:null
        }

        this.setRedirect = this.setRedirect.bind(this)
        this.setRedirectToFalse = this.setRedirectToFalse.bind(this)
        this.setValues = this.setValues.bind(this)
        this.getValues = this.getValues.bind(this)
    }

    setValues(newValues){
        this.setState({ key: newValues})

    }
    

    getValues() {
        return this.state.key
    }
    setRedirect(){
        this.setState({
            redirect: true
        })
    }


    
    setRedirectToFalse() {
        this.setState({
            redirect: false
        })
    }


    
    renderRedirect = () => {
            return (
            <div className="mainPage">
                <div className="container col-lg-4 ml-auto mr-auto align-bottom">
                    <MyLogo ></MyLogo >
                        <SignUp setValues={this.setValues} getConnected={this.props.getConnected} setRedirectToFalse={this.setRedirectToFalse} />)
                </div>
            </div>
        )
    }

    

    render() {

        if( (this.state.redirect) && (!this.props.isConnected)){
            return this.renderRedirect()
        }
        
        return (
            <div className= "mainPage" >   

                {this.props.isConnected === false ?            
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <NavBar
                                getConnected={this.props.getConnected}
                                setRedirect={this.setRedirect}
                                setValues={this.setValues}
                            >

                            </NavBar>
                        </div>
                        <Login getConnected={this.props.getConnected} setValues={this.setValues} setRedirect={this.setRedirect}></Login>
                    </div>
                    :
                    <Mur getValues={this.getValues} setLogout={this.props.setLogout} ></Mur>
                }       
                </div>
        );
    }
}


export default NavigationPannel
