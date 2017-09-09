import React from "react";
import MainNavigation from "containers/navigation/MainNavigation";
import {Route, Switch} from "react-router-dom";
import PageTitle from "components/PageTitle";
import Masterdata from "containers/pages/masterdata/masterdata";

import Accounting from "containers/pages/accounting/accounting";
import LoadDefaults from "containers/util/LoadDefaults";
import StatisticsAccounts from "containers/pages/statistics/statistics-accounts-overview";

export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <LoadDefaults/>
                <MainNavigation/>
                <div style={{marginLeft: '10rem'}}>
                    <div style={{padding: '1rem'}}>
                        <PageTitle title={this.title}/>
                        <Switch>
                            {/*<Route path='/home' component={Home}/>*/}
                            <Route path='/masterdata' component={Masterdata}/>
                            <Route path='/accounting/records' component={Accounting} />
                            <Route path='/statistics/accounts' component={StatisticsAccounts} />
                            <Route render={() => <h1>Not found</h1>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

}