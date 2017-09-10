import React from 'react'
import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import AccountEdit from "./masterdata-account-edit";

export default class MasterdataAccountsMenu extends React.Component {

    render() {
        return (
            <Menu>

                <AccountEdit />

            </Menu>

        )
    }
}