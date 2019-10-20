import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar'
import {authenticate_user, get_current_user, refresh_token, sign_up} from "./apis/api";
import styles from './app.module.css'
import favicon from './assets/favicon.ico'
import {Helmet} from 'react-helmet'

// Redux
import {connect} from 'react-redux';
import {log_in, log_out} from './redux/actions/user_actions'

// Routes
import Index from './routes/index'
import Order from './routes/order'
import OrderComplete from './routes/order_complete'
import LogIn from './routes/log_in'
import SearchCost from './routes/search_cost'
import PostNotice from './routes/post_notice'
import PostFAQ from './routes/post_faq'
import PostNews from './routes/post_news'
import MyPage from './routes/my_page'

import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";


class App extends React.Component {

    state = {
        show_login_modal: false,
        show_signup_modal: false,
    }

    async componentDidMount() {
        const token = await localStorage.getItem('token')
        if (!token || token === 'undefined') {
            await localStorage.removeItem('token')
        } else {
            await refresh_token()
            const current_user = await get_current_user()
            await this.props.dispatch(log_in(current_user))
        }
    }

    open_modal = key => {
        this.setState({[`show_${key}_modal`]: true})
    }

    close_modal = key => {
        this.setState({[`show_${key}_modal`]: false})
    }

    authenticate = async (username, password) => {
        try {
            await authenticate_user(username, password)
            const current_user = await get_current_user()
            await this.props.dispatch(log_in(current_user))
            await this.close_modal('login')
        } catch (err) {
            await localStorage.removeItem('token')
            console.log('Login Failed!!')
        }
    }

    sign_up = async (username, password) => {
        try {
            const result = await sign_up(username, password)
            if (result) {
                await this.authenticate(username, password)
                await this.close_modal('signup')
            } else {
                alert("회원가입할 수 없습니다!")
            }
        } catch (err) {
            console.log()
        }
    }

    log_out = async () => {
        await localStorage.removeItem('token')
        await this.props.dispatch(log_out())
    }

    render() {
        return (
            <Router>
                <div className="application">
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>두드림퀵</title>
                        <link rel="shortcut icon" href={favicon}/>
                    </Helmet>
                </div>
                <div>
                    <NavigationBar
                        open_modal={this.open_modal}
                        close_modal={this.close_modal}
                        log_out={this.log_out} />
                    <div className={styles.appContainer}>
                        <Switch>
                            <Route exact path="/" component={Index}/>
                            <Route path="/order/complete" component={OrderComplete}/>
                            <Route path="/order" component={Order}/>
                            <Route path="/search_cost" component={SearchCost}/>
                            <Route path="/user/log_in" component={LogIn}/>
                            <Route path="/post/notice" component={PostNotice}/>
                            <Route path="/post/faq" component={PostFAQ}/>
                            <Route path="/post/news" component={PostNews}/>
                            <Route path="/my_page" component={MyPage}/>
                        </Switch>
                    </div>
                </div>
                <div>
                    <LoginModal
                        show_modal={this.state.show_login_modal}
                        close_modal={() => this.close_modal("login")}
                        authenticate={this.authenticate}
                    />
                </div>
                <div>
                    <SignupModal
                        show_modal={this.state.show_signup_modal}
                        close_modal={() => this.close_modal("signup")}
                        sign_up={this.sign_up}
                    />
                </div>
            </Router>
        )
    }
}

export default connect()(App);
