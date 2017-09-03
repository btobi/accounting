import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import {Route, Switch} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Second from "./pages/Second";


export default class Layout extends React.Component {

    setTitle(title) {
        this.title = title;
    }


    render() {
        this.setTitle("hello")
        const component = this;
        return (
            <div>
                <MainNavigation/>
                <div style={{marginLeft: '15rem'}}>
                    <div style={{padding: '1rem'}}>
                        <PageTitle title={this.title}/>
                        <Switch>
                            <Route path='/first' render={(component) => (<Root setTitle={this.setTitle.bind(this)} />)} />
                            <Route path='/home' render={(component) => (<Home setTitle={this.setTitle.bind(this)} />)} />
                            <Route path='/second' render={(component) => (<Second setTitle={this.setTitle.bind(this)} />)} />
                            <Route render={() => <h1>Not found</h1>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

}