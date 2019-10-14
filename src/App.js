import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar'
import {get_current_user, refresh_token} from "./apis/api";
import styles from './app.module.css'

// Redux
import {connect} from 'react-redux';
import {log_in} from './redux/actions/user_actions'

// Routes
import Index from './routes/index'
import Order from './routes/order'
import OrderComplete from './routes/order_complete'
import LogIn from './routes/log_in'
import SearchCost from './routes/search_cost'


class App extends React.Component {

    async componentDidMount() {
        const token = localStorage.getItem('token')
        if (!token || token === 'undefined') {
            await localStorage.removeItem('token')
        } else {
            await refresh_token()
            const current_user = await get_current_user()
            this.props.dispatch(log_in(current_user))
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <div className={styles.navBarContainer}>
                        <NavigationBar />
                    </div>
                    <div className={styles.appContainer}>
                        <Switch>
                            <Route exact path="/" component={Index}/>
                            <Route path="/order/complete" component={OrderComplete}/>
                            <Route path="/order" component={Order}/>
                            <Route path="/search_cost" component={SearchCost}/>
                            <Route path="/user/log_in" component={LogIn}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default connect()(App);
