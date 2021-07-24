import React from "react";
import { getUserProfile } from "../api";

class UserProfile extends React.Component {
  state = {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
  };

  async componentDidMount() {
    const response = await getUserProfile(this.props.match.params.id);
    console.log(response);
    this.setState({
      id: response.data._id,
      username: response.data.username,
      email: response.data.email,
      imageUrl: response.data.imageUrl,
    });
  }

  render() {
    const { username, email} = this.state;
    return (
      <>
        <h2>{username}</h2>
        <p>{email}</p>
      </>
    );
  }
}
export default UserProfile;