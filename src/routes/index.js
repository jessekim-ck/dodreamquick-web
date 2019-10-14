import React from 'react'

// redux
import {connect} from 'react-redux'


const Index = props => {
    console.log(props)
    return (
        <div>
            {"Hello, " + props.username}
        </div>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Index)

