import React, {Component} from "react";
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
        /* const travelPostId = this.props.travelPostId;
        console.log(travelPostId);
        const numOfLikes = await getLikes(travelPostId);
        console.log(numOfLikes.data.length);
        this.setState({
            theLikes: numOfLikes.data.length
        }) */
    } 

    handleIncrementCounter = async () => {
       const likesLength = await newLike(this.props.travelPostId);
       console.log('adding a like', this.state.theLikes);
        this.setState({
            theLikes: likesLength.data
        }) 
        console.log('like added', this.state.theLikes)
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