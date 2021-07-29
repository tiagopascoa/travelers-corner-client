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
        document.querySelector("#like-thumbs").style.color = "blue";
        document.querySelector("#like-thumbs").style.fontWeight = 900;
        document.querySelector("#like-text-change").innerHTML = "You like this post! ";      
    }


    render(){
        return (
            <>
            <button
            className="like-btn" 
            onClick={this.handleIncrementCounter}>
            <i id="like-thumbs" className="far fa-thumbs-up me-1"></i><span id="like-text-change">{this.state.theLikes} Likes</span></button>
            </>
        )
    }
}

export default LikeButton;