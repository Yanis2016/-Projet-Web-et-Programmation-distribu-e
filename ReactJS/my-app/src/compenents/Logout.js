import React, { Component } from "react"

import { Button,Icon } from 'antd' 
import axios from 'axios';


//const IconFont = Icon.createFromIconfontCN({scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',});

class Logout  extends Component {
    constructor(props) {
        super(props)
        this.logout=this.logout.bind(this)
    }
    
    logout(){
        var params = new URLSearchParams();
        params.append("key", this.props.getValues().Key);
        var request = {
            params: params
        };
        axios.get('http://localhost:8084/Twitter/logout', request)
            .then(response => {
                if (response.data.code === -1) {
                    this.props.setLogout()
                }
            })
            .catch(error => {
                alert('erreur')
            });
    }
    render() {
        return (
            <div>
                <Button style={{ "background": "rgb(0, 21, 41)" }} type="primary" onClick={this.logout} >
                    <Icon type="logout" />
                </Button>
            </div>
        );
    }
}

export default Logout