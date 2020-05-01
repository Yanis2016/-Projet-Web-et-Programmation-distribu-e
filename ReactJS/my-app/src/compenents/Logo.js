import React, { Component } from "react"

import { ReactComponent as Logo } from '../assets/images/vache.svg';

export default class MyLogo extends Component{

    render(){
        return (
            
            <Logo className="col align-self-center" fill="red" width={50} height={50} />
            
        )
    }

}