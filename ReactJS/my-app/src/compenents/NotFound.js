import React, { Component } from "react"
import PageNotFound from '../assets/images/notFoundPage1.jpg';
import { Link } from 'react-router-dom';



export default class NotFound extends Component {

    constructor(props) {
        super(props)
        this.affiche = this.affiche.bind(this)
    }
    

    affiche() {
        console.log("Not Found Compenent")
    }
    
    goToNextPage = () => {
        this.props.history.push({
            pathname:'/',
            affiche: this.affiche
        })
    }

    

    
    render(){
        return(
            <div>
                <img src={PageNotFound} style={{ width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} alt='Not Found'/>
                <center>
                    <Link to='/' > Create Expense​</Link>     
                </center>
            </div>
        );
    }
    
}