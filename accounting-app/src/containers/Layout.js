import React from "react";
import MainNavigation from "containers/navigation/MainNavigation";
import {Route, Switch} from "react-router-dom";
import PageTitle from "components/PageTitle";
import Masterdata from "containers/pages/masterdata/masterdata";

import Accounting from "containers/pages/accounting/accounting";
import LoadDefaults from "containers/util/LoadDefaults";
import StatisticsAccounts from "containers/pages/statistics/statistics-accounts-overview";
import StatisticsSpreadsheet from "./pages/statistics/statistics-spreadsheet";
import * as MobileDetect from "mobile-detect";

export default class Layout extends React.Component {

    render() {

        const isMobile = new MobileDetect(window.navigator.userAgent).mobile()

        const style1 = !isMobile ? {marginLeft: '10rem'} : {}

        return (
            <div>
                <LoadDefaults/>
                <MainNavigation/>
                <div style={style1}>
                    <div style={{padding: '1rem'}}>
                        <PageTitle title={this.title}/>
                        <Switch>
                            {/*<Route path='/home' component={Home}/>*/}
                            <Route path='/masterdata' component={Masterdata}/>
                            <Route path='/accounting/records' component={Accounting} />
                            <Route path='/statistics/accounts' component={StatisticsAccounts} />
                            <Route path='/statistics/spreadsheet' component={StatisticsSpreadsheet} />
                            <Route path='/' component={Accounting} />
                            <Route render={() => <h1>Not found</h1>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

}