import React from 'react'

// redux
import {connect} from 'react-redux'


const Index = props => {
    return (
        <div>
            {"Hello, " + (props.username || "stranger")}
        </div>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Index)

