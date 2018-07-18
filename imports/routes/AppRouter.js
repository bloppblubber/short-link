import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Link from '../ui/Link';


export const history = createHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];

export const onAuthChanged = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if(isUnauthenticatedPage){
        if(isAuthenticated){
            history.replace('links');
        }
        else{

        }
    } else if(isAuthenticatedPage){
        if(isAuthenticated){

        }else{
            history.replace('/');
        }
    }
}

export class AppRouter extends React.Component {

    onEnterPublicPage(){
        if(Meteor.userId()){
            this.props.history.replace('/links');
        }
    }
    onEnterPrivatePage(){
        if(!Meteor.userId()){
            this.props.history.replace('/');
        }
    }

    render() {
        return(
        <Router history={history}>
            <Switch>
                <Route path="/" component={Login} exact={true} onEnter={this.onEnterPublicPage}/>
                <Route path="/signup" component={Signup} onEnter={ this.onEnterPublicPage}/>
                <Route path="/links" component={Link} onEnter={ this.onEnterPrivatePage}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Router>)

    }
};