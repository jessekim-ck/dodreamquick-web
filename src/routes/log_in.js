import React from 'react'
import LogInForm from "../components/LogInForm";
import {authenticate_user, get_current_user} from "../apis/api";

// redux
import {connect} from "react-redux"
import {log_in} from "../redux/actions/user_actions"


const LogIn = props => {

    const authenticate = async (username, password) => {
        try {
            await authenticate_user(username, password)
            const current_user = await get_current_user()
            await props.dispatch(log_in(current_user))
            props.history.push('/')
        } catch (err) {
            await localStorage.removeItem('token')
            console.log('Login Failed!!')
        }
    }

    return (
        <div>
            <LogInForm authenticate={authenticate}/>
        </div>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(LogIn)