import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import {Route, Switch} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Home from "./pages/Home";
import Masterdata from "./pages/masterdata/masterdata";
import {connect} from "react-redux";

import {getAccounts} from "../actions/masterdataActions"
import Accounting from "./pages/accounting/accounting";
import LoadDefaults from "./util/LoadDefaults";
import FormTest from "./FormTest";

export default class Layout extends React.Component {

    render() {
        return (
            <div>
                {/*<LoadDefaults/>*/}
                <MainNavigation/>
                <div style={{marginLeft: '15rem'}}>
                    <div style={{padding: '1rem'}}>
                        <PageTitle title={this.title}/>
                        <Switch>
                            {/*<Route path='/home' component={Home}/>*/}
                            <Route path='/formtest' component={FormTest}/>
                            <Route path='/masterdata' component={Masterdata}/>
                            <Route path='/accounting/records' component={Accounting} />
                            <Route render={() => <h1>Not found</h1>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

}