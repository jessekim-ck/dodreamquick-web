import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar'
import {authenticate_user, editUserInfo, get_current_user, refresh_token, sign_up} from "./apis/api";
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
import SearchCost from './routes/search_cost'
import PostNotice from './routes/post_notice'
import PostFAQ from './routes/post_faq'
import PostNews from './routes/post_news'
import PolicyOfUse from './routes/policy_of_use'
import PolicyOfPersonalInformation from './routes/policy_of_personal_information'
import HowToUse from './routes/how_to_use'

import AuthModal from "./components/AuthModal";
import UserInfoModal from "./components/UserInfoModal";
import Footer from "./components/Footer";

import {PageView, initGA} from './components/Tracking';



class App extends React.Component {

    state = {
        show_auth_modal: false,
        show_user_info_modal: false,
    }

    async componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            initGA('UA-158814088-1'); //
            PageView("/"); //
            PageView("/order")
            PageView("/price")
            PageView("/how_to_use")
            PageView("/post/news")
            PageView("/order/complete")
            PageView("/policy/use")
            PageView("/policy/personal_information")
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
            this.close_modal('login')
        } catch (err) {
            if (err.toString().includes('400')) {
                alert("회원 정보를 찾을 수 없습니다! 오타를 확인해주세요.")
            } else {
                alert("로그인할 수 없습니다! 두드림퀵 카카오톡 플러스친구로 문의해주세요.")
                console.log(err)
            }
        }
    }

    sign_up = async (username, password) => {
        try {
            const result = await sign_up(username, password)
            if (result) {
                await this.authenticate(username, password)
                this.close_modal('signup')
            } else {
                alert("회원가입할 수 없습니다!")
            }
        } catch (err) {
            console.log()
        }
    }

    edit_user_info = async (username, password) => {
        const result = await editUserInfo(username, password)
        if (result === 1) {
            alert("회원 정보가 변경되었습니다!")
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
                        <link rel="shortcut icon" href={favicon}/>
                    </Helmet>
                </div>

                <div>
                    <NavigationBar
                        open_modal={this.open_modal}
                        close_modal={this.close_modal}
                        log_out={this.log_out}/>
                    <div className={styles.appContainer}>
                        <Switch>
                            <Route exact path="/" component={Index}/>
                            <Route path="/order/complete/:id/:price" component={OrderComplete}/>
                            <Route path="/order/complete" component={OrderComplete}/>
                            <Route path="/order" component={Order}/>
                            <Route path="/price" component={SearchCost}/>
                            <Route path="/post/notice" component={PostNotice}/>
                            <Route path="/post/faq" component={PostFAQ}/>
                            <Route path="/post/news" component={PostNews}/>
                            <Route path="/policy/use" component={PolicyOfUse}/>
                            <Route path="/policy/personal_information" component={PolicyOfPersonalInformation}/>
                            <Route path="/how_to_use" component={HowToUse}/>
                        </Switch>
                    </div>

                    <Footer/>
                </div>

                <div>
                    <AuthModal
                        show_modal={this.state.show_auth_modal}
                        close_modal={() => this.close_modal('auth')}
                        authenticate={this.authenticate}
                        sign_up={this.sign_up} />
                </div>
                <div>
                    <UserInfoModal
                        show_modal={this.state.show_user_info_modal}
                        open_auth_modal={() => this.open_modal('auth')}
                        close_modal={() => this.close_modal('user_info')}
                        authenticate={this.authenticate}
                        edit_user_info={this.edit_user_info} />
                </div>
            </Router>
        )
    }
}

export default connect()(App);
