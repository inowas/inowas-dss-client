import React from "react"
import { connect } from "react-redux"

import NavBar from "../pages/Navbar"
import Login from "../pages/Login"

@connect((store) => {
    return {
        user: store.user,
    }
})
export default class Main extends React.Component {

    isUserLoggedIn(){
        return !(this.props.user.apiKey==null);
    }

    render(){
        if (this.isUserLoggedIn()){
            return (
                <NavBar>
                    {this.props.children}
                </NavBar>
            )
        }

        return(<Login/>)
    }
}
