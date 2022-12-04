import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";


class UserHeader extends React.Component {
    
    //this below func calls the action creator with the specified argument
    componentDidMount() {
        this.props.fetchUser(this.props.userId);
    }
    
    render() {
        const user = this.props.users.find((userItem) => userItem.id === this.props.userId)
        if(!user) return null;
      
        return <div className="header">{user.name}</div>;
    };
}

const mapStateToProps = state => {
    return {users : state.users};
}

//another way of using
// const mapStateToProps = state => {
//     return {users: state.users.find(user => user.id === ownProps.userId)};
// };

export default connect(mapStateToProps, {
    fetchUser: fetchUser
}) (UserHeader);