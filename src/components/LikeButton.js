import React, {Component} from "react";
import { getLikes } from "../api";

class LikeButton extends React.Component{
    state ={
        theLikes: 0
    }
/*  async componentDidMount () {
        const numOfLikes = await getLikes();
        this.setState({
            theLikes: numOfLikes.length
        })
    }  */
    handleIncrementCounter = () => {
        this.setState({
            theLikes: this.state.theLikes + 1 , 
        }) 
    }


    render(){
        return (
            <>
            <p> Likes : {this.state.theLikes} </p>
            <button 
            className="like-btn" 
            onClick={this.handleIncrementCounter}>
            <i className="far fa-thumbs-up me-1"></i> Like </button>

            </>
        )
    }
}

export default LikeButton;