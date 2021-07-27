import React from "react";
import { getLikes, newLike } from "../api";

class LikeButton extends React.Component{
    state ={
        theLikes: 0
    }

    getNumOfLikes = async () => {
        const numOfLikes = await getLikes(this.props.travelPostId);
        this.setState({
            theLikes: numOfLikes.data.length
        })
    }

    async componentDidMount () {
        this.getNumOfLikes()
    } 

    handleIncrementCounter = async () => {
       const likesLength = await newLike(this.props.travelPostId);
        this.setState({
            theLikes: likesLength.data
        }) 
    }


    render(){
        return (
            <>
            <button 
            className="like-btn" 
            onClick={this.handleIncrementCounter}>
            <i className="far fa-thumbs-up me-1"></i> {this.state.theLikes} Likes </button>
            </>
        )
    }
}

export default LikeButton;